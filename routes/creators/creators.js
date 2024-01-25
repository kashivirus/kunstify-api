import express from "express";
const router  = express.Router();
import db from "../../config/database.js"

import { check, getAllNfts, signIn, signUp, verifySignupToken } from "../../controllers/creatorsController.js"




router.get("/du"  , check )

router.post("/signUp"  , signUp)
router.get("/signup/verify/:token" , verifySignupToken) 


router.post("/signin" , signIn)




router.get("/getAllNfts" ,getAllNfts )

export default router;