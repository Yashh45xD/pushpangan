import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "r1o7fosa",
  api_key: process.env.CLOUDINARY_API_KEY || "123456789",
  api_secret: process.env.CLOUDINARY_API_SECRET || "secret",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pushpangan_flowers",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export const deleteCloudinaryImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary image deletion failed:", error);
  }
};
