// middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
    if (!req.cookies.userID) {
      // Redirect to login if not authenticated
      return res.redirect('/login');
    }
    next(); // Call the next middleware if authenticated
  };
  
  module.exports = authMiddleware;
  