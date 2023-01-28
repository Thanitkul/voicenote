const nodemailer = require("nodemailer");

async function sendEmail({ to, subject, html, from = process.env.EMAIL_FROM }) {
  
   
    const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
              user: process.env.USER, // generated ethereal user
              pass: process.env.PASS // generated ethereal password
            }
    })
        
   
   await transporter.sendMail({ from, to, subject, html });
   
    console.log("email sent sucessfully");
        
    };

module.exports = sendEmail;