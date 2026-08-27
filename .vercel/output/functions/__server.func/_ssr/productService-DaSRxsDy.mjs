import { t as API_URL } from "./api-CnTWETQ1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/productService-DaSRxsDy.js
var FLOWERS = [
	{
		slug: "orange-marigold",
		name: "Orange Marigold",
		category: "Marigold",
		color: "Orange",
		price: 120,
		unit: "per Kg",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png",
		description: "Bright orange marigolds, freshly picked at dawn. Ideal for temple garlands, weddings and festive décor.",
		occasions: [
			"Festival",
			"Wedding",
			"Temple"
		],
		freshness: "Same-day harvest"
	},
	{
		slug: "yellow-marigold",
		name: "Yellow Marigold",
		category: "Marigold",
		color: "Yellow",
		price: 110,
		unit: "per Kg",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709569/6cd676ac-edb2-44f6-8d88-d472354c11ec.png",
		description: "Sun-kissed yellow marigolds, full bloom, ideal for decorations and pooja.",
		occasions: ["Festival", "Pooja"],
		freshness: "Same-day harvest"
	},
	{
		slug: "rose",
		name: "Rose (Mixed)",
		category: "Rose",
		color: "Mixed",
		price: 250,
		unit: "per Kg",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784737646/3cb09d52-4e7a-4425-9451-dc103c77bb5f.png",
		description: "Fragrant assorted roses in premium grade. Perfect for bouquets and gifting.",
		occasions: ["Gifting", "Wedding"],
		freshness: "Cold-chain fresh"
	},
	{
		slug: "red-rose",
		name: "Red Rose",
		category: "Rose",
		color: "Red",
		price: 300,
		unit: "per Kg",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708628/18eb09ef-1108-4efd-acec-2fe7a80bbaf1.png",
		description: "Classic long-stem red roses. Deep colour and long vase life.",
		occasions: ["Anniversary", "Valentine"],
		freshness: "Cold-chain fresh"
	},
	{
		slug: "pink-rose",
		name: "Pink Rose",
		category: "Rose",
		color: "Pink",
		price: 280,
		unit: "per Kg",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709881/45c9b64f-dc46-45ba-a36d-0325dbcd3fb2.png",
		description: "Soft pink roses hand-picked for weddings and grand decorations.",
		occasions: ["Wedding", "Gifting"],
		freshness: "Cold-chain fresh"
	},
	{
		slug: "white-rose",
		name: "White Rose",
		category: "Rose",
		color: "White",
		price: 290,
		unit: "per Kg",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710023/2412b707-4797-4a60-9680-12ce05cec1c4.png",
		description: "Pure white roses — a symbol of elegance and new beginnings.",
		occasions: ["Wedding", "Corporate"],
		freshness: "Cold-chain fresh"
	},
	{
		slug: "rose-petals",
		name: "Rose Petals",
		category: "Rose",
		color: "Mixed",
		price: 400,
		unit: "per Kg",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png",
		description: "Loose rose petals for showering, aisle décor and rangoli.",
		occasions: ["Wedding", "Reception"],
		freshness: "Same-day harvest"
	},
	{
		slug: "lotus",
		name: "Lotus",
		category: "Traditional",
		color: "Pink",
		price: 40,
		unit: "per Piece",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png",
		description: "Sacred lotus with long stem, perfect for pooja and temple offerings.",
		occasions: ["Pooja", "Temple"],
		freshness: "24hr fresh"
	},
	{
		slug: "sunflower",
		name: "Sunflower",
		category: "Seasonal",
		color: "Yellow",
		price: 25,
		unit: "per Piece",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708497/22561097-5ca1-481d-a600-4a24d27de501.png",
		description: "Big bright sunflowers — cheerful and long-lasting.",
		occasions: ["Corporate", "Gifting"],
		freshness: "Cold-chain fresh"
	},
	{
		slug: "shevanti",
		name: "Shevanti (Chrysanthemum)",
		category: "Traditional",
		color: "Yellow",
		price: 160,
		unit: "per Kg",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784730994/0f8cf9d3-7012-428a-9830-b1fa3bd52b4d.png",
		description: "Traditional shevanti — favourite for garlands and decorations.",
		occasions: ["Festival", "Temple"],
		freshness: "Same-day harvest"
	},
	{
		slug: "lily",
		name: "Lily",
		category: "Exotic",
		color: "White",
		price: 60,
		unit: "per Piece",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784731609/8c0bc971-708e-43c1-beef-ff1a2137d519.png",
		description: "Fragrant lilies with tall stems — grand and graceful.",
		occasions: ["Wedding", "Gifting"],
		freshness: "Cold-chain fresh"
	},
	{
		slug: "jasmine",
		name: "Jasmine (Mogra)",
		category: "Traditional",
		color: "White",
		price: 900,
		unit: "per Kg",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784731813/fdaa172c-5620-4493-838d-1869723eee74.png",
		description: "Aromatic mogra — the fragrance of Indian evenings.",
		occasions: ["Pooja", "Wedding"],
		freshness: "Same-day harvest"
	},
	{
		slug: "hibiscus",
		name: "Hibiscus",
		category: "Traditional",
		color: "Red",
		price: 15,
		unit: "per Piece",
		available: true,
		image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png",
		description: "Fresh red hibiscus — sacred bloom for pooja and offerings.",
		occasions: ["Pooja", "Temple"],
		freshness: "Same-day harvest"
	}
];
var COLORS = [
	"All",
	"Red",
	"Pink",
	"White",
	"Yellow",
	"Orange",
	"Purple",
	"Mixed"
];
var OCCASIONS = [
	"All",
	"Festival",
	"Wedding",
	"Temple",
	"Pooja",
	"Gifting",
	"Corporate",
	"Anniversary",
	"Birthday",
	"Reception",
	"Valentine"
];
function findFlower(slug) {
	if (typeof window !== "undefined") try {
		const saved = localStorage.getItem("pushpangan_admin_products");
		if (saved) {
			const parsed = JSON.parse(saved);
			if (Array.isArray(parsed)) {
				const found = parsed.find((p) => p.slug === slug || p._id === slug || p.id === slug);
				if (found) return {
					slug: found.slug || slug,
					name: found.name,
					category: found.category || "Marigold",
					color: found.color || "Orange",
					price: found.discountPrice !== void 0 && Number(found.discountPrice) > 0 ? Number(found.discountPrice) : Number(found.price),
					unit: found.unit || "per Kg",
					available: (found.stockQuantity ?? 100) > 0 && (found.available ?? true) && found.status !== "draft",
					image: found.image || found.images?.[0] || "",
					description: found.description || found.shortDescription || "",
					occasions: found.occasions || [
						"Festival",
						"Pooja",
						"Wedding"
					],
					freshness: found.freshness || "Dawn Plucked 100% Fresh"
				};
			}
		}
	} catch {}
	return FLOWERS.find((f) => f.slug === slug);
}
var API_BASE = `${API_URL}/api`;
var DEFAULT_DB_PRODUCTS = FLOWERS.map((f) => ({
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
	discount_price: Math.round(f.price * .9),
	stock_quantity: 100,
	unit: f.unit,
	image: f.image,
	images: [f.image],
	featured: true,
	availability: f.available,
	sku: `FLW-${f.slug.toUpperCase()}`
}));
var getLiveDbProducts = () => {
	if (typeof window !== "undefined") try {
		const raw = localStorage.getItem("pushpangan_admin_products");
		if (raw) {
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed) && parsed.length > 0) return parsed.filter((p) => p.status !== "draft").map((p) => ({
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
				discount_price: p.discountPrice !== void 0 ? Number(p.discountPrice) : Number(p.price),
				stock_quantity: p.stockQuantity !== void 0 ? Number(p.stockQuantity) : 100,
				unit: p.unit || "per Kg",
				image: p.image || p.images?.[0] || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400",
				images: p.images && p.images.length > 0 ? p.images : [p.image],
				featured: p.isFeatured ?? true,
				availability: (p.stockQuantity ?? 100) > 0 && (p.available ?? true),
				sku: `FLW-${(p.slug || p.name).toUpperCase()}`
			}));
		}
	} catch (e) {
		console.warn("Failed to load admin products from localStorage:", e);
	}
	return DEFAULT_DB_PRODUCTS;
};
var productService = {
	async getProducts(params) {
		try {
			const queryParams = new URLSearchParams();
			if (params?.featured) queryParams.append("featured", "true");
			if (params?.search) queryParams.append("search", params.search);
			if (params?.page) queryParams.append("page", String(params.page));
			if (params?.limit) queryParams.append("limit", String(params.limit));
			if (params?.category && params.category !== "All") queryParams.append("categoryName", params.category);
			const res = await fetch(`${API_BASE}/products?${queryParams.toString()}`);
			if (res.ok) {
				const result = await res.json();
				if (result.data && result.data.length > 0) {
					const mappedData = result.data.map((p) => ({
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
						discount_price: p.discountPrice || Math.round(p.price * .9),
						stock_quantity: p.stock || 100,
						unit: p.unit || "per Kg",
						image: p.images?.[0] || p.mainImage || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400",
						featured: p.featured || false,
						availability: (p.stock || 100) > 0,
						sku: p.sku || `FLW-${p.slug?.toUpperCase()}`
					}));
					return {
						data: mappedData,
						count: result.metadata?.total || mappedData.length
					};
				}
			}
		} catch (err) {
			console.warn("Backend API getProducts failed, using local product catalog:", err);
		}
		let filtered = getLiveDbProducts();
		if (params?.category && params.category !== "All") filtered = filtered.filter((p) => String(p.category).toLowerCase().includes(params.category.toLowerCase()));
		if (params?.search) {
			const q = params.search.toLowerCase();
			filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.color && p.color.toLowerCase().includes(q));
		}
		return {
			data: filtered,
			count: filtered.length
		};
	},
	async getProductBySlug(slug) {
		try {
			const res = await fetch(`${API_BASE}/products?slug=${slug}`);
			if (res.ok) {
				const p = (await res.json()).data?.[0];
				if (p) return {
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
					discount_price: p.discountPrice || Math.round(p.price * .9),
					stock_quantity: p.stock || 100,
					unit: p.unit || "per Kg",
					image: p.images?.[0] || p.mainImage || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400",
					featured: p.featured || false,
					availability: (p.stock || 100) > 0,
					sku: p.sku || `FLW-${p.slug?.toUpperCase()}`
				};
			}
		} catch {}
		return getLiveDbProducts().find((p) => p.slug === slug || p._id === slug || p.id === slug) || null;
	},
	async addProduct(product) {
		try {
			return await (await fetch(`${API_BASE}/products`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("adminToken")}`
				},
				body: JSON.stringify(product)
			})).json();
		} catch {
			return { success: false };
		}
	},
	async updateProduct(id, updates) {
		try {
			await fetch(`${API_BASE}/products/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("adminToken")}`
				},
				body: JSON.stringify(updates)
			});
		} catch {}
	},
	async deleteProduct(id) {
		try {
			await fetch(`${API_BASE}/products/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
			});
		} catch {}
	},
	async updateStock(id, stockQuantity, availability) {
		try {
			await fetch(`${API_BASE}/products/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("adminToken")}`
				},
				body: JSON.stringify({
					stock: stockQuantity,
					availability
				})
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
			{
				_id: "c1",
				name: "Marigold",
				slug: "marigold"
			},
			{
				_id: "c2",
				name: "Rose",
				slug: "rose"
			},
			{
				_id: "c3",
				name: "Traditional",
				slug: "traditional"
			},
			{
				_id: "c4",
				name: "Exotic",
				slug: "exotic"
			},
			{
				_id: "c5",
				name: "Seasonal",
				slug: "seasonal"
			},
			{
				_id: "c6",
				name: "Bouquet",
				slug: "bouquet"
			}
		];
	},
	toFlower(prod) {
		return {
			slug: prod.slug,
			name: prod.name,
			category: (typeof prod.category === "object" && prod.category ? prod.category.name : prod.category) || "Marigold",
			color: prod.color || "Orange",
			price: prod.discount_price || prod.price,
			unit: prod.unit || "per Kg",
			available: prod.availability && prod.stock_quantity > 0,
			image: prod.image,
			description: prod.short_description || prod.long_description || "",
			occasions: [
				"Festival",
				"Pooja",
				"Wedding"
			],
			freshness: "Dawn Plucked 100% Fresh"
		};
	}
};
//#endregion
export { productService as a, findFlower as i, FLOWERS as n, OCCASIONS as r, COLORS as t };
