const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');

// registration form dikhane ka route
router.get('/register', (req, res) => {
    res.render('auth/register');
});

// registration handle karne ka route
router.post('/register', wrapAsync(async (req, res) => {
    try {
        const { email, password, fullName, userType, phone } = req.body;

        const user = new User({
            email,
            fullName,
            userType,
            phone
        });

        const registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) {
                req.flash('error', 'Something went wrong during login');
                return res.redirect('/register');
            }
            req.flash('success', `Welcome to PG Dedo, ${user.fullName}!`);
            res.redirect('/listings');
        });
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/register');
    }
}));

// login form dikhane ka route
router.get('/login', (req, res) => {
    res.render('auth/login');
});

// login handle karne ka route
router.post('/login',
    passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login'
    }),
    (req, res) => {
        req.flash('success', `Welcome back, ${req.user.fullName}!`);
        const redirectUrl = req.session.returnTo || '/listings';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    }
);

// logout handle karne ka route
router.get('/logout', (req, res) => {
    const userName = req.user ? req.user.fullName : '';
    req.logout((err) => {
        if (err) {
            req.flash('error', 'Something went wrong during logout');
            return res.redirect('/listings');
        }
        req.flash('success', `Goodbye ${userName}! You have been logged out.`);
        res.redirect('/listings');
    });
});

module.exports = router;
