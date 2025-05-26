const express=require('express');
const app=express();
const Listing=require("./models/listing.js");
const mongoose=require('mongoose');
const path=require('path');

const MONGO_URL="mongodb://127.0.0.1:27017/findmypg";
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


main().then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("Problem with connecting to database");
})
app.get('/',(req,res)=>{
    res.send("Server is running");
})

app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index",{allListings});
});

// app.get('/testListing',async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"Dk Hostel",
//         description:"This PG is located in front of GLA gate-01",
//         price:3000,
//         location:"Mathura",
//         LandMark:"front of GLA",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("sample was saved successfully in database");
// });

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
})
