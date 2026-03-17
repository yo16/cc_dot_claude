# batch-dev

オープンなBeadsタスクをすべて自動実行し、完了後にまとめて1つのPRを作成するワークフロー。

## 概要

1. 人間が仕様を決め、Beadsにタスクを登録する
2. `/batch-start` を実行すると、オープンなタスクを依存関係順に自動で全件実行する
3. 全タスク完了後、`dev` ブランチをGitHubへpushし、`dev → main` のPRを作成する

## ブランチ戦略

```
main ← dev ← feature/t-xxx（タスクごと）
```

- タスクごとに `feature/t-xxx` ブランチを作成して実装
- テスト成功後、`feature/t-xxx` を `dev` へマージ（commit履歴を残す通常マージ）
- featureブランチはマージ後もローカルに残す（ロールバック用）
- 全タスク完了後、`dev` をGitHubへpushしPRを作成

## コマンド

| コマンド | 説明 |
|---------|------|
| `/batch-start` | 全タスク一括実行のエントリーポイント |
| `/batch-task-execute` | 単一タスクの実行（コーディング→テスト→マージ） |
| `/batch-push-pr` | dev をGitHubへpushしPRを作成 |
| `/batch-failed` | 失敗時の処理（停止・通知） |

## エージェント

| エージェント | 説明 |
|------------|------|
| `task-planner` | オープンタスクの取得・依存関係に基づく実行順決定 |
| `coder` | コーディング専門（実装・テストコード作成） |
| `tester` | テスト専門（実行・結果分析・修正依頼作成） |
| `beads-manager` | Beadsタスク管理（ステータス更新・notes記録） |
| `git-manager` | ローカルgit操作専門（ブランチ・マージ・commit） |
| `github-manager` | GitHub操作専門（push・PR作成） |

## 失敗時の挙動

- **テスト失敗**: 最大3回リトライ → 超過で自動処理を停止しユーザーへ通知
- **その他の失敗**（git操作エラー、GitHub接続エラー等）: 即座に停止しユーザーへ通知
