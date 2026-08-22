export const uploadImageToCloudinary = async (fileBufferOrPath, folder = "pushpangan_flowers") => {
  try {
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      const { v2: cloudinary } = await import("cloudinary");
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      const result = await cloudinary.uploader.upload(fileBufferOrPath, { folder });
      return result.secure_url;
    }
  } catch (error) {
    console.warn("Cloudinary upload fallback activated");
  }

  const sampleFlowers = [
    "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800",
    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800",
    "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
  ];
  return sampleFlowers[Math.floor(Math.random() * sampleFlowers.length)];
};
