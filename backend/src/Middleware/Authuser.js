import jwt from 'jsonwebtoken';

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization; // Use lowercase 'authorization'
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No Authorization Header, You Need to Login first!",
        });
    }

    const token = authHeader.split(" ")[1]; // Extract the token
    if (!token) {
        return res.status(401).json({
            message: "No Token, Authorization denied!",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user to the request object
        
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Token is not Valid!",
            error: error.message,
        });
    }
};

export default authenticateUser;