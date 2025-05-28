const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DEFAULT_IMAGE_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfPpXoRFZWRR_1kXmd5PgzzVdFFt9FFHNGrw&s";

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: DEFAULT_IMAGE_URL,
        set: (v) => {
            return v?.trim() === "" || v == null ? DEFAULT_IMAGE_URL : v;
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
    // Reference to the user who created this listing
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Listing must have an author']
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
