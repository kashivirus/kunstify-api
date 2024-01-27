import express from "express";
const router  = express.Router();
import db from "../../config/database.js"

import { bidding, check, getAllNfts, mintArt, putOnAuctions, putOnFixPrice, signIn, signInVerify, signUp, transferNft, verifySignupToken } from "../../controllers/creatorsController.js"
import uploadsNFTs from "../../services/nftUploads.js";








 // user login
router.get("/du"  , check )
router.post("/signUp"  , signUp)
router.get("/signup/verify/:token" , verifySignupToken) 
router.post("/sign" , signIn)
router.post("/signin/:otpToken" , signInVerify )
// router.post("/mintArt" , uploadsNFT , mintArt)
router.post("/mintArt" , uploadsNFTs  , mintArt)
// router.get("/getAllNfts" , uploadsNFT ,getAllNfts )
// put on fix price
router.post("/putonfixprice" ,  putOnFixPrice)
router.post("/putOnAuctions" ,putOnAuctions )
router.post("/bidding" ,bidding )
router.post("/transferNft" , transferNft)



export default router;