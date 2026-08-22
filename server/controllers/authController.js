import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import { sendOTPEmail } from "../services/emailService.js";
import { sendResponse } from "../utils/sendResponse.js";

// Generate 6 digit numeric OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Set Auth Token Cookie
const setAuthCookies = (res, token, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
  res.cookie("token", token, { ...cookieOptions, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, { ...cookieOptions, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
  }
};

// @desc    Register a new user & Send Email Verification OTP
// @route   POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    console.log(`[Auth Register] Signup request received. Normalized Email: ${cleanEmail}, Normalized Phone: ${cleanPhone}`);

    const existingUser = await User.findOne({
      $or: [{ email: cleanEmail }, { phone: cleanPhone }]
    });

    if (existingUser) {
      if (existingUser.email === cleanEmail) {
        console.log(`[Auth Register] Duplicate signup attempt. Email already exists: ${cleanEmail}`);
        return sendResponse(res, 400, false, "User with this email already exists");
      } else {
        console.log(`[Auth Register] Duplicate signup attempt. Mobile number already exists: ${cleanPhone}`);
        return sendResponse(res, 400, false, "User with this mobile number already exists");
      }
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      password,
      role: role === "admin" ? "admin" : "customer",
      otp,
      otpExpiry,
    });

    console.log(`[Auth Register] User created successfully in MongoDB. ID: ${user._id}`);

    try {
      await sendOTPEmail(cleanEmail, otp, "Welcome to Pushpangan - Email Verification OTP");
    } catch (smtpErr) {
      console.warn(`[Auth Register] SMTP send failed: ${smtpErr.message}`);
    }

    const token = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    setAuthCookies(res, token, refreshToken);

    return sendResponse(res, 201, true, "Registration successful. Please verify your email with the OTP sent.", {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Email with OTP
// @route   POST /api/auth/verify-email
export const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    if (!user.otp || user.otp !== otp || new Date() > user.otpExpiry) {
      return sendResponse(res, 400, false, "Invalid or expired OTP");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return sendResponse(res, 200, true, "Email verified successfully!");
  } catch (error) {
    next(error);
  }
};

// @desc    Login User
// @route   POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    const identifier = email.trim();
    const isEmail = identifier.includes("@");
    const query = isEmail ? { email: identifier.toLowerCase() } : { phone: identifier };

    console.log(`[Auth Login] Login request received for identifier: ${identifier}`);

    const user = await User.findOne(query).select("+password");

    if (!user) {
      console.log(`[Auth Login] Login failed. No account found for identifier: ${identifier}`);
      return sendResponse(res, 404, false, "No account found with this email or mobile number. Please sign up first.");
    }

    console.log(`[Auth Login] User record found. Comparing password hash...`);
    const isMatch = await user.matchPassword(password);
    console.log(`[Auth Login] Password comparison result: ${isMatch}`);

    if (!isMatch) {
      return sendResponse(res, 401, false, "Incorrect password. Please try again.");
    }

    user.lastLogin = new Date();
    const token = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    setAuthCookies(res, token, rememberMe ? refreshToken : null);

    console.log(`[Auth Login] Login successful for user: ${user.email} (${user._id})`);

    return sendResponse(res, 200, true, "Login successful", {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        profileImage: user.profileImage,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout User
// @route   POST /api/auth/logout
export const logout = async (req, res, next) => {
  try {
    if (req.user) {
      req.user.refreshToken = null;
      await req.user.save();
    }
    res.clearCookie("token");
    res.clearCookie("refreshToken");

    return sendResponse(res, 200, true, "Logged out successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password (Send OTP)
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(res, 404, false, "User with this email does not exist");
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOTPEmail(email, otp, "Pushpangan - Reset Password OTP");

    return sendResponse(res, 200, true, "Reset OTP sent to your email.");
  } catch (error) {
    next(error);
  }
};

// @desc    Reset Password with OTP
// @route   POST /api/auth/reset-password
export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    if (!user.otp || user.otp !== otp || new Date() > user.otpExpiry) {
      return sendResponse(res, 400, false, "Invalid or expired OTP");
    }

    user.password = newPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return sendResponse(res, 200, true, "Password reset successful. You can now login.");
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh Token
// @route   POST /api/auth/refresh-token
export const refreshToken = async (req, res, next) => {
  try {
    const rToken = req.body.refreshToken || req.cookies.refreshToken;
    if (!rToken) {
      return sendResponse(res, 401, false, "Refresh token required");
    }

    const decoded = jwt.verify(rToken, process.env.REFRESH_TOKEN_SECRET || "pushpangan_refresh_token_super_secret_key_2026");
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== rToken) {
      return sendResponse(res, 403, false, "Invalid refresh token");
    }

    const accessToken = generateAccessToken(user._id, user.role);
    return sendResponse(res, 200, true, "Token refreshed", { accessToken });
  } catch (error) {
    return sendResponse(res, 403, false, "Invalid or expired refresh token");
  }
};

// @desc    Change Password (Authenticated User)
// @route   PUT /api/auth/change-password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (!(await user.matchPassword(currentPassword))) {
      return sendResponse(res, 400, false, "Current password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    return sendResponse(res, 200, true, "Password updated successfully");
  } catch (error) {
    next(error);
  }
};
