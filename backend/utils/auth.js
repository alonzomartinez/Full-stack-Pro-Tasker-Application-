const jwt = require('jsonwebtoken');

// Check that the user has a valid JWT
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }

  // Get the token after "Bearer"
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save the user information for the controller to use
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
}

module.exports = auth;