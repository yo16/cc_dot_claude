# /site-epic-execute

1エピック（1ページ）の全タスクを実行し、devブランチ上で完了させる。

## 引数
- `$ARGUMENTS` : エピックのBeadsID（例: `t-abc`）

## 使用するサブエージェント
- `beads-manager` : エピック・タスク情報取得、ステータス管理
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

### 5. エピッククローズ → `beads-manager`
- 実施内容の要約をnotesに記録する
- `bd close $ARGUMENTS` でエピックをクローズする
