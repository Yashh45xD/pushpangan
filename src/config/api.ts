// API base URL — set VITE_API_URL in environment variables (Vercel / Render)
// Default Production Backend: https://pushpanganbackend.onrender.com
const rawApiUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim() || "https://pushpanganbackend.onrender.com";

export const API_URL: string = rawApiUrl.replace(/\/+$/, "");

