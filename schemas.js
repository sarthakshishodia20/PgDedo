const Joi = require('joi');

// Listing validation schema
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(10).max(1000),
        location: Joi.string().required().min(3).max(100),
        landmark: Joi.string().required().min(3).max(100),
        price: Joi.number().required().min(0),
        image: Joi.string().allow('', null),
        coordinates: Joi.object({
            latitude: Joi.number().required().min(-90).max(90),
            longitude: Joi.number().required().min(-180).max(180)
        }).required()
    }).required()
});

// Review validation schema
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required().min(10).max(500),
        rating: Joi.number().required().min(1).max(5).integer()
    }).required()
});
