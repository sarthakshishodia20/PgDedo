// environment variables load karne ke liye
require('dotenv').config();

const express = require('express');
const app = express();
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const User = require("./models/user.js");
const Notice = require("./models/notice.js");
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore=require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { validateListing, isLoggedIn, isAuthor, isOwner, isReviewAuthor } = require('./middleware.js');
const { upload } = require('./cloudinary/index.js');

// saare routes ko import kar rahe hain yahan
const reviewRoutes = require('./routes/reviews.js');
const authRoutes = require('./routes/auth.js');
const noticeRoutes = require('./routes/notices.js');

// environment variables se configuration le rahe hain
const MONGO_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/findmypg";
const PORT = process.env.PORT || 8080;

// database connection ka function banaya hai
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// MongoStore create kar rahe hain sessions ko database mein store karne ke liye
const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto: {
        secret: process.env.SESSION_SECRET || 'thisshouldbeabettersecret!',
    },
    touchAfter: parseInt(process.env.SESSION_TOUCH_AFTER) || 24 * 3600, // 24 hours tk store rahegi information user ki
    collection: process.env.SESSION_COLLECTION_NAME || 'sessions' // sessions collection ka naam
});

// store events handle kar rahe hain
store.on('error', function(error) {
    console.log('Session store error:', error);
});

// session ki configuration kar rahe hain - environment variables aur MongoStore se
const sessionConfig = {
    store: store, // MongoStore use kar rahe hain
    secret: process.env.SESSION_SECRET || 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: false, // false kar rahe hain better security ke liye
    cookie: {
        httpOnly: process.env.SESSION_COOKIE_HTTP_ONLY === 'true' || true,
        secure: process.env.SESSION_COOKIE_SECURE === 'true' || false,
        expires: Date.now() + (parseInt(process.env.SESSION_MAX_AGE) || 604800000), // default ek hafta
        maxAge: parseInt(process.env.SESSION_MAX_AGE) || 604800000
    }
};


app.use(session(sessionConfig));
app.use(flash());

// passport setup kar rahe hain authentication ke liye
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash messages ke liye middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

// routes use kar rahe hain
app.use('/listings/:id/reviews', reviewRoutes);
app.use('/listings/:id/notices', noticeRoutes);
app.use('/', authRoutes);

main().then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log("Problem with connecting to database");
});

// testing ke liye sample listing add karne ka route
app.get('/testListing', async (req, res) => {
    let sampleListing = new Listing({
        title: "Dk Hostel",
        description: "This PG is located in front of GLA gate-01",
        price: 3000,
        location: "Mathura",
        landmark: "Front of GLA",
        image: "https://sdmntprwestus2.oaiusercontent.com/files/00000000-4018-61f8-ae71-77287ae2dc93/raw?se=2025-05-26T18%3A18%3A24Z&sp=r&sv=2024-08-04&sr=b&scid=a7bd77de-58b7-5743-b35d-8f8d2afa8abe&skoid=9ccea605-1409-4478-82eb-9c83b25dc1b0&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-25T23%3A39%3A45Z&ske=2025-05-26T23%3A39%3A45Z&sks=b&skv=2024-08-04&sig=DTtG0FjeDC6Vp3gU16RLK9Zj0kbwqhpBxUxNq03bXHg%3D"
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("sample was saved successfully in database");
});

app.get('/', (req, res) => {
    res.send("Server is running");
});

// Test route to create a sample notice
app.get('/test-notice/:listingId', async (req, res) => {
    try {
        const { listingId } = req.params;
        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.send('Listing not found');
        }

        const notice = new Notice({
            listing: listingId,
            author: listing.author,
            content: 'This is a test notice from the system. It will auto-delete in 24 hours.',
            type: 'info'
        });

        await notice.save();
        res.send(`Test notice created for listing ${listingId}. Check the listing page.`);
    } catch (error) {
        res.send('Error creating test notice: ' + error.message);
    }
});

// Debug route to check notices
app.get('/debug-notices/:listingId', async (req, res) => {
    try {
        const { listingId } = req.params;
        const notices = await Notice.find({ listing: listingId });
        const activeNotices = await Notice.getActiveNotices(listingId);

        res.json({
            listingId,
            totalNotices: notices.length,
            activeNotices: activeNotices.length,
            allNotices: notices,
            activeNoticesData: activeNotices
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// saare listings dikhane ka route with search functionality
app.get("/listings", wrapAsync(async (req, res) => {
    const { search } = req.query;
    let allListings;

    if (search) {
        // title, location ya landmark se search kar sakte hain
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

// naya listing banane ka route - sirf owners kar sakte hain
app.get("/listings/new", isLoggedIn, isOwner, (req, res) => {
    res.render("listings/new");
});

// naya listing create karne ka route - sirf owners kar sakte hain
app.post("/listings", isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);

    // agar image upload hui hai to cloudinary URL use karo
    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    newListing.author = req.user._id;
    await newListing.save();
    req.flash('success', 'New PG listing created successfully!');
    res.redirect("/listings");
}));

// listing edit karne ka route - sirf author kar sakta hai
app.get("/listings/:id/edit", isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    res.render("listings/edit", { listing });
}));

// listing update karne ka route - sirf author kar sakta hai
app.put("/listings/:id", isLoggedIn, isAuthor, upload.single('listing[image]'), validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }

    // listing update karo
    Object.assign(listing, req.body.listing);

    // agar naya image upload hua hai to cloudinary URL use karo
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save();
    req.flash('success', 'PG listing updated successfully!');
    res.redirect(`/listings/${id}`);
}));

// listing delete karne ka route - sirf author kar sakta hai
app.delete("/listings/:id", isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    // saare reviews bhi delete kar denge is listing ke
    await Review.deleteMany({ listing: id });
    req.flash('success', 'PG listing deleted successfully!');
    res.redirect("/listings");
}));

// individual listing show karne ka route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate('author');
    if (!listing) {
        throw new ExpressError("Listing not found", 404);
    }

    // is listing ke saare reviews lao
    const reviews = await Review.find({ listing: id }).populate('author').sort({ createdAt: -1 });

    // average rating calculate karo
    const ratingData = await Review.getAverageRating(id);

    // is listing ke active notices lao
    const notices = await Notice.getActiveNotices(id);
    console.log('Notices found for listing', id, ':', notices.length);

    res.render("listings/show", { listing, reviews, ratingData, notices });
}));

// 404 error handle karne ke liye
app.use((req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

// general error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error", { message });
});

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`App Name: ${process.env.APP_NAME || 'PG Dedo'}`);
});
