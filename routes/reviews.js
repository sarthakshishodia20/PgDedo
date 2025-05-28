const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review');
const Listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../schemas');
const { isLoggedIn, isReviewAuthor } = require('../middleware');

// reviews ke liye validation middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

// naya review create karne ka route
router.post('/', isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }

    const review = new Review(req.body.review);
    review.listing = req.params.id;
    review.author = req.user._id;
    await review.save();
    req.flash('success', 'Review added successfully!');
    res.redirect(`/listings/${listing._id}`);
}));

// review delete karne ka route
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
