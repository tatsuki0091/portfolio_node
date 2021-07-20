require("dotenv").config();

// nodemailerの読み込み
const NodeMailer = require("nodemailer");

// メール送信関数
function sendMail(smtpData, mailData) {
  // SMTPサーバの情報をまとめる
  const transporter = NodeMailer.createTransport(smtpData);

  // メール送信
  transporter.sendMail(mailData, function (error, info) {
    if (error) {
      // エラー処理
      console.log(error);
    } else {
      // 送信時処理
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = function (app) {
  app.post("/send_email", function (req, res, next) {
    // SMTP情報を設定
    const smtpData = {
      // Gmailのサーバ
      host: "smtp.gmail.com",
      // Gmailの場合　SSL: 465 / TLS: 587
      port: "465",
      // SSLを有効
      secure: true,
      auth: {
        // メールアドレス（自身のアドレスを指定）
        user: process.env.NODE_MY_EMAIL_ADDRESS,
        // パスワード（自身のパスワードを指定）
        pass: process.env.NODE_APPLICATION_PASSWORD,
      },
    };

    // 送信内容を作成
    const mailData = {
      from: req.body.email, // 送信元名
      to: process.env.NODE_TO_EMAIL_ADDRESS, // 送信先
      subject: req.body.subject, // 件名
      text: req.body.message, // 通常のメール本文
      html: req.body.message, // HTMLメール
    };

    // メールを送信
    sendMail(smtpData, mailData);
    res.send([true]);
  });
};
