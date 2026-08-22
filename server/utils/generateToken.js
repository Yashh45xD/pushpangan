import jwt from "jsonwebtoken";

export const generateAccessToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "pushpangan_jwt_super_secret_key_2026", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET || "pushpangan_refresh_token_super_secret_key_2026", {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d",
  });
};
