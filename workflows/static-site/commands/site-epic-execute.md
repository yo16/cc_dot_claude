# /site-epic-execute

1エピック（1ページ）の全タスクを実行し、mainへマージしてユーザー確認を得る。

## 引数
- `$ARGUMENTS` : エピックのBeadsID（例: `t-abc`）

## 使用するサブエージェント
- `beads-manager` : エピック・タスク情報取得、ステータス管理
- `git-manager` : ブランチ操作、マージ
- その他は `/site-task-execute` 経由で使用

## 処理フロー

### 1. エピック情報取得 → `beads-manager`
- `bd show $ARGUMENTS --json` でエピック情報を取得する
- エピックの子タスク一覧を取得する

### 2. タスク実行順の決定
- 子タスクの依存関係に基づいて実行順序を決定する

### 3. ステータス更新 → `beads-manager`
- `bd update $ARGUMENTS --status in_progress` でエピックのステータスを更新する

### 4. タスクの順次実行
- 実行順序に従い、各タスクについて `/site-task-execute <BeadsID>` の処理を実行する
- 1タスクが完了（devへのマージまで）してから次に進む
- いずれかのタスクで失敗した場合は `/site-failed` を実行して停止する

### 5. dev → main マージ → `git-manager`
- 全タスク完了後、`dev` ブランチ上で全テストが通ることを確認する
- `git checkout main` でmainブランチに移動する
- `git merge dev` で通常マージする（commit履歴を残す）
- `git checkout dev` でdevブランチに戻る

### 6. エピッククローズ → `beads-manager`
- 実施内容の要約をnotesに記録する
- `bd close $ARGUMENTS` でエピックをクローズする

### 7. ユーザー確認
- mainにマージした内容をユーザーに報告する:
  - 作成・変更したページの一覧
  - 各ページの主な機能
  - ブラウザでの確認方法（`npx next dev` で起動し、該当ページにアクセス）
- ユーザーの確認結果を待つ:
  - **OK**: 次のエピックに進む
  - **修正あり**: 修正内容をヒアリングし、devブランチで修正 → 再度mainへマージ → 再確認
