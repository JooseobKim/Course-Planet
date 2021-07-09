import nodemailer from "nodemailer";

const sendMail = ({ from, fullname, message }) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  let mailOptions = {
    from: from,
    to: process.env.MAILTRAP_TO,
    subject: `Message from ${fullname} <${from}>`,
    text: `${message} it works!`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return info;
  });
};

export default sendMail;
