#!/usr/bin/env node

/**
 * デザインサンプル生成スクリプト
 *
 * 使い方:
 *   node generate-samples.js <params.json> <output-dir>
 *
 * params.json の形式:
 *   配列形式で、各要素がパラメータオブジェクト（parameter-schema.md 参照）
 *   [
 *     { "name": "モダンブルー", "colorPrimary": "#2563eb", ... },
 *     { "name": "ダークモード", "colorPrimary": "#60a5fa", ... },
 *     ...
 *   ]
 *
 * 出力:
 *   <output-dir>/sample-01.html
 *   <output-dir>/sample-02.html
 *   ...
 *   <output-dir>/index.html  （一覧ページ）
 */

const fs = require("fs");
const path = require("path");

// 引数の取得
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("使い方: node generate-samples.js <params.json> <output-dir>");
  console.error("  params.json : パラメータ配列のJSONファイル");
  console.error("  output-dir  : HTML出力先ディレクトリ");
  process.exit(1);
}

const paramsPath = path.resolve(args[0]);
const outputDir = path.resolve(args[1]);

// テンプレートの読み込み
const scriptDir = path.dirname(__filename);
const templatePath = path.join(scriptDir, "..", "assets", "template.html");

if (!fs.existsSync(templatePath)) {
  console.error(`テンプレートが見つかりません: ${templatePath}`);
  process.exit(1);
}
const template = fs.readFileSync(templatePath, "utf-8");

// パラメータの読み込み
if (!fs.existsSync(paramsPath)) {
  console.error(`パラメータファイルが見つかりません: ${paramsPath}`);
  process.exit(1);
}
const params = JSON.parse(fs.readFileSync(paramsPath, "utf-8"));

if (!Array.isArray(params) || params.length === 0) {
  console.error("パラメータは1つ以上の要素を持つ配列である必要があります");
  process.exit(1);
}

// 出力ディレクトリの作成
fs.mkdirSync(outputDir, { recursive: true });

// テンプレートのプレースホルダーを置換する関数
function applyParams(templateStr, paramObj) {
  let result = templateStr;
  for (const [key, value] of Object.entries(paramObj)) {
    // {{key}} をすべて置換
    const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    result = result.replace(placeholder, value);
  }
  return result;
}

// 各サンプルHTMLの生成
const sampleFiles = [];
params.forEach((paramSet, index) => {
  const num = String(index + 1).padStart(2, "0");
  const filename = `sample-${num}.html`;
  const html = applyParams(template, paramSet);
  const outputPath = path.join(outputDir, filename);
  fs.writeFileSync(outputPath, html, "utf-8");
  sampleFiles.push({ filename, name: paramSet.name || `サンプル ${num}` });
  console.log(`生成: ${filename} - ${paramSet.name || ""}`);
});

// 一覧ページの生成
const indexHtml = generateIndexPage(sampleFiles);
fs.writeFileSync(path.join(outputDir, "index.html"), indexHtml, "utf-8");
console.log(`生成: index.html（一覧ページ）`);
console.log(`\n完了: ${sampleFiles.length} 件のサンプルを ${outputDir} に出力しました`);

/**
 * サンプル一覧ページを生成する
 */
function generateIndexPage(files) {
  const cards = files
    .map(
      (f, i) => `
      <div class="index-card" onclick="window.open('${f.filename}', '_blank')">
        <div class="index-card-number">${i + 1}</div>
        <div class="index-card-name">${f.name}</div>
        <div class="index-card-preview">
          <iframe src="${f.filename}" title="${f.name}"></iframe>
        </div>
        <div class="index-card-action">クリックして開く</div>
      </div>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>デザインサンプル一覧</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif;
      background: #f1f5f9;
      color: #1e293b;
      padding: 32px;
    }
    h1 {
      text-align: center;
      margin-bottom: 8px;
      font-size: 1.75rem;
    }
    .subtitle {
      text-align: center;
      color: #64748b;
      margin-bottom: 32px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 24px;
      max-width: 1600px;
      margin: 0 auto;
    }
    .index-card {
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .index-card:hover {
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      transform: translateY(-4px);
    }
    .index-card-number {
      display: inline-block;
      background: #2563eb;
      color: #fff;
      font-weight: 700;
      font-size: 0.8rem;
      padding: 4px 12px;
      margin: 12px 0 0 12px;
      border-radius: 4px;
    }
    .index-card-name {
      font-weight: 700;
      font-size: 1.1rem;
      padding: 8px 16px 4px;
    }
    .index-card-preview {
      position: relative;
      width: 100%;
      height: 240px;
      overflow: hidden;
      margin: 8px 0;
    }
    .index-card-preview iframe {
      width: 1280px;
      height: 900px;
      border: none;
      transform: scale(0.28);
      transform-origin: top left;
      pointer-events: none;
    }
    .index-card-action {
      text-align: center;
      padding: 12px;
      color: #2563eb;
      font-weight: 600;
      font-size: 0.9rem;
      border-top: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>
  <h1>デザインサンプル一覧</h1>
  <p class="subtitle">各カードをクリックするとサンプルが開きます</p>
  <div class="grid">
    ${cards}
  </div>
</body>
</html>`;
}
