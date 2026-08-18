export type Flower = {
  slug: string;
  name: string;
  category: "Marigold" | "Rose" | "Traditional" | "Exotic" | "Seasonal" | "Bouquet";
  color: string;
  price: number; // INR
  unit: "per Kg" | "per Piece" | "per Garland" | "per Bundle" | "per Basket";
  available: boolean;
  image: string;
  description: string;
  occasions: string[];
  freshness: string;
};

export const FLOWERS: Flower[] = [
  { slug: "orange-marigold", name: "Orange Marigold", category: "Marigold", color: "Orange", price: 120, unit: "per Kg", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png", description: "Bright orange marigolds, freshly picked at dawn. Ideal for temple garlands, weddings and festive décor.", occasions: ["Festival", "Wedding", "Temple"], freshness: "Same-day harvest" },
  { slug: "yellow-marigold", name: "Yellow Marigold", category: "Marigold", color: "Yellow", price: 110, unit: "per Kg", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709569/6cd676ac-edb2-44f6-8d88-d472354c11ec.png", description: "Sun-kissed yellow marigolds, full bloom, ideal for decorations and pooja.", occasions: ["Festival", "Pooja"], freshness: "Same-day harvest" },
  { slug: "rose", name: "Rose (Mixed)", category: "Rose", color: "Mixed", price: 250, unit: "per Kg", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784737646/3cb09d52-4e7a-4425-9451-dc103c77bb5f.png", description: "Fragrant assorted roses in premium grade. Perfect for bouquets and gifting.", occasions: ["Gifting", "Wedding"], freshness: "Cold-chain fresh" },
  { slug: "red-rose", name: "Red Rose", category: "Rose", color: "Red", price: 300, unit: "per Kg", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708628/18eb09ef-1108-4efd-acec-2fe7a80bbaf1.png", description: "Classic long-stem red roses. Deep colour and long vase life.", occasions: ["Anniversary", "Valentine"], freshness: "Cold-chain fresh" },
  { slug: "pink-rose", name: "Pink Rose", category: "Rose", color: "Pink", price: 280, unit: "per Kg", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709881/45c9b64f-dc46-45ba-a36d-0325dbcd3fb2.png", description: "Soft pink roses hand-picked for weddings and grand decorations.", occasions: ["Wedding", "Gifting"], freshness: "Cold-chain fresh" },
  { slug: "white-rose", name: "White Rose", category: "Rose", color: "White", price: 290, unit: "per Kg", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710023/2412b707-4797-4a60-9680-12ce05cec1c4.png", description: "Pure white roses — a symbol of elegance and new beginnings.", occasions: ["Wedding", "Corporate"], freshness: "Cold-chain fresh" },
  { slug: "rose-petals", name: "Rose Petals", category: "Rose", color: "Mixed", price: 400, unit: "per Kg", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png", description: "Loose rose petals for showering, aisle décor and rangoli.", occasions: ["Wedding", "Reception"], freshness: "Same-day harvest" },
  { slug: "lotus", name: "Lotus", category: "Traditional", color: "Pink", price: 40, unit: "per Piece", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png", description: "Sacred lotus with long stem, perfect for pooja and temple offerings.", occasions: ["Pooja", "Temple"], freshness: "24hr fresh" },
  { slug: "sunflower", name: "Sunflower", category: "Seasonal", color: "Yellow", price: 25, unit: "per Piece", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708497/22561097-5ca1-481d-a600-4a24d27de501.png", description: "Big bright sunflowers — cheerful and long-lasting.", occasions: ["Corporate", "Gifting"], freshness: "Cold-chain fresh" },
  { slug: "shevanti", name: "Shevanti (Chrysanthemum)", category: "Traditional", color: "Yellow", price: 160, unit: "per Kg", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784730994/0f8cf9d3-7012-428a-9830-b1fa3bd52b4d.png", description: "Traditional shevanti — favourite for garlands and decorations.", occasions: ["Festival", "Temple"], freshness: "Same-day harvest" },
  { slug: "lily", name: "Lily", category: "Exotic", color: "White", price: 60, unit: "per Piece", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784731609/8c0bc971-708e-43c1-beef-ff1a2137d519.png", description: "Fragrant lilies with tall stems — grand and graceful.", occasions: ["Wedding", "Gifting"], freshness: "Cold-chain fresh" },
  { slug: "jasmine", name: "Jasmine (Mogra)", category: "Traditional", color: "White", price: 900, unit: "per Kg", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784731813/fdaa172c-5620-4493-838d-1869723eee74.png", description: "Aromatic mogra — the fragrance of Indian evenings.", occasions: ["Pooja", "Wedding"], freshness: "Same-day harvest" },
  { slug: "hibiscus", name: "Hibiscus", category: "Traditional", color: "Red", price: 15, unit: "per Piece", available: true, image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png", description: "Fresh red hibiscus — sacred bloom for pooja and offerings.", occasions: ["Pooja", "Temple"], freshness: "Same-day harvest" }
];

export const CATEGORIES = ["All", "Marigold", "Rose", "Traditional", "Exotic", "Seasonal", "Bouquet"] as const;
export const COLORS = ["All", "Red", "Pink", "White", "Yellow", "Orange", "Purple", "Mixed"] as const;
export const OCCASIONS = ["All", "Festival", "Wedding", "Temple", "Pooja", "Gifting", "Corporate", "Anniversary", "Birthday", "Reception", "Valentine"] as const;

export function findFlower(slug: string): Flower | undefined {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("pushpangan_admin_products");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const found = parsed.find((p: any) => p.slug === slug || p._id === slug || p.id === slug);
          if (found) {
            return {
              slug: found.slug || slug,
              name: found.name,
              category: found.category || "Marigold",
              color: found.color || "Orange",
              price: (found.discountPrice !== undefined && Number(found.discountPrice) > 0) ? Number(found.discountPrice) : Number(found.price),
              unit: found.unit || "per Kg",
              available: (found.stockQuantity ?? 100) > 0 && (found.available ?? true) && found.status !== "draft",
              image: found.image || found.images?.[0] || "",
              description: found.description || found.shortDescription || "",
              occasions: found.occasions || ["Festival", "Pooja", "Wedding"],
              freshness: found.freshness || "Dawn Plucked 100% Fresh",
            };
          }
        }
      }
    } catch {}
  }
  return FLOWERS.find((f) => f.slug === slug);
}