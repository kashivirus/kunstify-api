import nodemailer from 'nodemailer'


class OtpGenMail{
    constructor(email){
        this.email = email

        this.transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
    }

    generateOtp(){
        return Math.floor(1000 + Math.random() * 9000).toString()
    }

    async sendEmail(sendEmailTo  , otp) {
        const mailOptions    = {
            from:this.email,
            to:sendEmailTo,
            subject:"Your Otp to login",
            text:`Your one time password (OTP) is ${otp}` 
        }

        return this.transport.sendMail(mailOptions)
    }



}

export default OtpGenMail;