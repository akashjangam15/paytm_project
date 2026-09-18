const { default: mongoose } = require("mongoose");

// const db=mongoose.connect("mongodb://localhost:27017/")

const MONGO_URI="mongodb://localhost:27017/";

const connnestDB= async()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log('MongoDB connected successfully');
    }catch(error){
        console.log("Database connection failed: ",error.message);
        process.exit();
    }

}

module.exports={
    connnestDB
}