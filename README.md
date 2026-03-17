# cc_dot_claude

Claude Codeで使用する `.claude` フォルダ配下の設定ファイル（カスタムコマンド、エージェント定義、ワークフロー等）を管理・開発するリポジトリです。

## 目的

- 複数のプロジェクトで共通して使えるClaude Code用の開発ワークフローを整備する
- ここで開発・ブラッシュアップしたものを、実際の開発プロジェクトの `.claude/` にコピーして利用する

## 構成

```
dev-workflows/          ワークフロー定義
  pr-gated/             PR駆動の開発ワークフロー
    commands/            カスタムスラッシュコマンド
      task-start.md        タスク開始
      task-fix.md          テスト失敗・レビューNG時の修正ループ
      task-open-pr.md      PR作成
      task-close.md        マージ後のクロージング
      task-failed.md       タスク失敗時の処理
    agents/              サブエージェント定義
      coder.md             コーディング専門エージェント
      tester.md            テスト専門エージェント
      beads-manager.md     Beadsタスク管理エージェント
      git-manager.md       Git/GitHub管理エージェント
    settings.json        権限設定（コピー先用）
    settings.local.json  権限設定（ローカル用）
```

## 使い方

1. このリポジトリでワークフローを開発・改善する
2. 実際の開発プロジェクトの `.claude/` 配下に必要なファイルをコピーして使う

## ワークフロー: pr-gated

Beadsタスク管理と連携し、フェーズごとにfeatureブランチで開発してPRを作成するワークフローです。

- `/task-start <BeadsID>` でタスク開始 → コーディング → テスト → PR作成まで自動化
- テスト失敗時は最大3回のリトライループ
- 4つの専門エージェント（coder, tester, beads-manager, git-manager）による役割分担

## ライセンス

MIT
