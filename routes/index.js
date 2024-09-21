const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const User = require("../models/User");
const authMiddleware = require('../middleware/authMiddleware');

// GET Routes
router.get("/signup", (req, res) => res.render("signup"));
router.get("/login", (req, res) => res.render("login"));
// router.get('/', (req, res) => res.render('login'));
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.cookies.userID; // Get userID from cookie
    const user = await User.findById(userId); // Fetch user from the database
    if (!user) {
      return res.redirect("/login"); // Redirect if user not found
    }
    res.render("dashboard", { user }); // Pass user data to the dashboard view
  } catch (err) {
    res.status(500).send("Error retrieving user data.");
  }
});
router.get("/profile-view", userController.profileView);

// POST Routes
router.post("/signup", authController.signupPost);
router.post("/login", authController.loginPost);
// router.post('/', authController.loginPost);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
