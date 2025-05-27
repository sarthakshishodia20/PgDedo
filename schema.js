const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10).max(1000),
    price: Joi.number().required().min(1000).max(100000),
    location: Joi.string().required().min(2).max(50),
    landmark: Joi.string().allow('').max(100),
    image: Joi.string().allow('').uri(),
    owner: Joi.object({
        name: Joi.string().required().min(2).max(50),
        contact: Joi.string().required().pattern(new RegExp('^\\+91\\s?\\d{10}$'))
    }).required()
});
