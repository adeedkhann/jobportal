import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        throw new ApiError(401, "User not authenticated");
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
        throw new ApiError(401, "Invalid token");
    }
    req.id = decode.userId;

    next();
});

export default isAuthenticated;