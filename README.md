# cc_dot_claude

Claude Codeで使用する `.claude` フォルダ配下の設定ファイル（カスタムコマンド、エージェント定義、スキル等）を管理・開発するリポジトリです。

## 目的

- 複数のプロジェクトで共通して使えるClaude Code用の開発ワークフローを整備する
- ここで開発・ブラッシュアップしたものを、実際の開発プロジェクトの `.claude/` にコピーして利用する

## 構成

```
workflows/             ワークフロー定義
  pr-gated/              タスクごとにPRを作成するワークフロー
  batch-dev/             全タスク一括実行→まとめてPR作成するワークフロー
shared/                ワークフロー横断の共有リソース
  skills/                Claude Codeスキル
    task-decomposer/       仕様書→Beadsタスク分解スキル
  knowledge/             技術固有の制約・過去の教訓
```

## 使い方

1. このリポジトリでワークフローを開発・改善する
2. 実際の開発プロジェクトの `.claude/` 配下に必要なファイルをコピーして使う

```
.claude/
  commands/      ← workflows/<name>/commands/ からコピー
  agents/        ← workflows/<name>/agents/ からコピー
  skills/        ← shared/skills/ から該当するものをコピー
  knowledge/     ← shared/knowledge/ から該当するものをコピー
  settings.json  ← workflows/<name>/settings.json をコピー
```

## ワークフロー

### pr-gated
タスクごとにfeatureブランチで開発しPRを作成するワークフロー。

### batch-dev
全オープンタスクを依存関係順に一括実行し、完了後にまとめて1つのPRを作成するワークフロー。

## ライセンス

MIT
