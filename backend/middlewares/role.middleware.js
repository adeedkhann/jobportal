import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"


export const authorizeRole = (allowedRole) => {
    return asyncHandler(async (req, res, next) => {
        const userId = req.id; 

        const user = await User.findById(userId).select("role");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user.role !== allowedRole) {
            throw new ApiError(403, `Access denied. This section is for ${allowedRole}s only.`);
        }

        next();
    });
}