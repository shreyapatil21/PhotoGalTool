import jwt from 'jsonwebtoken'; // Import jwt using ES module syntax

const authMiddleware = (req, res, next) => {
    // Example: Verify token
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key'); // Replace with your actual secret key
        req.user = decoded.user; // Assuming your token payload has a 'user' field
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware; 
