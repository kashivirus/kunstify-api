import express from "express";
const router  = express.Router();
import db from "../../config/database.js"

import { check, signUp } from "../../controllers/creatorsController.js"




router.get("/du"  , check )

router.post("/signUp"  , signUp)


export default router;