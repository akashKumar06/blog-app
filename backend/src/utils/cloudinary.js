import { v2 as cloudinary } from "cloudinary";
import ApiError from "./ApiError.js";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath)
      throw new ApiError(
        500,
        "File is required or could not find the file path"
      );
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      folder: "blog-app",
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return uploadResult;
  } catch (error) {
    if (localFilePath) fs.unlinkSync(localFilePath);
    return error;
  }
}

export { uploadOnCloudinary };
