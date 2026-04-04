import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

const port = process.env.PORT || 3000;
dotenv.config()
const app = express();
connectDB();

// Middleware 
app.use(express.json()); // this middleware will parse JSON bodies: req.body

// our simple custom middleware
app.use((req,res,next)=>{
    console.log(`Req method is ${req.method} & URL is ${req.url}`);
    next();
})

app.use("/api/notes",notesRoutes);

app.listen(port,()=>{
    console.log("listening to port ",port);
})