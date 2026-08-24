import { Flower, FLOWERS } from "@/lib/flowers";

export type DbProduct = {
  id?: string;
  _id?: string;
  category?: { _id: string; name: string; slug: string } | string;
  category_id?: string;
  name: string;
  slug: string;
  botanical_name?: string;
  short_description?: string;
  long_description?: string;
  price: number;
  discount_price?: number;
  stock_quantity: number;
  unit: string;
  image: string;
  images?: string[];
  featured: boolean;
  availability: boolean;
  sku: string;
  created_at?: string;
  updated_at?: string;
  color?: string;
};

const API_BASE = `${import.meta.env.VITE_API_URL || "https://blossom-bridge-app-gold.vercel.app"}/api`;

const DEFAULT_DB_PRODUCTS: DbProduct[] = FLOWERS.map((f) => ({
  id: f.slug,
  _id: f.slug,
  name: f.name,
  slug: f.slug,
  category: f.category,
  color: f.color,
  botanical_name: f.name,
  short_description: f.description,
  long_description: f.description,
  price: f.price,
  discount_price: Math.round(f.price * 0.9),
  stock_quantity: 100,
  unit: f.unit,
  image: f.image,
  images: [f.image],
  featured: true,
  availability: f.available,
  sku: `FLW-${f.slug.toUpperCase()}`,
}));

const getLiveDbProducts = (): DbProduct[] => {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("pushpangan_admin_products");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
            .filter((p: any) => p.status !== "draft")
            .map((p: any) => ({
              id: p._id || p.id || p.slug,
              _id: p._id || p.id || p.slug,
              name: p.name,
              slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              category: typeof p.category === "object" ? p.category?.name : p.category,
              color: p.color || "Orange",
              botanical_name: p.scientificName || p.name,
              short_description: p.shortDescription || p.description,
              long_description: p.description || p.shortDescription,
              price: Number(p.price),
              discount_price: p.discountPrice !== undefined ? Number(p.discountPrice) : Number(p.price),
              stock_quantity: p.stockQuantity !== undefined ? Number(p.stockQuantity) : 100,
              unit: p.unit || "per Kg",
              image: p.image || p.images?.[0] || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400",
              images: p.images && p.images.length > 0 ? p.images : [p.image],
              featured: p.isFeatured ?? true,
              availability: (p.stockQuantity ?? 100) > 0 && (p.available ?? true),
              sku: `FLW-${(p.slug || p.name).toUpperCase()}`,
            }));
        }
      }
    } catch (e) {
      console.warn("Failed to load admin products from localStorage:", e);
    }
  }
  return DEFAULT_DB_PRODUCTS;
};

export const productService = {
  async getProducts(params?: {
    category?: string;
    search?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params?.featured) queryParams.append("featured", "true");
      if (params?.search) queryParams.append("search", params.search);
      if (params?.page) queryParams.append("page", String(params.page));
      if (params?.limit) queryParams.append("limit", String(params.limit));
      if (params?.category && params.category !== "All") {
        queryParams.append("categoryName", params.category);
      }

      const res = await fetch(`${API_BASE}/products?${queryParams.toString()}`);
      if (res.ok) {
        const result = await res.json();
        if (result.data && result.data.length > 0) {
          const mappedData = result.data.map((p: any) => ({
            id: p._id,
            _id: p._id,
            name: p.name,
            slug: p.slug,
            category: typeof p.category === "object" ? p.category?.name : p.category,
            color: p.color || "Orange",
            botanical_name: p.botanicalName || p.name,
            short_description: p.description,
            long_description: p.description,
            price: p.price,
            discount_price: p.discountPrice || Math.round(p.price * 0.9),
            stock_quantity: p.stock || 100,
            unit: p.unit || "per Kg",
            image: p.images?.[0] || p.mainImage || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400",
            featured: p.featured || false,
            availability: (p.stock || 100) > 0,
            sku: p.sku || `FLW-${p.slug?.toUpperCase()}`,
          }));
          return { data: mappedData, count: result.metadata?.total || mappedData.length };
        }
      }
    } catch (err) {
      console.warn("Backend API getProducts failed, using local product catalog:", err);
    }

    // Fallback: Default & Admin live flowers list
    let filtered = getLiveDbProducts();
    if (params?.category && params.category !== "All") {
      filtered = filtered.filter((p) =>
        String(p.category).toLowerCase().includes(params.category!.toLowerCase())
      );
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || (p.color && p.color.toLowerCase().includes(q))
      );
    }
    return { data: filtered, count: filtered.length };
  },

  async getProductBySlug(slug: string): Promise<DbProduct | null> {
    try {
      const res = await fetch(`${API_BASE}/products?slug=${slug}`);
      if (res.ok) {
        const result = await res.json();
        const p = result.data?.[0];
        if (p) {
          return {
            id: p._id,
            _id: p._id,
            name: p.name,
            slug: p.slug,
            category: typeof p.category === "object" ? p.category?.name : p.category,
            color: p.color || "Orange",
            botanical_name: p.botanicalName || p.name,
            short_description: p.description,
            long_description: p.description,
            price: p.price,
            discount_price: p.discountPrice || Math.round(p.price * 0.9),
            stock_quantity: p.stock || 100,
            unit: p.unit || "per Kg",
            image: p.images?.[0] || p.mainImage || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400",
            featured: p.featured || false,
            availability: (p.stock || 100) > 0,
            sku: p.sku || `FLW-${p.slug?.toUpperCase()}`,
          };
        }
      }
    } catch {}

    const liveList = getLiveDbProducts();
    const found = liveList.find((p) => p.slug === slug || p._id === slug || p.id === slug);
    return found || null;
  },

  async addProduct(product: Omit<DbProduct, "id">) {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(product),
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },

  async updateProduct(id: string, updates: Partial<DbProduct>) {
    try {
      await fetch(`${API_BASE}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(updates),
      });
    } catch {}
  },

  async deleteProduct(id: string) {
    try {
      await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
    } catch {}
  },

  async updateStock(id: string, stockQuantity: number, availability: boolean) {
    try {
      await fetch(`${API_BASE}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ stock: stockQuantity, availability }),
      });
    } catch {}
  },

  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (res.ok) {
        const result = await res.json();
        if (result.data && result.data.length > 0) return result.data;
      }
    } catch (err) {}

    return [
      { _id: "c1", name: "Marigold", slug: "marigold" },
      { _id: "c2", name: "Rose", slug: "rose" },
      { _id: "c3", name: "Traditional", slug: "traditional" },
      { _id: "c4", name: "Exotic", slug: "exotic" },
      { _id: "c5", name: "Seasonal", slug: "seasonal" },
      { _id: "c6", name: "Bouquet", slug: "bouquet" },
    ];
  },

  toFlower(prod: DbProduct): Flower {
    return {
      slug: prod.slug,
      name: prod.name,
      category: (typeof prod.category === "object" && prod.category ? (prod.category as any).name : prod.category) as any || "Marigold",
      color: prod.color || "Orange",
      price: prod.discount_price || prod.price,
      unit: (prod.unit as any) || "per Kg",
      available: prod.availability && prod.stock_quantity > 0,
      image: prod.image,
      description: prod.short_description || prod.long_description || "",
      occasions: ["Festival", "Pooja", "Wedding"],
      freshness: "Dawn Plucked 100% Fresh",
    };
  },
};

