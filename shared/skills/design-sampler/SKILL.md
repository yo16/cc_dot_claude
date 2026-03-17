---
name: design-sampler
description: "デザインサンプルの生成・比較スキル。サイトのデザインを選定する際に使用する。デザインを比較したい、デザインサンプルを見たい、デザインを選びたい、といったリクエストで使用する。"
---

# デザインサンプル生成・比較

パラメータセット（カラー、フォント、角丸等）を受け取り、HTMLファイルとしてデザインサンプルを生成する。
一覧ページ（index.html）も自動生成され、ブラウザでサンプルを比較できる。

## 使い方

### 1. パラメータJSONを作成する

`references/parameter-schema.md` のスキーマに従い、パラメータセットの配列をJSONファイルとして作成する。

```json
[
  { "name": "モダンブルー", "colorPrimary": "#2563eb", ... },
  { "name": "ダークモード", "colorPrimary": "#60a5fa", ... },
  ...
]
```

各パラメータの詳細は `references/parameter-schema.md` を参照すること。

### 2. スクリプトを実行する

```bash
node ${CLAUDE_SKILL_DIR}/scripts/generate-samples.js <params.json> <output-dir>
```

- `<params.json>` : パラメータ配列のJSONファイルパス
- `<output-dir>` : HTML出力先ディレクトリ

### 3. ブラウザで確認する

- `<output-dir>/index.html` を開くと、全サンプルの一覧が表示される
- 各サンプルカードをクリックすると、フルサイズのデザインサンプルが開く
- 右上のバッジにサンプル名が表示される

## ワークフローでの使い方（site-design コマンドとの連携）

### 第1段階（10個から3個を選ぶ）
1. 仕様書のデザイン方向性をもとに、10種類のパラメータセットを決定する
2. JSONファイルとして `.claude/tmp/design-params-round1.json` に書き出す
3. スクリプトを実行して `docs/design-samples/round1/` に出力する
4. ユーザーに `docs/design-samples/round1/index.html` をブラウザで開いてもらい、3個を選んでもらう

### 第2段階（最終1個を決める）
1. 選ばれた3個をベースに、バリエーションを含む10種類のパラメータセットを決定する
2. JSONファイルとして `.claude/tmp/design-params-round2.json` に書き出す
3. スクリプトを実行して `docs/design-samples/round2/` に出力する
4. ユーザーに `docs/design-samples/round2/index.html` をブラウザで開いてもらい、最終1個を選んでもらう

### デザインシステムの確定
選ばれたサンプルのパラメータから `docs/design-system.md` を生成する。

## パラメータの設計指針

10種類のバリエーションを作る際のポイント:
- **カラースキーム**: ダーク/ライト、暖色/寒色、モノトーン/カラフルを混ぜる
- **フォント**: セリフ/サンセリフ、日本語フォントのバリエーション
- **余白・角丸**: ゆったり/タイト、角丸なし/小/大
- **レイアウト**: ヒーローのテキスト配置（中央/左寄せ）
- 明確に異なるデザインにし、ユーザーが方向性を判断しやすくする

## 参照ファイル

- `references/parameter-schema.md` : 全パラメータの定義と型
- `assets/template.html` : ベースHTMLテンプレート
- `scripts/generate-samples.js` : サンプル生成スクリプト
