// API base URL — set VITE_API_URL in your Vercel environment variables
// Production backend: https://pushbackend.vercel.app
export const API_URL: string =
  import.meta.env.VITE_API_URL ?? "https://pushbackend.vercel.app";
