import mongoose from "mongoose";

import dotenv from "dotenv"
dotenv.config()

const db=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('connected to mongodb')
    })
    .catch((err) => {
        console.log("Error Connecting to MongoDB:", err);
    })
}

export default db