import express from "express";

const app = express();

// home route
app.get("/api/notes",(req,res)=>{
    res.status(200).send("you got 20 notes");
});

// post route
app.post("/api/notes",(req,res)=>{
    res.status(201).json({"message" : "post was created successfully"});
});

//  route
app.get("/api/notes",(req,res)=>{
    res.status(200).send("you got 20 notes");
});

// delete route
app.get("/api/notes",(req,res)=>{
    res.status(200).send("you got 20 notes");
});

app.listen(3000,()=>{
    console.log("listening to port 3000");
})