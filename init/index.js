// environment variables load karne ke liye
require('dotenv').config();

const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

// environment variables se database URL le rahe hain
const MONGO_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/findmypg";

// database connection kar rahe hain
main().then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("Problem with connecting to database");
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

// database initialize karne ka function
const initdb=async()=>{
    await Listing.deleteMany({}); // purane data delete karo
    await Listing.insertMany(initData.data); // naya data insert karo
    console.log("data was initialised");
}
initdb();