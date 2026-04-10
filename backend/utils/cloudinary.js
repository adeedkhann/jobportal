import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()
console.log(process.env.CLOUDINARY_NAME)

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
})

const uploadOnCloudinary = async (file) => {
    try {
        if (!file) return null;

        // Buffer ko Base64 string mein convert karna
        const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

        // Cloudinary par upload
        const response = await cloudinary.uploader.upload(fileBase64, {
            resource_type: "auto",
        });

        return response;
    } catch (error) {
        console.log("Cloudinary Upload Error:", error);
        return null;
    }
};
export {uploadOnCloudinary};


