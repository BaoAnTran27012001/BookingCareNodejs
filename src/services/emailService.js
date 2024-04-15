const nodemailer = require("nodemailer");
require('dotenv').config();
let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Viện Xuân Quỳnh 👻" <nhumai9429@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh (Booking Information)", // Subject line
    // plain text body
    html: getBodyHTMLEmail(dataSend), // html body

  });
}



let getBodyHTMLEmail = (dataSend) => {
  let result = '';
  if (dataSend.language === 'vi') {
    result = `<h3>Xin chào ${dataSend.patientName}</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online thành công</p>
            <p>Thông tin đặt lịch khám bệnh:</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <p>Nếu các thông tin trên là đúng sự thật,vui lòng click vào đường link bên dưới để hoàn thành thủ tục đặt lịch khám bệnh</p>
            <div><a href=${dataSend.redirectLink} target="_blank">Nhấn vào đây</a></div>
            <div>Xin chân thành cảm ơn</div>
    `
  } else if (dataSend.language === 'en') {
    result = `<h3>Dear ${dataSend.patientName}</h3>
    <p>You received this email because of booking online successfully.</p>
    <p>Booking Information:</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    <p>If all the information above is trustworthy then please CLICK THE LINK BELOW to complete the booking procedure</p>
    <div><a href=${dataSend.redirectLink} target="_blank">Click Here</a></div>
    <div>Thank you</div>
`
  }
  return result;
}

module.exports = {
  sendSimpleEmail
}