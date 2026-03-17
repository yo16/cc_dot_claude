# shared

ワークフロー横断で使用する共有リソース。

## 構成

| ディレクトリ | 説明 | コピー先 |
|------------|------|---------|
| `skills/` | Claude Codeスキル | `.claude/skills/` |
| `knowledge/` | 技術固有の制約・過去の教訓 | `.claude/knowledge/` |

## スキル一覧

| スキル | 説明 | 使用ワークフロー |
|-------|------|----------------|
| `task-decomposer` | 仕様書→Beadsタスク分解 | batch-dev, static-site |
| `design-sampler` | デザインサンプル生成・比較 | static-site |

## プロジェクトへの導入

プロジェクトの技術スタックに該当するものだけを選んで `.claude/` にコピーする。
