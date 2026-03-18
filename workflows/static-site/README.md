# static-site

Next.jsで静的なウェブサイトを構築するワークフロー。

## 概要

1. `/site-hearing` でヒアリングし、仕様書を作成する
2. `/site-design` でデザインシステムを選定する（2段階の選定プロセス）
3. `/site-build` でBeadsタスクに分解し、エピック（ページ）単位で順次構築する
4. エピック完了ごとにmainへマージし、ユーザーが確認する

## 技術スタック

- Next.js（静的HTML出力: `next export` → `out/`）
- CSS Modules + CSS custom properties（デザイントークン）
- レスポンシブ対応必須
- プレイスホルダー画像: placehold.co
- Tailwind CSS は使用しない

## ブランチ戦略

```
main ← dev ← feature/t-xxx（タスクごと）
```

- タスクごとに `feature/t-xxx` を作成し、完了後 `dev` へマージ
- エピック（ページ）の全タスク完了後、`dev` を `main` へマージ
- mainマージ後、ユーザーが確認 → OK なら次のエピックへ
- featureブランチはローカルに残す（ロールバック用）
- GitHub操作（push・PR）は行わない

## コマンド

| コマンド | 説明 |
|---------|------|
| `/site-hearing` | ヒアリング → 仕様書作成 |
| `/site-design` | デザインシステム選定（2段階） |
| `/site-build` | サイト構築エントリーポイント（全エピック順次実行） |
| `/site-epic-execute` | 1エピック（1ページ）の実行 |
| `/site-task-execute` | 1タスク（1機能）の実行 |
| `/site-failed` | 失敗時の処理（停止・通知） |

## エージェント

| エージェント | 説明 |
|------------|------|
| `task-planner` | エピック→タスク分解、依存関係解析 |
| `designer` | UI/UXデザイン専門（マークアップ・スタイリング・レスポンシブ・アニメーション） |
| `coder` | コーディング専門（Next.js統合・TypeScript型定義・テスト作成） |
| `tester` | テスト専門（表示確認・レスポンシブ・アクセシビリティ） |
| `beads-manager` | Beadsタスク管理 |
| `git-manager` | ローカルgit操作専門（push・PR なし） |

## 使用するスキル

| スキル | 説明 |
|-------|------|
| `design-sampler` | デザインサンプル生成・比較（`shared/skills/`） |
| `task-decomposer` | 仕様書→タスク分解（`shared/skills/`） |

## Beadsタスク構造

```
エピック（ページ単位）
  └─ タスク（機能単位）
      - 共通コンポーネント（ページ横断）
      - ページ固有のセクション
      - アニメーション等のインタラクション
```

## 失敗時の挙動

- テスト失敗: 最大3回リトライ → 超過で停止しユーザーへ通知
- その他の失敗: 即座に停止しユーザーへ通知
