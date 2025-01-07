const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.model');
//const cookieParser = require('cookie-parser');

module.exports = (req, res, next) => {
    // Extract token from cookies or authorization header
    const token = req.query.token || req.headers['authorization']?.split(' ')[1]; // Strip 'Bearer ' prefix

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


// const jwt = require('jsonwebtoken');
// const userSchema = require('../models/user.model');
// const cookieParser = require('cookie-parser');

// module.exports = async (req, res, next) => {
//     try {
//         // Extract token from cookies, query params, or authorization header
//         const token = req.cookies.token || decodeURIComponent(req.query.token).trim() || req.headers['authorization']?.split(' ')[1]; 

//         if (!token) {
//             return res.status(401).json({ message: 'Authentication failed: No token provided' });
//         }

//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_KEY);

//         if (!decoded || !decoded.userId) {
//             return res.status(401).json({ message: 'Authentication failed: Invalid token data' });
//         }

//         // Find user by ID
//         const user = await userSchema.findById(decoded.userId).exec();
//         if (!user) {
//             return res.status(401).json({ message: 'Authentication failed: User not found' });
//         }

//         req.user = user; // Attach user information to the request object
//         next(); // Proceed to the next middleware or route handler

//     } catch (err) {
//         res.status(500).json({ error: 'Server error', details: err.message });
//     }
// };
