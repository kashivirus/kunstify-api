
import nodemailer  from "nodemailer"
import dotenv from "dotenv";

dotenv.config()

class EmailSender {
    constructor() {
        this.transporter = nodemailer.createTransport({
        // host: "smtp.forwardemail.net",
        // port: 465,
        // secure: true,

        service:"gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        });
    }

    async sendEmail({ from, to, subject, text, html }) {

        const info = await this.transporter.sendMail({
          from, // sender address
          to, // list of receivers
          subject, // Subject line
          text, // plain text body
          html, // html body
        });

    }
}

export default EmailSender;


//   // Example usage:
//   const emailSender = new EmailSender();

//   const emailOptions = {
//       from: '"Fred Foo 👻" <foo@example.com>',
//       to: "bar@example.com, baz@example.com",
//       subject: "Hello ✔",
//       text: "Hello world?",
//       html: "<b>Hello world?</b>",
//   };

//   emailSender.sendEmail(emailOptions);export default EmailSender
