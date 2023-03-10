var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();
var transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'rgrang816@west-mec.org',
      pass: process.env.NODEMAILER_PASS,
    },
  })
);

const sendEmail = (target, subject, contents) => {
  var mailOptions = {
    from: 'rgrang816@west-mec.org',
    to: target,
    subject: subject,
    html: baseEmail.replace('swapOut',contents),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      // console.log('Email sent: ' + info.response);
    }
  });
};

const baseEmail=`
<html>
<head>
  <style>
    #body {
      text-decoration:none;
      list-style-type:none;
    }
    li{
      text-decoration:none;
      list-style-type:none;
      display:inline-block;
    }
  </style>
</head>
<body>
  <ul id='body'>
    swapOut
  </ul>
</body>
</html>`


module.exports = { sendEmail };