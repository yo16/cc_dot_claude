# パラメータスキーマ

デザインサンプル生成に使用するパラメータの定義。
各サンプルは1つのJSONオブジェクトとして表現する。

## パラメータ一覧

### カラー
| キー | 説明 | 例 |
|-----|------|-----|
| `colorPrimary` | プライマリカラー | `#2563eb` |
| `colorSecondary` | セカンダリカラー | `#7c3aed` |
| `colorAccent` | アクセントカラー | `#f59e0b` |
| `colorBg` | 背景色 | `#ffffff` |
| `colorBgAlt` | 代替背景色（セクション交互用） | `#f8fafc` |
| `colorText` | テキスト色 | `#1e293b` |
| `colorTextMuted` | 薄いテキスト色 | `#64748b` |
| `colorBorder` | ボーダー色 | `#e2e8f0` |
| `colorHeaderBg` | ヘッダー背景色 | `#ffffff` |
| `colorHeaderText` | ヘッダーテキスト色 | `#1e293b` |
| `colorFooterBg` | フッター背景色 | `#1e293b` |
| `colorFooterText` | フッターテキスト色 | `#f8fafc` |
| `colorBtnPrimaryBg` | プライマリボタン背景 | `#2563eb` |
| `colorBtnPrimaryText` | プライマリボタンテキスト | `#ffffff` |
| `colorBtnSecondaryBg` | セカンダリボタン背景 | `transparent` |
| `colorBtnSecondaryText` | セカンダリボタンテキスト | `#2563eb` |
| `colorBtnSecondaryBorder` | セカンダリボタンボーダー | `#2563eb` |

### タイポグラフィ
| キー | 説明 | 例 |
|-----|------|-----|
| `fontHeading` | 見出しフォント | `"Noto Sans JP", sans-serif` |
| `fontBody` | 本文フォント | `"Noto Sans JP", sans-serif` |
| `fontSizeBase` | ベースフォントサイズ | `16px` |
| `fontSizeH1` | h1サイズ | `2.5rem` |
| `fontSizeH2` | h2サイズ | `2rem` |
| `fontSizeH3` | h3サイズ | `1.5rem` |
| `fontSizeSmall` | 小テキストサイズ | `0.875rem` |
| `fontWeightHeading` | 見出しウェイト | `700` |
| `fontWeightBody` | 本文ウェイト | `400` |
| `lineHeightBody` | 本文行間 | `1.75` |
| `letterSpacingHeading` | 見出し字間 | `0.02em` |

### スペーシング
| キー | 説明 | 例 |
|-----|------|-----|
| `spacingUnit` | 基本単位 | `8px` |
| `spacingSection` | セクション間余白 | `80px` |
| `spacingContent` | コンテンツ内余白 | `24px` |
| `maxWidth` | コンテンツ最大幅 | `1200px` |

### 装飾
| キー | 説明 | 例 |
|-----|------|-----|
| `borderRadius` | 角丸 | `8px` |
| `borderRadiusLarge` | 大きい角丸（カード等） | `12px` |
| `borderRadiusBtn` | ボタン角丸 | `6px` |
| `shadow` | 標準シャドウ | `0 1px 3px rgba(0,0,0,0.1)` |
| `shadowHover` | ホバー時シャドウ | `0 4px 12px rgba(0,0,0,0.15)` |
| `transitionSpeed` | トランジション速度 | `0.2s` |

### レイアウト
| キー | 説明 | 例 |
|-----|------|-----|
| `heroTextAlign` | ヒーローテキスト配置 | `center` or `left` |
| `heroMinHeight` | ヒーロー最小高さ | `60vh` |
| `navStyle` | ナビスタイル | `horizontal` or `logo-center` |
| `cardColumns` | カード列数 | `3` |

### Google Fonts
| キー | 説明 | 例 |
|-----|------|-----|
| `googleFontsUrl` | Google Fonts import URL | `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap` |

## JSONの例

```json
{
  "name": "モダンブルー",
  "colorPrimary": "#2563eb",
  "colorSecondary": "#7c3aed",
  "colorAccent": "#f59e0b",
  "colorBg": "#ffffff",
  "colorBgAlt": "#f8fafc",
  "colorText": "#1e293b",
  "colorTextMuted": "#64748b",
  "colorBorder": "#e2e8f0",
  "colorHeaderBg": "#ffffff",
  "colorHeaderText": "#1e293b",
  "colorFooterBg": "#1e293b",
  "colorFooterText": "#f8fafc",
  "colorBtnPrimaryBg": "#2563eb",
  "colorBtnPrimaryText": "#ffffff",
  "colorBtnSecondaryBg": "transparent",
  "colorBtnSecondaryText": "#2563eb",
  "colorBtnSecondaryBorder": "#2563eb",
  "fontHeading": "\"Noto Sans JP\", sans-serif",
  "fontBody": "\"Noto Sans JP\", sans-serif",
  "fontSizeBase": "16px",
  "fontSizeH1": "2.5rem",
  "fontSizeH2": "2rem",
  "fontSizeH3": "1.5rem",
  "fontSizeSmall": "0.875rem",
  "fontWeightHeading": "700",
  "fontWeightBody": "400",
  "lineHeightBody": "1.75",
  "letterSpacingHeading": "0.02em",
  "spacingUnit": "8px",
  "spacingSection": "80px",
  "spacingContent": "24px",
  "maxWidth": "1200px",
  "borderRadius": "8px",
  "borderRadiusLarge": "12px",
  "borderRadiusBtn": "6px",
  "shadow": "0 1px 3px rgba(0,0,0,0.1)",
  "shadowHover": "0 4px 12px rgba(0,0,0,0.15)",
  "transitionSpeed": "0.2s",
  "heroTextAlign": "center",
  "heroMinHeight": "60vh",
  "navStyle": "horizontal",
  "cardColumns": "3",
  "googleFontsUrl": "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
}
```
