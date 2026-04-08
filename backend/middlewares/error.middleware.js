// middlewares/error.middleware.js
export const errorHandler = (err, req, res, next) => {
    // Agar error hamari ApiError class ka hai toh wahi status code use karo, warna 500
    const statusCode = err.statuscode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message: message,
        errors: err.error || [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};