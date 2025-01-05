const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.model');

module.exports = (req, res, next) => {
    // Extract token from cookies or authorization header
    const token =  decodeURIComponent(req.query.token) || req.headers['authorization']?.split(' ')[1]; // Strip 'Bearer ' prefix

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed: Invalid or expired token' });
        }

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: 'Authentication failed: Invalid token data' });
        }

        // Find user by ID
        userSchema.findById(decoded.userId)
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'Authentication failed: User not found' });
                }
                req.user = user; // Attach user information to the request object
                next(); // Proceed to the next middleware or route handler
            })
            .catch(err => {
                res.status(500).json({ error: 'Server error', details: err.message });
            });
    });
};
