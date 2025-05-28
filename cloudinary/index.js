// cloudinary configuration aur multer setup
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// cloudinary configuration - environment variables se
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'pgdedo_listings', // cloudinary mein folder name
        allowedFormats: ['jpeg', 'jpg', 'png', 'webp'], // allowed file formats
        transformation: [
            { width: 800, height: 600, crop: 'fill' }, // image resize karne ke liye
            { quality: 'auto' } // automatic quality optimization
        ]
    }
});

// multer configuration with cloudinary storage
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    },
    fileFilter: (req, file, cb) => {
        // sirf image files allow karo
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

module.exports = {
    cloudinary,
    storage,
    upload
};
