const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oAuth2Client = new google.auth.OAuth2(
  process.env.MAILING_SERVICE_CLIENT_ID,
  process.env.MAILING_SERVICE_CLIENT_SECRET,
  REDIRECT_URI
);

const sendMailCtrl = {
  contactMeSendMail: async (req, res) => {
    try {
      const { email, fullname, message } = req.body;

      if (!fullname || !email || !message)
        return res.status(400).json({ msg: "모든 항목을 입력해주세요." });

      let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
      });

      let mailOptions = {
        from: email,
        to: process.env.MAILTRAP_EMAIL,
        subject: `Message from ${fullname} <${email}>`,
        text: `${message}`,
      };

      const result = transporter.sendMail(mailOptions);

      res.json({
        msg: "메세지가 정상적으로 전송되었습니다.",
        result,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.messsage });
    }
  },
  registerSendMail: async (req, res) => {
    try {
      const { to, url, text } = req.body;

      oAuth2Client.setCredentials({
        refresh_token: process.env.MAILING_SERVICE_REFRESH_TOKEN,
      });

      const accessToken = oAuth2Client.getAccessToken();
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.SENDER_EMAIL_ADDRESS,
          clientId: process.env.MAILING_SERVICE_CLIENT_ID,
          clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
          refreshToken: process.env.MAILING_SERVICE_REFRESH_TOKEN,
          accessToken,
        },
      });
      let mailOptions = {
        from: process.env.SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "CoursePlanet 이메일 인증 절차",
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">
            이메일 인증 절차를 위한 메일입니다.
          </h2>
          <p>
            CoursePlanet 웹 사이트에 이용해주셔서 감사드리며, 아래 버튼을 누르면 이메일 인증이 완료됩니다.
          </p>
          
          <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">
            ${text}
          </a>

          <p>
            버튼 클릭을 통해 이메일 인증이 완료되지 않는다면 아래 링크를 클릭해주세요.
          </p>

          <div><a href=${url}>${url}</div>
        </div>
      `,
      };
      const result = await transporter.sendMail(mailOptions);

      return result;
    } catch (err) {
      return err;
    }
  },
};

module.exports = sendMailCtrl;
