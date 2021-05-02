# portfolio_with_node

// package.json 作成
// オプションで y をつける場合はデフォルトの設定という意味
npm init -y

// ライブラリインストール
//express: Web フレームワーク
//morgan: ロギング
//body-parser: HTTP のリクエストボディを変換
npm install --save express morgan body-parser
// ファイルに変更が会った際に自動的にリスタートしてくれるライブラリ
npm install --save-dev nodemon

//package.json のスクリプトを書き換え
// この書き換えをすることによってショートカットを作成している
// npm run dev で nodemon index.js というコマンドを打っていることになる
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev" : "nodemon index.js"
},

// cors を許可するライブラリ
npm install --save cors

// メールを送信するライブラリ
npm install --save nodemailer

// .env ファイルを作成し、環境ごとに設定を変更することを実現するライブラリ
npm install dotenv --save
# portfolio_node
