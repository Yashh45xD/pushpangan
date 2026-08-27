// API base URL — set VITE_API_URL in your Vercel environment variables
// Production backend: https://pushpanganbackend.vercel.app
export const API_URL: string =
  import.meta.env.VITE_API_URL ?? "https://pushpanganbackend.vercel.app";
