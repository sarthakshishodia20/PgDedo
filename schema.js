const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10).max(1000),
    price: Joi.number().required().min(1000).max(100000),
    location: Joi.string().required().min(2).max(50),
    landmark: Joi.string().allow('').max(100),
    image: Joi.string().allow('').uri(),
    coordinates: Joi.object({
        latitude: Joi.number().required().min(-90).max(90),
        longitude: Joi.number().required().min(-180).max(180)
    }).required()
});
