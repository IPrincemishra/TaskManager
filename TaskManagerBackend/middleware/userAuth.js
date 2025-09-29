import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not Authorized, Token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        const user = await User.findById(payload.id).select("-password");

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log("JWT verification failed", err);
        res.status(401).json({ success: false, message: "Token invalid or expired" });
    }
}
