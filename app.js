const express = require('express');
const app = express();
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const User = require("./models/user.js");
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');
const { validateListing, isLoggedIn, isAuthor, isOwner, isReviewAuthor } = require('./middleware');

// Import routes
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

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

// Session configuration
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

// Use routes
app.use('/listings/:id/reviews', reviewRoutes);
app.use('/', authRoutes);

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

// Index route with search functionality
app.get("/listings", wrapAsync(async (req, res) => {
    const { search } = req.query;
    let allListings;

    if (search) {
        // Search by title, location, or landmark
        allListings = await Listing.find({
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { landmark: { $regex: search, $options: 'i' } }
            ]
        }).populate('author');
    } else {
        allListings = await Listing.find({}).populate('author');
    }

    res.render("listings/index", { allListings, search });
}));

// New route - Only owners can create listings
app.get("/listings/new", isLoggedIn, isOwner, (req, res) => {
    res.render("listings/new");
});

// Create route - Only owners can create listings
app.post("/listings", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.author = req.user._id;
    await newListing.save();
    req.flash('success', 'New PG listing created successfully!');
    res.redirect("/listings");
}));

// Edit route - Only author can edit
app.get("/listings/:id/edit", isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    res.render("listings/edit", { listing });
}));

// Update route - Only author can update
app.put("/listings/:id", isLoggedIn, isAuthor, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (!updatedListing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    req.flash('success', 'PG listing updated successfully!');
    res.redirect(`/listings/${id}`);
}));

// Delete route - Only author can delete
app.delete("/listings/:id", isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    // Also delete all reviews for this listing
    await Review.deleteMany({ listing: id });
    req.flash('success', 'PG listing deleted successfully!');
    res.redirect("/listings");
}));

// Show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate('author');
    if (!listing) {
        throw new ExpressError("Listing not found", 404);
    }

    // Get reviews for this listing
    const reviews = await Review.find({ listing: id }).populate('author').sort({ createdAt: -1 });

    // Get average rating
    const ratingData = await Review.getAverageRating(id);

    res.render("listings/show", { listing, reviews, ratingData });
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
