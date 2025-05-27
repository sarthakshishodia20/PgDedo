const { listingSchema } = require('./schema.js');

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
