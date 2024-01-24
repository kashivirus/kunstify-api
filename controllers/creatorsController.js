import dotenv from "dotenv"
dotenv.config()

import Creators from "../models/creators.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer"
import EmailSender from "../config/Email-sender.js";


let creators = new Creators;
let emailSender = new EmailSender;




const check = async(req, res)=>{
    const data = await creators.dummy
    res.json(data)
}

const signUp = async(req, res)=>{
    
    const {walletAddress , username, email , password} = req.body
    try {
        if(!walletAddress || !username || !email || !password) return res.json({message:"please enter all details"})

        const [checkEmail] = await creators.checkEmail(email)
        if(checkEmail.length >0) return res.json({ message: "Email already exists" });

        const [inputwalletAddress]= await creators.checkWalletAddress(walletAddress)
        if(inputwalletAddress.length >0) return res.json({message:"wallet address already exists"})

        const hashPassword = await bcrypt.hash(password , 10)

        const user = await creators.signUP(username, walletAddress, hashPassword, email)
        


        if(user){
                const emailOptions = {
                    from: process.env.EMAIL_SENDER,
                    to: email,
                    subject: "Hello ✔",
                    text: "Hello world?",
                    html: "<b>Hello world?</b>",
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


export{  check , signUp} 