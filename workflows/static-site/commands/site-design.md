# /site-design

デザインシステムを2段階の選定プロセスで決定する。
`design-sampler` スキルのスクリプトとテンプレートを使用してサンプルHTMLを生成する。

## 引数
なし

## 前提
- `docs/specification.md` が作成済みであること（`/site-hearing` 完了後）
- `design-sampler` スキルが `.claude/skills/design-sampler/` にインストールされていること

## 処理フロー

### 1. 仕様書の読み込み
- `docs/specification.md` を読み、デザイン方向性を把握する
- `design-sampler` スキルの `references/parameter-schema.md` を読み、使用可能なパラメータを把握する

### 2. 第1段階: 10個のサンプルから3個を選ぶ

#### パラメータセットの決定
- 仕様書のデザイン方向性に基づき、10種類のパラメータセットを決定する
- 各パラメータセットは `references/parameter-schema.md` のスキーマに従う
- 10種類はそれぞれ明確に異なるデザイン方向性を持つこと:
  - カラースキーム（ダーク/ライト、暖色/寒色、モノトーン/カラフル）
  - フォント（セリフ/サンセリフ）
  - 余白・角丸（ゆったり/タイト、角丸なし/小/大）
  - レイアウト（ヒーロー中央/左寄せ）

#### サンプル生成
- パラメータ配列をJSONファイルとして `.claude/tmp/design-params-round1.json` に書き出す
- `design-sampler` スキルのスクリプトを実行する:
  ```bash
  node .claude/skills/design-sampler/scripts/generate-samples.js .claude/tmp/design-params-round1.json docs/design-samples/round1
  ```

#### ユーザーへの提示
- `docs/design-samples/round1/index.html` をブラウザで開くよう案内する
- 一覧ページで10個のサンプルを比較し、3個を選んでもらう

### 3. 第2段階: 最終1個を決定する

#### パラメータセットの決定
- 第1段階で選ばれた3個のパラメータをベースにする
- 3個の特徴を組み合わせたもの、微調整したもの等を含め、10種類のバリエーションを作成する

#### サンプル生成
- パラメータ配列をJSONファイルとして `.claude/tmp/design-params-round2.json` に書き出す
- `design-sampler` スキルのスクリプトを実行する:
  ```bash
  node .claude/skills/design-sampler/scripts/generate-samples.js .claude/tmp/design-params-round2.json docs/design-samples/round2
  ```

#### ユーザーへの提示
- `docs/design-samples/round2/index.html` をブラウザで開くよう案内する
- 最終的な1個を選んでもらう

### 4. デザインシステムの確定

- 選ばれたサンプルのパラメータから `docs/design-system.md` を生成する
- パラメータの全値を記録し、coderエージェントがCSS custom propertiesに反映できるようにする:

```markdown
# デザインシステム

## カラー
- プライマリ: #xxx
- セカンダリ: #xxx
- アクセント: #xxx
- 背景: #xxx
- テキスト: #xxx
- ボーダー: #xxx

## タイポグラフィ
- 見出しフォント: xxx
- 本文フォント: xxx
- フォントサイズスケール: xxx

## スペーシング
- 基本単位: xxxpx
- スケール: xxx

## コンポーネントスタイル
- 角丸: xxxpx
- シャドウ: xxx
- ボタンスタイル: xxx

## ブレークポイント
- モバイル: 768px
- タブレット: 1024px
- デスクトップ: 1200px+
```

### 5. 一時ファイルの削除
- `.claude/tmp/design-params-round1.json` を削除する
- `.claude/tmp/design-params-round2.json` を削除する

- 確定したら、次のステップ `/site-build` を案内する
