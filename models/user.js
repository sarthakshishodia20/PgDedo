const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    userType: {
        type: String,
        required: [true, 'User type is required'],
        enum: {
            values: ['owner', 'student'],
            message: 'User type must be either owner or student'
        }
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Full name must be at least 2 characters long'],
        maxlength: [50, 'Full name cannot exceed 50 characters']
    },
    phone: {
        type: String,
        trim: true,
        match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    errorMessages: {
        UserExistsError: 'A user with the given email is already registered',
        MissingPasswordError: 'Password is required',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password is incorrect',
        IncorrectUsernameError: 'Email is incorrect',
        MissingUsernameError: 'Email is required'
    }
});

// Virtual for formatted date
userSchema.virtual('formattedDate').get(function() {
    return this.createdAt.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Instance method to check if user is owner
userSchema.methods.isOwner = function() {
    return this.userType === 'owner';
};

// Instance method to check if user is student
userSchema.methods.isStudent = function() {
    return this.userType === 'student';
};

module.exports = mongoose.model('User', userSchema);
