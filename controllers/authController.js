const User = require("../models/User"); // Adjust the path as needed
const bcrypt = require("bcrypt");

// authController.js

exports.signupGet = (req, res) => {
  // Always pass notification, defaulting to null
  res.render("signup", { notification: null });
};

exports.signupPost = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render("signup", {
          notification: "Email id already exists. Please use another email.",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, phone });
      await user.save();
      
      // Redirect to login with a success notification
      return res.render("login", {
        notification2: "User registered successfully! You can now log in.",
      });
    } catch (err) {
      res.status(500).send("Error signing up.");
    }
  };
  

// Similar updates for loginPost

exports.loginGet = (req, res) => {
  res.render("login", { notification: null }); // Always pass notification
};

exports.loginPost = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.render("signup", {
          notification: "Email not registered. Please signup first.",
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.render("login", {
          notification1: "Invalid email or password. Please try again.",
        });
      }
  
      res.cookie("userID", user._id, { httpOnly: true });
      
      res.redirect("/");
    } catch (err) {
      res.status(500).send("Error logging in.");
    }
  };
  

// Logout
exports.logout = (req, res) => {
  res.clearCookie("userID");
  res.redirect("/login");
};
