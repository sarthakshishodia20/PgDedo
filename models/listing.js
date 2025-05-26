const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DEFAULT_IMAGE_URL = "https://sdmntprwestus2.oaiusercontent.com/files/00000000-4018-61f8-ae71-77287ae2dc93/raw?se=2025-05-26T18%3A18%3A24Z&sp=r&sv=2024-08-04&sr=b&scid=a7bd77de-58b7-5743-b35d-8f8d2afa8abe&skoid=9ccea605-1409-4478-82eb-9c83b25dc1b0&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-25T23%3A39%3A45Z&ske=2025-05-26T23%3A39%3A45Z&sks=b&skv=2024-08-04&sig=DTtG0FjeDC6Vp3gU16RLK9Zj0kbwqhpBxUxNq03bXHg%3D";

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
            // If value is falsy (undefined, null, "") return default
            return v?.trim() === "" || v == null ? DEFAULT_IMAGE_URL : v;
        }
    },
    price: Number,
    location: String,
    Landmark: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
