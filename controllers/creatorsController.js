import dotenv from "dotenv"
dotenv.config()

import Creators from "../models/creators.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer"
import EmailSender from "../config/Email-sender.js";
import OtpGenMail from "../config/OTP.js";



let creators = new Creators;
let emailSender = new EmailSender;




const check = async(req, res)=>{
    const data = await creators.dummy
    res.json(data)
}

const signUp = async(req, res)=>{
    
    const {walletAddress , username, email , password} = req.body;
    const verificationTokenSend = crypto.randomBytes(20).toString('hex')
    try {
        if(!walletAddress || !username || !email || !password) return res.json({message:"please enter all details"})

        const [checkEmail] = await creators.checkEmail(email)
        if(checkEmail.length >0) return res.json({ message: "Email already exists" });

        const [inputwalletAddress]= await creators.checkWalletAddress(walletAddress)
        if(inputwalletAddress.length >0) return res.json({message:"wallet address already exists"})

        const hashPassword = await bcrypt.hash(password , 10)

        const user = await creators.signUP(username, walletAddress, hashPassword, email)
        


        if(user){
                let url = `http://${process.env.localhost}:${8000}/signup/verify/${verificationTokenSend}`
                const emailOptions = {
                    from: process.env.EMAIL_SENDER,
                    to: email,
                    subject: "Hello ✔",
                    text: "Hello world?231231",
                    // html: "<b>Hello world?</b>",

                    // html:`${verificationTokenSend}`,
                    html:`${url}`,
                    
                    // text: `Click the following link to verify your email: http://localhost:${port}/verify/${verificationToken}`,
                    // http://localhost:${port}/verify/${verificationToken}`,
                };
    
                await emailSender.sendEmail(emailOptions)
                .then(()=>{
                    res.json({message:"email has been sent"})
                })
                .catch((error)=>res.json({message:error.message}))

        }

        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}



const verifySignupToken = async(req, res)=>{
    const { token } = req.params;

    try {
        const [data] = await creators.updateVeriTok(token)

        if(data.length> 0){
            res.json({message:"your account has been verified"})
        }else{
            res.status(404).json({ error: 'Verification token not found.' });
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


const signIn = async(req, res)=>{

    const {email, password} = req.body;

    if(!email, !password)return res.json({message:"please enter all details"})

    try {
        const [rows, fields]= await creators.checkEmailPass(email)
        if(!rows.length) return res.json({message:"user not found"})
        let hahedPassword = rows[0].password
        const found =await bcrypt.compare(password, hahedPassword )

        if(!found)return res.json({message:"password does not match"})
        
        const otpgensendMail = new OtpGenMail(email)
        let otpgenerate = Math.floor(1000 +Math.random() *9000).toString()

        await otpgensendMail.sendEmail(email , otpgenerate)
        .then(()=>{
            res.status(201).json({message:"otp has been sent"})
        })
        .catch(err=>res.json({message:err.message}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }

}




const getAllNfts = async(req, res)=>{


    try {
        
        const [data] = creators.getAllNFTS()
        
        if(data.length < 0){

        }
    } catch (error) {
        
    }
}

export{  check , signUp , verifySignupToken , signIn , getAllNfts} 