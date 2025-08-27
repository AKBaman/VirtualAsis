import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY
});

const uploadOnCloudinary = async (filePath) => {
  if (!filePath) return null;

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto', // handles images, videos, PDFs, etc.
    });

    fs.unlink(filePath, err => {
      if (err) console.error("Failed to delete local file:", err);
    });

    return uploadResult.secure_url;
  } catch (error) {
    fs.unlink(filePath, err => {
      if (err) console.error("Failed to delete local file after error:", err);
    });
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadOnCloudinary;
