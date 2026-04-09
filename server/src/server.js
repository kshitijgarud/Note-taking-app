import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import path from "path";

const port = process.env.PORT || 3000;
dotenv.config()
const app = express();
const __dirname = path.resolve();


// Middleware 
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin:"http://localhost:5173",
    }));
}
app.use(express.json()); // this middleware will parse JSON bodies: req.body

app.use(rateLimiter);
// our simple custom middleware
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & URL is ${req.url}`);
//     next();
// });

app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV === "production"){
    
    app.use(express.static(path.join(__dirname,"../client/dist")));

    app.get((req,res)=>{
        res.sendFile(path.join(__dirname,"../client","dist","index.html"))
    })
}

connectDB().then(()=>{
    app.listen(port,()=>{
    console.log("listening to port ",port);
    });
});
