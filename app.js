const express = require('express');
const app = express();
const Listing = require("./models/listing.js");
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');
const { validateListing } = require('./middleware');

const MONGO_URL = "mongodb://127.0.0.1:27017/findmypg";

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

main().then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log("Problem with connecting to database");
});

// Test route to add sample listing
app.get('/testListing', async (req, res) => {
    let sampleListing = new Listing({
        title: "Dk Hostel",
        description: "This PG is located in front of GLA gate-01",
        price: 3000,
        location: "Mathura",
        landmark: "Front of GLA", // ✅ lowercase 'landmark'
        image: "https://sdmntprwestus2.oaiusercontent.com/files/00000000-4018-61f8-ae71-77287ae2dc93/raw?se=2025-05-26T18%3A18%3A24Z&sp=r&sv=2024-08-04&sr=b&scid=a7bd77de-58b7-5743-b35d-8f8d2afa8abe&skoid=9ccea605-1409-4478-82eb-9c83b25dc1b0&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-25T23%3A39%3A45Z&ske=2025-05-26T23%3A39%3A45Z&sks=b&skv=2024-08-04&sig=DTtG0FjeDC6Vp3gU16RLK9Zj0kbwqhpBxUxNq03bXHg%3D"
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("sample was saved successfully in database");
});

app.get('/', (req, res) => {
    res.send("Server is running");
});

// Index route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));

// New route
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// Create route
app.post("/listings", validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
}));

// Edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError("Listing not found", 404);
    }
    res.render("listings/edit", { listing });
}));

// Update route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body });
    res.redirect(`/listings/${id}`);
}));

// Delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// Show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError("Listing not found", 404);
    }
    res.render("listings/show", { listing });
}));

// 404 Error Handler
app.use((req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error", { message });
});

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
