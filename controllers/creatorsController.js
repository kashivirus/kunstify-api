import dotenv from "dotenv"
dotenv.config()

import Creators from "../models/creators.js";
import bcrypt from "bcrypt";
import crypto, { Certificate } from "crypto";
import nodemailer from "nodemailer"
import EmailSender from "../config/Email-sender.js";
import OtpGenMail from "../config/OTP.js";
import { json } from "express";

import db from "../config/database.js"

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
        if(!walletAddress || !username || !email || !password) return res.status(400).json({message:"please enter all details"})


        const [rows, fields] = await creators.checkdata()

        const ifEMailEx = rows.map(async data =>{
            if(data.email === email ){
               return res.json({message:"duplicate email"})
            }
        })
        const ifEwall = rows.map(async data =>{
            if(data.walletAddress === walletAddress){
                return  res.json({message:"duplicate wallet found"})
            }
        })
        const ifEusername = rows.map(async data =>{
            if( data.username === username){
                return res.json({message:"duplicate username found"})
            }
        })


        Promise.all([ifEMailEx, ifEwall , ifEusername])
        
        const hashPassword =  await bcrypt.hash(password , 10) 
        const user = await creators.signUP(username, walletAddress, hashPassword, email ,verificationTokenSend )
        

        

        
        if(user){
                let url = `http://${process.env.localhost}:${8000}/signup/verify/${verificationTokenSend}`
                const emailOptions = {
                    from: process.env.EMAIL_SENDER,
                    to: email,
                    subject: "Hello ✔",
                    text: "Hello world?231231",
                    html:`${url}`,

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
    const token = req.params.token
    try {
        
        const [rows] = await creators.verifySignupToken(token)
        // console.log(rows)
        if(rows && rows.length > 0){
            let userTime = new Date(rows[0].createdAt)
            let currentTime = new Date()
            let timeDifference = userTime - currentTime
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

            if(timeDifference > oneDayInMilliseconds){
                return res.json("token has been expired")
            }else{
                const updateStatus = await creators.UpdateVerifyStatus(token)
                return res.json({message:"you have successfully verified your account"})
            }
        }else{
            res.json("user  has not been verified")
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


const signIn = async(req, res)=>{

    const {email, password } = req.body;

    if(!email && !password)return res.json({message:"please enter all details"})

    try {
        const [rows, fields]= await creators.checkEmailPass(email)
        console.log(rows[0].password)

        if(rows && rows.length >1){
            if(rows[0].email.length < 0)return res.json({message:"email not found"})
        }
        // if(!rows.length) return res.json({message:"user not found"})
        let hahedPassword = rows[0].password
        const found =await bcrypt.compare(password, hahedPassword )

        if(!found)return res.json({message:"password does not match"})
        
        const otpgensendMail = new OtpGenMail(email)
        let otpgenerate = Math.floor(1000 +Math.random() *9000).toString()

        const otpUpdate = await creators.updateOtp(otpgenerate , email)

        await otpgensendMail.sendEmail(email , otpgenerate)
        .then(()=>{
            res.status(201).json({message: ['check email' ,  otpgenerate]})
        })
        .catch(err=>res.json({message:err.message}))


    } catch (error) {
        res.status(500).json({message:error.message})
    }

}


const signInVerify = async(req, res) =>{
    const {otpToken} = req.params


    try {
        const [data, fi] = await creators.verifyAndLogin(otpToken)


        if(data && data.length >0){
            let sends = {
                username : data[0].username ,
                verified : data[0].verified
            }

            req.user = data[0]
            console.log(req.user)
            res.status(200).json(sends)
        }

        
        
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


const mintArt = async (req, res, next) => {
    const image = req.image
    const payload = req.body
    //  tokenId, creatorwallet, ownerwallet, transactionHash
    try {
        console.log(image)
        // const [data ]   = await creators.mintArt( payload , image , video)
        const [data ]   = await creators.mintArt( payload , image )
        res.json({message:"art has been uploaded"})
    } catch (error) {
        return next({ code: 401, message: error.message });
    }
};



const putOnFixPrice = async(req, res, next)=>{
    const {tokenId ,  transactionHash, owner , price , orderID } = req.body 
    // salesId,tokenId,transactionHash,owner,price,onSale,isSold,isCancelled,created_at,status

    try {
        const isListed = await creators.putFixPrice(tokenId, transactionHash, owner, price , orderID)
        
        if(isListed){
            const onSaleStatusTrue = creators.fixedpriceSaleStatus(orderID)
            return res.status(201).json({message:`TokenId: ${tokenId} is Listed on Fixed Price Successully` })
        }else{
            return next({ code: 401, message: "couldnt not put on fixed " });
        }


    } catch (error) {
        return next({ code: 401, message: error.message });
    }

}



const putOnAuctions = async(req, res, next)=>{
    const payload = req.body
    if(!payload){
        return next({ code: 401, message: 'enter all dat' });
    }
    try {
        
        const putAuc = await creators.putOnAuctions(payload)
        const updatnftstus = await creators.updatnftstus()

        if(putAuc && updatnftstus){
            res.status(201).json({message:"nft has been put on auction"})
        }else{
            return next({ code: 401, message: "no request was found" });
        }
    } catch (error) {
        return next({ code: 401, message: error });
    }

}


const transferNft = async(req, res , next)=>{
    const payload = req.body;



    if(!payload) return next({code:401, message:"enter all details please"})

    try {
        
        const trnsfernft  =await creators.transferNFT()
        if(trnsfernft.length){
            res.json({message:"nft has transferred successfully"})
        }else{
            return next({ code: 401, message: error });
        }
    } catch (error) {
        return next({ code: 401, message: error });
    }
}



const bidding = async(req, res, next) =>{
    const payload = req.body

    try {
        const bidstart = await creators.startbid() 

        if(bidstart[0].length >1){
            res.status(200).json({message:"bid successful"})
        }
    } catch (error) {
        return next({ code: 401, message: error });
    }
}




const getAllArts = async(req, res, next) =>{
    
    try {
        const [rows, fields] = await creators.getAllArts()

        if(rows && rows.length >1){
            // if(rows[0]){
            if(rows){
                return res.status(200),json({nfts:rows})
            }else{
                return next({ code: 401, message: error });
            }
        }else{
            return next({ code: 401, message: "no data in the database" });
            // this wont work no real data is init with some kind of 
        }
    } catch (error) {
        return next({ code: 401, message: error.message });
    }
}


const getAlCreater = async(req, res, next)=>{
    try {
        const [rows, fields] = await creators.getAllCreaters()

        if(rows && rows.length >1){
            if(rows[0]){
                return res.status(200),json({createrAll:rows[0]})
            }else{
                return next({ code: 401, message: error });
            }
        }else{
            return next({ code: 401, message: "no data in the database" });
            // this wont work no real data is init with some kind of 
        }
    } catch (error) {
        return next({ code: 401, message: error.message });
    }
}   



const getSingleCreater  =  async(req, res)=>{
    
    try {
        const [rows, fields] = await creators.getSingleCreator(req.body.creater , req.body.walletAddress)

        if(rows && rows.length >1){
            if(rows[0]){
                return res.status(200),json({createrAll:rows[0]})
            }else{
                return next({ code: 401, message: error });
            }
        }else{
            return next({ code: 401, message: "no data in the database" });
            // this wont work no real data is init with some kind of 
        }
    } catch (error) {
        return next({ code: 401, message: error.message });
    }
}



const getSingleArts  =  async(req, res)=>{
    
    try {
        const [rows, fields] = await creators.getSingleArts(req.body.name)

        if(rows && rows.length >1){
            if(rows[0]){
                return res.status(200),json({createrAll:rows[0]})
            }else{
                return next({ code: 401, message: error });
            }
        }else{
            return next({ code: 401, message: "no data in the database" });
            // this wont work no real data is init with some kind of 
        }
    } catch (error) {
        return next({ code: 401, message: error.message });
    }
}



export{ 
    check,
    signUp,
    verifySignupToken,
    signIn,
    getAllNfts, 
    signInVerify,
    mintArt,
    putOnFixPrice,
    putOnAuctions,
    transferNft,
    bidding,
    getAllArts,
    getAlCreater,
    getSingleCreater,
    getSingleArts








}
