export const SITE = {
  brand: "Pushpangan",
  tagline: "Fresh Flowers, Delivered with Trust",
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210", // digits only, no +
  email: "hello@pushpangan.in",
  address: "Wholesale Flower Market, Pune, Maharashtra, India",
  hours: "Open daily · 5:00 AM – 9:00 PM",
  domain: "https://pushpangan.in",
};

export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function inr(n: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}