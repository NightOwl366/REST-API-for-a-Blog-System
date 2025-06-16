import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided'
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. Invalid token format'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password").lean();
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. User no longer exists'
            });
        }

        req.user = {
            id: user._id,
            name: user.name,
            email: user.email
        };


        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token failed'
        });
    }
}