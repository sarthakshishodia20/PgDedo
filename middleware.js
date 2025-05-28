const { listingSchema } = require('./schemas.js');
const Listing = require('./models/listing');
const Review = require('./models/review');

// listing validation ka middleware
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        const err = new Error(msg);
        err.status = 400;
        throw err;
    } else {
        next();
    }
};

// user logged in hai ya nahi check karne ke liye
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in to access this page');
        return res.redirect('/login');
    }
    next();
};

// listing ka author hai ya nahi check karne ke liye
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    if (!listing.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// user owner hai ya nahi check karne ke liye (listing create karne ke liye)
module.exports.isOwner = (req, res, next) => {
    if (!req.user || req.user.userType !== 'owner') {
        req.flash('error', 'Only PG owners can create listings');
        return res.redirect('/listings');
    }
    next();
};

// review ka author hai ya nahi check karne ke liye
module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash('error', 'Review not found!');
        return res.redirect('/listings');
    }
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to delete this review!');
        return res.redirect(`/listings/${req.params.id}`);
    }
    next();
};
