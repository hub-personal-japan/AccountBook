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

## Firebase による自動同期(スマホ↔PC)
`sync.js` が Googleログイン + Firestore でデータを自動同期します(最終更新が新しい方を採用)。
Firebaseコンソールで次を1回だけ設定してください。
1. Authentication → ログイン方法 → **Google** を有効化
2. Authentication → 設定 → 承認済みドメイン に `hub-personal-japan.github.io` を追加(`localhost` は最初から許可済み)
3. Firestore Database を作成し、ルールを次にして公開
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
使い方: 各端末で右上の「☁ ログイン」→ 同じGoogleアカウントでログイン。以降は入力が自動で反映されます。
