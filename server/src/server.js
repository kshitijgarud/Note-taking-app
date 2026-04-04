import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middlewares/rateLimiter.js";

const port = process.env.PORT || 3000;
dotenv.config()
const app = express();


// Middleware 
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);
// our simple custom middleware
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & URL is ${req.url}`);
//     next();
// });

app.use("/api/notes",notesRoutes);

connectDB().then(()=>{
    app.listen(port,()=>{
    console.log("listening to port ",port);
    });
});
