const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const Notice = require('../models/notice.js');
const Listing = require('../models/listing.js');

// middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in to manage notices');
        return res.redirect('/login');
    }
    next();
};

// middleware to check if user is the owner of the listing
const isListingOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log('Checking ownership for listing:', id);
        console.log('Current user:', req.user ? req.user._id : 'Not logged in');
        
        const listing = await Listing.findById(id);

        if (!listing) {
            console.log('Listing not found');
            req.flash('error', 'Listing not found!');
            return res.redirect('/listings');
        }

        console.log('Listing author:', listing.author);
        console.log('User ID:', req.user._id);
        console.log('Are they equal?', listing.author.equals(req.user._id));

        if (!listing.author || !listing.author.equals(req.user._id)) {
            console.log('User is not the owner');
            req.flash('error', 'Only the PG owner can manage notices');
            return res.redirect(`/listings/${id}`);
        }

        console.log('User is the owner, proceeding...');
        next();
    } catch (error) {
        console.error('Error in isListingOwner middleware:', error);
        req.flash('error', 'Something went wrong');
        res.redirect('/listings');
    }
};

// get all active notices for a listing (API endpoint)
router.get('/', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const notices = await Notice.getActiveNotices(id);
    res.json({ success: true, notices });
}));

// create a new notice (only listing owner can do this)
router.post('/', isLoggedIn, isListingOwner, wrapAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const { content, type } = req.body;

        console.log('Creating notice for listing:', id);
        console.log('Notice data:', { content, type });
        console.log('Author:', req.user._id);

        // Validate input
        if (!content || !type) {
            req.flash('error', 'Notice content and type are required');
            return res.redirect(`/listings/${id}`);
        }

        if (content.length < 10 || content.length > 500) {
            req.flash('error', 'Notice content must be between 10-500 characters');
            return res.redirect(`/listings/${id}`);
        }

        if (!['info', 'warning', 'urgent'].includes(type)) {
            req.flash('error', 'Invalid notice type');
            return res.redirect(`/listings/${id}`);
        }

        // Create new notice
        const notice = new Notice({
            listing: id,
            author: req.user._id,
            content: content.trim(),
            type: type
        });

        await notice.save();
        console.log('Notice created successfully:', notice._id);

        req.flash('success', 'Notice posted successfully!');
        res.redirect(`/listings/${id}`);

    } catch (error) {
        console.error('Error creating notice:', error);
        req.flash('error', 'Failed to create notice');
        res.redirect(`/listings/${req.params.id}`);
    }
}));

// delete a notice (only listing owner can do this)
router.delete('/:noticeId', isLoggedIn, isListingOwner, wrapAsync(async (req, res) => {
    try {
        const { id, noticeId } = req.params;

        console.log('Deleting notice:', noticeId, 'from listing:', id);

        const notice = await Notice.findById(noticeId);
        
        if (!notice) {
            req.flash('error', 'Notice not found');
            return res.redirect(`/listings/${id}`);
        }

        // Check if notice belongs to this listing
        if (!notice.listing.equals(id)) {
            req.flash('error', 'Notice does not belong to this listing');
            return res.redirect(`/listings/${id}`);
        }

        await Notice.findByIdAndDelete(noticeId);
        console.log('Notice deleted successfully');

        req.flash('success', 'Notice deleted successfully!');
        res.redirect(`/listings/${id}`);

    } catch (error) {
        console.error('Error deleting notice:', error);
        req.flash('error', 'Failed to delete notice');
        res.redirect(`/listings/${req.params.id}`);
    }
}));

module.exports = router;
