import express from 'express';
import dotenv from "dotenv";
dotenv.config()
import morgan from "morgan";

import router from "./routes/creators/creators.js";
// import credentials from "./middleware/credentials.js";
const PORT = process.env.PORT



const app = express()
app.use(morgan("dev"));
// app.use(credentials)


app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");

    next();
}); 



app.use(router)


app.use((error, req, res ,next)=>{
    return res.status(error.code || 401).json({message:error.message})
})


app.all("*" , (req, res )=>{
    res.status(404).json({message:"Page Not Found 404"})
})

app.listen(PORT , ()=>console.log(`server is running at port ${PORT}`))