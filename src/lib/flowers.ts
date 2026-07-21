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

// Unsplash Source redirect endpoint — safe placeholder imagery, admin can replace later.
const img = (q: string) => `https://source.unsplash.com/featured/900x900/?${encodeURIComponent(q)}`;

export const FLOWERS: Flower[] = [
  { slug: "orange-marigold", name: "Orange Marigold", category: "Marigold", color: "Orange", price: 120, unit: "per Kg", available: true, image: img("orange,marigold,flower"), description: "Bright orange marigolds, freshly picked at dawn. Ideal for temple garlands, weddings and festive décor.", occasions: ["Festival", "Wedding", "Temple"], freshness: "Same-day harvest" },
  { slug: "yellow-marigold", name: "Yellow Marigold", category: "Marigold", color: "Yellow", price: 110, unit: "per Kg", available: true, image: img("yellow,marigold"), description: "Sun-kissed yellow marigolds, full bloom, ideal for decorations and pooja.", occasions: ["Festival", "Pooja"], freshness: "Same-day harvest" },
  { slug: "white-marigold", name: "White Marigold", category: "Marigold", color: "White", price: 140, unit: "per Kg", available: true, image: img("white,marigold,flower"), description: "Rare white marigolds for elegant décor and ceremonial arrangements.", occasions: ["Wedding", "Corporate"], freshness: "24hr fresh" },
  { slug: "rose", name: "Rose (Mixed)", category: "Rose", color: "Mixed", price: 250, unit: "per Kg", available: true, image: img("rose,flowers,bunch"), description: "Fragrant assorted roses in premium grade. Perfect for bouquets and gifting.", occasions: ["Gifting", "Wedding"], freshness: "Cold-chain fresh" },
  { slug: "red-rose", name: "Red Rose", category: "Rose", color: "Red", price: 300, unit: "per Kg", available: true, image: img("red,rose"), description: "Classic long-stem red roses. Deep colour and long vase life.", occasions: ["Anniversary", "Valentine"], freshness: "Cold-chain fresh" },
  { slug: "pink-rose", name: "Pink Rose", category: "Rose", color: "Pink", price: 280, unit: "per Kg", available: true, image: img("pink,rose,flower"), description: "Soft pink roses hand-picked for weddings and grand decorations.", occasions: ["Wedding", "Gifting"], freshness: "Cold-chain fresh" },
  { slug: "white-rose", name: "White Rose", category: "Rose", color: "White", price: 290, unit: "per Kg", available: true, image: img("white,rose"), description: "Pure white roses — a symbol of elegance and new beginnings.", occasions: ["Wedding", "Corporate"], freshness: "Cold-chain fresh" },
  { slug: "rose-petals", name: "Rose Petals", category: "Rose", color: "Mixed", price: 400, unit: "per Kg", available: true, image: img("rose,petals"), description: "Loose rose petals for showering, aisle décor and rangoli.", occasions: ["Wedding", "Reception"], freshness: "Same-day harvest" },
  { slug: "lotus", name: "Lotus", category: "Traditional", color: "Pink", price: 40, unit: "per Piece", available: true, image: img("lotus,flower"), description: "Sacred lotus with long stem, perfect for pooja and temple offerings.", occasions: ["Pooja", "Temple"], freshness: "24hr fresh" },
  { slug: "sunflower", name: "Sunflower", category: "Seasonal", color: "Yellow", price: 25, unit: "per Piece", available: true, image: img("sunflower"), description: "Big bright sunflowers — cheerful and long-lasting.", occasions: ["Corporate", "Gifting"], freshness: "Cold-chain fresh" },
  { slug: "shevanti", name: "Shevanti (Chrysanthemum)", category: "Traditional", color: "Yellow", price: 160, unit: "per Kg", available: true, image: img("chrysanthemum,flower"), description: "Traditional shevanti — favourite for garlands and decorations.", occasions: ["Festival", "Temple"], freshness: "Same-day harvest" },
  { slug: "purple-flowers", name: "Purple Statice", category: "Exotic", color: "Purple", price: 220, unit: "per Bundle", available: true, image: img("purple,flowers"), description: "Vivid purple filler flowers to add depth to bouquets and centre-pieces.", occasions: ["Wedding", "Corporate"], freshness: "Cold-chain fresh" },
  { slug: "lily", name: "Lily", category: "Exotic", color: "White", price: 60, unit: "per Piece", available: true, image: img("lily,flower"), description: "Fragrant lilies with tall stems — grand and graceful.", occasions: ["Wedding", "Gifting"], freshness: "Cold-chain fresh" },
  { slug: "orchid", name: "Orchid", category: "Exotic", color: "Purple", price: 80, unit: "per Piece", available: true, image: img("orchid,flower"), description: "Premium imported orchids for luxury arrangements.", occasions: ["Corporate", "Gifting"], freshness: "Cold-chain fresh" },
  { slug: "jasmine", name: "Jasmine (Mogra)", category: "Traditional", color: "White", price: 900, unit: "per Kg", available: true, image: img("jasmine,mogra,flowers"), description: "Aromatic mogra — the fragrance of Indian evenings.", occasions: ["Pooja", "Wedding"], freshness: "Same-day harvest" },
  { slug: "tuberose", name: "Tuberose (Rajnigandha)", category: "Traditional", color: "White", price: 180, unit: "per Bundle", available: true, image: img("tuberose,flower"), description: "Long-stemmed rajnigandha — deeply fragrant, ideal for stage décor.", occasions: ["Wedding", "Corporate"], freshness: "24hr fresh" },
  { slug: "gerbera", name: "Gerbera", category: "Exotic", color: "Mixed", price: 20, unit: "per Piece", available: true, image: img("gerbera,daisy,flower"), description: "Vibrant gerberas in every colour — perfect for bouquets.", occasions: ["Gifting", "Birthday"], freshness: "Cold-chain fresh" },
  { slug: "carnation", name: "Carnation", category: "Exotic", color: "Mixed", price: 22, unit: "per Piece", available: true, image: img("carnation,flower"), description: "Ruffled carnations with long vase life.", occasions: ["Wedding", "Gifting"], freshness: "Cold-chain fresh" },
  { slug: "hibiscus", name: "Hibiscus", category: "Traditional", color: "Red", price: 15, unit: "per Piece", available: true, image: img("hibiscus,flower"), description: "Fresh red hibiscus — sacred bloom for pooja and offerings.", occasions: ["Pooja", "Temple"], freshness: "Same-day harvest" },
  { slug: "aster", name: "Aster", category: "Seasonal", color: "Mixed", price: 140, unit: "per Bundle", available: true, image: img("aster,flower"), description: "Star-shaped asters — bright fillers for arrangements.", occasions: ["Festival", "Gifting"], freshness: "Cold-chain fresh" },
  { slug: "gladiolus", name: "Gladiolus", category: "Exotic", color: "Mixed", price: 35, unit: "per Piece", available: true, image: img("gladiolus,flower"), description: "Tall dramatic gladiolus spikes — a stage-décor favourite.", occasions: ["Wedding", "Corporate"], freshness: "Cold-chain fresh" },
  { slug: "mixed-basket", name: "Mixed Flower Basket", category: "Bouquet", color: "Mixed", price: 1500, unit: "per Basket", available: true, image: img("mixed,flower,basket"), description: "Hand-curated basket of the season's freshest blooms.", occasions: ["Gifting", "Corporate"], freshness: "Made to order" },
];

export const CATEGORIES = ["All", "Marigold", "Rose", "Traditional", "Exotic", "Seasonal", "Bouquet"] as const;
export const COLORS = ["All", "Red", "Pink", "White", "Yellow", "Orange", "Purple", "Mixed"] as const;
export const OCCASIONS = ["All", "Festival", "Wedding", "Temple", "Pooja", "Gifting", "Corporate", "Anniversary", "Birthday", "Reception", "Valentine"] as const;

export function findFlower(slug: string): Flower | undefined {
  return FLOWERS.find((f) => f.slug === slug);
}