// async functions ko wrap karne ke liye banaya hai - error handling ke liye
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
