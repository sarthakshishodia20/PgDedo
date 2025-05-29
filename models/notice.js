const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
    // notice kis listing ka hai uska reference
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing',
        required: [true, 'Notice must belong to a listing']
    },
    // notice kis owner ne add kiya hai uska reference
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Notice must have an author']
    },
    // notice ka content
    content: {
        type: String,
        required: [true, 'Notice content is required'],
        maxlength: [500, 'Notice content cannot exceed 500 characters'],
        minlength: [10, 'Notice content must be at least 10 characters']
    },
    // notice ka type (info, warning, urgent)
    type: {
        type: String,
        enum: ['info', 'warning', 'urgent'],
        default: 'info'
    },
    // notice kab create hua
    createdAt: {
        type: Date,
        default: Date.now
    },
    // notice kab expire hoga (24 hours after creation)
    expiresAt: {
        type: Date,
        default: function() {
            return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
        },
        index: { expireAfterSeconds: 0 } // MongoDB TTL index for automatic deletion
    }
});

// compound index banaya hai taaki ek listing ke notices efficiently fetch kar sake
noticeSchema.index({ listing: 1, createdAt: -1 });

// author ke notices efficiently fetch karne ke liye
noticeSchema.index({ author: 1, createdAt: -1 });

// date ko formatted way mein dikhane ke liye virtual
noticeSchema.virtual('formattedDate').get(function() {
    return this.createdAt.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
});

// time remaining until expiry
noticeSchema.virtual('timeRemaining').get(function() {
    const now = new Date();
    const expiry = new Date(this.expiresAt);
    const diff = expiry - now;
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
        return `${hours}h ${minutes}m left`;
    } else {
        return `${minutes}m left`;
    }
});

// static method to get active notices for a listing
noticeSchema.statics.getActiveNotices = async function(listingId) {
    const notices = await this.find({
        listing: listingId,
        expiresAt: { $gt: new Date() } // only non-expired notices
    }).populate('author').sort({ createdAt: -1 });
    
    // Add virtual fields manually
    return notices.map(notice => {
        const noticeObj = notice.toObject({ virtuals: true });
        return noticeObj;
    });
};

// static method to get notice count for a listing
noticeSchema.statics.getNoticeCount = async function(listingId) {
    return await this.countDocuments({
        listing: listingId,
        expiresAt: { $gt: new Date() }
    });
};

// pre-save middleware to ensure expiry date is set
noticeSchema.pre('save', function(next) {
    if (this.isNew && !this.expiresAt) {
        this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
    next();
});

module.exports = mongoose.model('Notice', noticeSchema);
