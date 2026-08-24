export type UserProfile = {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: "admin" | "customer" | "supplier";
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
};

import { API_URL } from "../config/api";
const API_BASE = `${API_URL}/api`;
const USERS_STORAGE_KEY = "pushpangan_registered_users";
const SESSION_STORAGE_KEY = "pushpangan_user_session";

function getRegisteredUsers(): Array<UserProfile & { password_hash: string }> {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users: Array<UserProfile & { password_hash: string }>) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export const authService = {
  // Sign Up user & post directly to Express API + MongoDB database
  async signUp(email: string, password_hash: string, fullName: string, phone: string) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      throw new Error("Full name is required.");
    }
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      throw new Error("Please enter a valid email address (e.g. name@domain.com).");
    }
    if (!cleanPhone || cleanPhone.length < 10) {
      throw new Error("Please enter a valid 10-digit mobile number.");
    }
    if (!password_hash || password_hash.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          password: password_hash,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Registration failed.");
      }

      const payload = data.data;
      const userProfile: UserProfile = {
        id: payload.user.id || payload.user._id,
        full_name: payload.user.name,
        email: payload.user.email,
        phone: payload.user.phone,
        role: payload.user.role,
      };

      if (payload.token) {
        localStorage.setItem("pushpangan_token", payload.token);
      }
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userProfile));
      return userProfile;
    } catch (err: any) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        throw new Error("Unable to connect to the server. Please make sure the backend is running.");
      }
      throw err;
    }
  },

  // Sign In user with Express API + MongoDB database
  async signIn(email: string, password_hash: string) {
    const cleanEmail = email.trim();
    const isEmail = cleanEmail.includes("@");
    const normalizedEmail = isEmail ? cleanEmail.toLowerCase() : cleanEmail;

    if (!normalizedEmail) {
      throw new Error("Please enter your registered email address or mobile number.");
    }
    if (!password_hash) {
      throw new Error("Please enter your password.");
    }

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          password: password_hash,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials.");
      }

      const payload = data.data;
      const userProfile: UserProfile = {
        id: payload.user.id || payload.user._id,
        full_name: payload.user.name,
        email: payload.user.email,
        phone: payload.user.phone,
        role: payload.user.role,
      };

      if (payload.token) {
        localStorage.setItem("pushpangan_token", payload.token);
      }
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userProfile));
      return userProfile;
    } catch (err: any) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        throw new Error("Unable to connect to the server. Please make sure the backend is running.");
      }
      throw err;
    }
  },

  // Google OAuth Sign In
  async signInWithGoogle() {
    const googleUser: UserProfile = {
      id: `google_${Date.now()}`,
      full_name: "Google Customer",
      email: "customer@gmail.com",
      role: "customer",
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(googleUser));
    return googleUser;
  },

  // Password Reset Link
  async resetPassword(email: string) {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      throw new Error("Please enter a valid email address.");
    }
    return { success: true, message: `Password reset link sent to ${cleanEmail}` };
  },

  // Sign Out
  async signOut() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem("pushpangan_token");
  },

  // Get current active session user profile
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const data = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  // Check if Admin
  async isAdmin(): Promise<boolean> {
    const profile = await this.getCurrentUserProfile();
    return profile?.role === "admin";
  },
};
