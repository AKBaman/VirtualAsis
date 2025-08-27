import express, { response } from "express";
import dotenv from 'dotenv';
dotenv.config();

import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";


const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

// app.get("/", (req, res) => {
//   res.send();
// });

app.get("/",async (req,res)=>{
  try {
    let prompt = req.query.prompt || "Explain how AI works in a few words";
    let data = await geminiResponse(prompt)
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
})

app.listen(port,()=>{
    connectDB();
    console.log(`Server running on address http://localhost:${port}`)
})