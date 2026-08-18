export const SITE = {
  brand: "Pushpangan",
  tagline: "Fresh Flowers, Delivered with Trust",
  phone: "+91 73043 30409",
  whatsappNumber: "918369407007", // digits only, no +
  email: "pushpangan001@gmail.com",
  instagramHandle: "@push_pangan",
  instagramUrl: "https://instagram.com/push_pangan",
  address: "Wholesale Flower Market, Dadar, Maharashtra, India",
  hours: "Open daily · 5:00 AM – 9:00 PM",
  domain: "https://pushpangan.in",
};

export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function inr(n: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}