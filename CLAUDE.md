# CLAUDE.md

## プロジェクト概要

このリポジトリは、Claude Codeの `.claude` フォルダ配下に配置する設定ファイル群（カスタムコマンド、エージェント定義、ワークフロー設定など）を開発・管理するためのプロジェクトです。

ここで開発したものを、別の実プロジェクトの `.claude/` にコピーして利用します。

## 開発方針

- 各ワークフローは `dev-workflows/` 配下にディレクトリを分けて管理する
- 実際のプロジェクトで使いながら改善点を見つけ、このリポジトリにフィードバックして徐々にブラッシュアップする
- コマンド定義（commands/）とエージェント定義（agents/）は明確に分離する

## ディレクトリ構成

```
dev-workflows/
  <ワークフロー名>/
    commands/       スラッシュコマンド定義（.md）
    agents/         サブエージェント定義（.md）
    settings.json   権限・フック設定
    README.md       ワークフローの説明
```

## ファイル形式

- コマンド定義: Markdown（処理フロー、引数、使用エージェントを記載）
- エージェント定義: Markdown with YAML frontmatter（name, description, tools, model）
- 設定ファイル: JSON（permissions, hooks, enabledPlugins等）

## 注意事項

- このリポジトリ自体はアプリケーションコードを含まない（ワークフロー定義のみ）
- 新しいワークフローを追加する場合は `dev-workflows/` 配下に新ディレクトリを作成する
