const { listingSchema } = require('./schema.js');
const Listing = require('./models/listing');

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

// Check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in to access this page');
        return res.redirect('/login');
    }
    next();
};

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

// Check if user is an owner (for creating listings)
module.exports.isOwner = (req, res, next) => {
    if (!req.user || req.user.userType !== 'owner') {
        req.flash('error', 'Only PG owners can create listings');
        return res.redirect('/listings');
    }
    next();
};
