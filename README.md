# 資金管理 家計簿

ビルド不要の静的Webアプリです(HTML / CSS / JavaScript のみ)。

## VS Codeでの開く手順
1. このフォルダをVS Codeで開く
2. 拡張機能「Live Server」をインストールし、`index.html` を右クリック →「Open with Live Server」
   (`index.html` をブラウザで直接開いても動きます)

## ファイル構成
- `index.html` … 画面の骨組み(ヘッダー、本文、下部タブ)
- `style.css` … 見た目(ダークテーマ、スマホ/PC対応)
- `app.js` … 計算・画面描画・保存のすべて(初期データは冒頭の `S0`)

## 補足
- データはブラウザの localStorage(キー `kk2`)に保存されます。別端末へは設定タブのバックアップで移行します。
- 外部リソースは Google Fonts(Zen Kaku Gothic New)のみです。オフラインでも既定フォントで動作します。
- 計算の中心は `app.js` の `calc()`(給与後残高)、`sal()`(給与・賞与)、`trend()`(貯蓄推移)です。
