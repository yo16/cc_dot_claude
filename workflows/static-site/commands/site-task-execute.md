# /site-task-execute

単一タスクの実行。featureブランチ作成 → コーディング → テスト → devへのマージまでを行う。

## 引数
- `$ARGUMENTS` : BeadsID（例: `t-abc`）

## 使用するサブエージェント
- `beads-manager` : タスク情報取得・ステータス更新・retry管理
- `git-manager` : featureブランチ作成・commit・devへのマージ
- `coder` : コード実装
- `tester` : テスト実行・結果分析

## 処理フロー

### 1. タスク情報取得 → `beads-manager`
- `bd show $ARGUMENTS --json` でタスク情報を取得する

### 2. featureブランチ作成 → `git-manager`
- 現在 `dev` ブランチにいることを確認する
- `git checkout -b feature/$ARGUMENTS` でfeatureブランチを作成する

### 3. ステータス更新 → `beads-manager`
- `bd update $ARGUMENTS --status in_progress` でステータスを更新する

### 4. コーディング → `coder`
- Beadsタスクのtitle, description, notesを渡す
- `docs/specification.md` と `docs/design-system.md` を参照させる
- コーディングを実行する
- 完了後、変更ファイルリストを受け取る

### 5. テスト → `tester`
- `coder` から受け取った変更ファイルリストを渡す
- テスト成功 → ステップ6に進む
- テスト失敗:
  - `tester` からテスト結果レポートを受け取る
  - `coder` に修正依頼を出す
  - 修正後、再度テスト
  - 最大3回リトライ
  - `beads-manager` でretryカウントを記録
  - 3回超過 → `/site-failed` を実行して停止

### 6. commit → `git-manager`
- `git add` で変更をステージング
- タスク内容に基づいたコミットメッセージを生成する
- `git commit` でコミットする

### 7. devへのマージ → `git-manager`
- `git checkout dev` でdevブランチに移動する
- `git merge feature/$ARGUMENTS` で通常マージする（squashしない）
- featureブランチは削除しない

### 8. タスククローズ → `beads-manager`
- 実施内容の要約をnotesに記録する
- `bd close $ARGUMENTS` でタスクをクローズする
