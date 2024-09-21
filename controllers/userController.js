const User = require('../models/User');

// Dashboard GET
exports.dashboard = async (req, res) => {
    const userId = req.cookies.userID;
    if (!userId) return res.redirect('/login');

    const user = await User.findById(userId);
    if (!user) return res.redirect('/login');

    res.render('dashboard', { user });
};

// Profile GET
exports.profileView = async (req, res) => {
    const userId = req.cookies.userID;
    if (!userId) return res.redirect('/login');

    const user = await User.findById(userId);
    if (!user) return res.redirect('/login');

    res.render('profile', { user });
};
