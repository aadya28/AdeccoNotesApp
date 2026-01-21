import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            res.status(401).json({ message: "Unauthorized request: No token provided" });
            return;
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            res.status(401).json({ message: "Invalid Access Token" });
            return;
        }

        req.user = { id: user.id, role: user.role };
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(401).json({ message: error?.message || "Invalid access token" });
    }
});
