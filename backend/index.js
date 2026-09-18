const express = require("express");
const { connnestDB } = require("./db");
const { mainRouter } = require("./routes/index.js");
const {cors}=require('cors')

app.use(cors)
const app=express();

connnestDB();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1',mainRouter)

app.listen(3000,()=>{
    console.log("Server in Running...")
})