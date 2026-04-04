import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
    // 1. Extract token from cookies
    const token = req.cookies.token;

    if (!token) {
        throw new ApiError(401, "User not authenticated");
    }

    // 2. Verify the token
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
        throw new ApiError(401, "Invalid token");
    }

    // 3. Attach the userId to the request object
    // This allows the NEXT function (the controller) to use req.id
    req.id = decode.userId;

    // 4. Crucial: Call next() to move to the controller
    next();
});

export default isAuthenticated;