const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: [true, 'Review comment is required'],
        trim: true,
        minlength: [10, 'Review comment must be at least 10 characters long'],
        maxlength: [500, 'Review comment cannot exceed 500 characters']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
        validate: {
            validator: function(value) {
                return Number.isInteger(value);
            },
            message: 'Rating must be a whole number between 1 and 5'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Reference to the listing this review belongs to
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing',
        required: [true, 'Review must belong to a listing']
    },
    // Optional: Reference to user who wrote the review (for future user authentication)
    author: {
        name: {
            type: String,
            required: [true, 'Reviewer name is required'],
            trim: true,
            minlength: [2, 'Reviewer name must be at least 2 characters long'],
            maxlength: [50, 'Reviewer name cannot exceed 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Reviewer email is required'],
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
        }
    }
});

// Index for better query performance
reviewSchema.index({ listing: 1, createdAt: -1 });

// Virtual for formatted date
reviewSchema.virtual('formattedDate').get(function() {
    return this.createdAt.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
});

// Virtual for star display
reviewSchema.virtual('stars').get(function() {
    return '★'.repeat(this.rating) + '☆'.repeat(5 - this.rating);
});

// Static method to calculate average rating for a listing
reviewSchema.statics.getAverageRating = async function(listingId) {
    const result = await this.aggregate([
        { $match: { listing: listingId } },
        {
            $group: {
                _id: '$listing',
                averageRating: { $avg: '$rating' },
                totalReviews: { $sum: 1 }
            }
        }
    ]);
    
    return result.length > 0 ? {
        averageRating: Math.round(result[0].averageRating * 10) / 10,
        totalReviews: result[0].totalReviews
    } : { averageRating: 0, totalReviews: 0 };
};

// Instance method to get rating description
reviewSchema.methods.getRatingDescription = function() {
    const descriptions = {
        1: 'Poor',
        2: 'Fair', 
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
    };
    return descriptions[this.rating] || 'Unknown';
};

module.exports = mongoose.model('Review', reviewSchema);
