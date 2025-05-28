const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// environment variables se default image URL le rahe hain
const DEFAULT_IMAGE_URL = process.env.DEFAULT_IMAGE_URL || "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: {
            type: String,
            default: DEFAULT_IMAGE_URL,
            set: (v) => {
                return v?.trim() === "" || v == null ? DEFAULT_IMAGE_URL : v;
            }
        },
        filename: {
            type: String,
            default: null
        }
    },
    price: Number,
    location: String,
    landmark: String,
    coordinates: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // ye listing kisne banai hai uska reference
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Listing must have an author']
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
