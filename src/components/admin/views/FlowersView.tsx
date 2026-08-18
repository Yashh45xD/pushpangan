import React, { useState, useEffect, useMemo } from "react";
import { FLOWERS, CATEGORIES, type Flower } from "../../../lib/flowers";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  UploadCloud,
  X,
  Sparkles,
  Tag,
  Check,
  AlertCircle,
  Flower2,
  IndianRupee,
  Package,
  Image as ImageIcon,
} from "lucide-react";

// Extended product type for admin management
interface AdminProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  color: string;
  price: number;
  discountPrice: number;
  stockQuantity: number;
  unit: string;
  image: string;
  images: string[];
  description: string;
  shortDescription: string;
  scientificName: string;
  occasions: string[];
  freshness: string;
  season: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isTrending: boolean;
  tags: string;
  status: "published" | "draft";
  minOrderQuantity: number;
  available: boolean;
}

const STORAGE_KEY = "pushpangan_admin_products";

// Convert FLOWERS data to AdminProduct format
const flowersToAdminProducts = (): AdminProduct[] => {
  return FLOWERS.map((f) => ({
    _id: f.slug,
    name: f.name,
    slug: f.slug,
    category: f.category,
    color: f.color,
    price: f.price,
    discountPrice: Math.round(f.price * 0.9),
    stockQuantity: 100,
    unit: f.unit,
    image: f.image,
    images: [f.image],
    description: f.description,
    shortDescription: f.description,
    scientificName: "",
    occasions: f.occasions,
    freshness: f.freshness,
    season: "All Season",
    isFeatured: true,
    isBestSeller: false,
    isTrending: false,
    tags: f.occasions.join(", ").toLowerCase(),
    status: "published" as const,
    minOrderQuantity: 1,
    available: f.available,
  }));
};

const loadProducts = (): AdminProduct[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  // Initialize from the real FLOWERS catalog
  const defaults = flowersToAdminProducts();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  return defaults;
};

const saveProducts = (products: AdminProduct[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

const categoriesList = [
  "Marigold",
  "Rose",
  "Traditional",
  "Exotic",
  "Seasonal",
  "Bouquet",
  "Garlands",
  "Loose Flowers",
  "Flower Petals",
  "Wedding Flowers",
  "Decoration Flowers",
  "Festival Flowers",
];

import { ProductDetailView } from "./ProductDetailView";

export const FlowersView: React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState<"All" | "In Stock" | "Out of Stock">("All");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [viewingProductId, setViewingProductId] = useState<string | null>(null);

  const emptyForm: AdminProduct = {
    _id: "",
    name: "",
    slug: "",
    category: "Marigold",
    color: "Yellow",
    price: 100,
    discountPrice: 90,
    stockQuantity: 100,
    unit: "per Kg",
    image: "",
    images: [],
    description: "",
    shortDescription: "",
    scientificName: "",
    occasions: ["Festival", "Pooja"],
    freshness: "Same-day harvest",
    season: "All Season",
    isFeatured: false,
    isBestSeller: false,
    isTrending: false,
    tags: "puja, fresh",
    status: "published",
    minOrderQuantity: 1,
    available: true,
  };

  const [formData, setFormData] = useState<AdminProduct>({ ...emptyForm });

  // Load products on mount
  useEffect(() => {
    const loaded = loadProducts();
    setProducts(loaded);
    setLoading(false);
  }, []);

  // Filtered products
  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== "All") {
      list = list.filter((p) =>
        p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    if (stockFilter === "In Stock") {
      list = list.filter((p) => p.available && p.stockQuantity > 0);
    } else if (stockFilter === "Out of Stock") {
      list = list.filter((p) => !p.available || p.stockQuantity <= 0);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, selectedCategory, stockFilter, search]);

  // Show a brief success toast
  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  // Open the Add / Edit modal
  const handleOpenModal = (product?: AdminProduct) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({ ...emptyForm });
    }
    setShowModal(true);
  };

  // Save (create or update)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: AdminProduct[];

    if (editingProduct) {
      // Update existing
      updated = products.map((p) =>
        p._id === editingProduct._id
          ? {
              ...formData,
              _id: editingProduct._id,
              slug: editingProduct.slug,
            }
          : p
      );
      showSuccess(`"${formData.name}" updated successfully!`);
    } else {
      // Add new
      const slug =
        formData.slug ||
        formData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      const newProduct: AdminProduct = {
        ...formData,
        _id: "flw_" + Date.now(),
        slug,
        images: formData.image ? [formData.image, ...formData.images.filter(i => i !== formData.image)] : formData.images,
        available: true,
      };
      updated = [newProduct, ...products];
      showSuccess(`"${formData.name}" added successfully!`);
    }

    setProducts(updated);
    saveProducts(updated);
    setShowModal(false);
  };

  // Delete product
  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p._id !== id);
    setProducts(updated);
    saveProducts(updated);
    setDeleteConfirm(null);
    showSuccess("Product deleted.");
  };

  // Duplicate product
  const handleDuplicate = (product: AdminProduct) => {
    const duplicate: AdminProduct = {
      ...product,
      _id: "flw_" + Date.now(),
      slug: product.slug + "-copy-" + Date.now(),
      name: product.name + " (Copy)",
    };
    const updated = [duplicate, ...products];
    setProducts(updated);
    saveProducts(updated);
    showSuccess(`"${product.name}" duplicated!`);
  };

  // Toggle published/draft status
  const handleToggleStatus = (id: string) => {
    const updated = products.map((p) =>
      p._id === id
        ? { ...p, status: (p.status === "published" ? "draft" : "published") as "published" | "draft" }
        : p
    );
    setProducts(updated);
    saveProducts(updated);
  };

  // Toggle In Stock / Out of Stock
  const handleToggleStock = (id: string) => {
    const updated = products.map((p) => {
      if (p._id !== id) return p;
      const nowAvailable = !(p.available && p.stockQuantity > 0);
      return {
        ...p,
        available: nowAvailable,
        stockQuantity: nowAvailable ? Math.max(p.stockQuantity || 1, 1) : 0,
      };
    });
    setProducts(updated);
    saveProducts(updated);
    const product = updated.find((p) => p._id === id);
    showSuccess(`"${product?.name}" marked as ${product?.available ? "In Stock" : "Out of Stock"}!`);
  };

  // Handle image URL input (paste a URL or upload a file)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const url = uploadEvent.target?.result as string;
        setFormData((prev: AdminProduct) => ({
          ...prev,
          image: prev.image || url,
          images: [...prev.images, url],
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Remove an image from the gallery
  const handleRemoveImage = (idx: number) => {
    const newImages = formData.images.filter((_: string, i: number) => i !== idx);
    setFormData({
      ...formData,
      images: newImages,
      image: newImages[0] || "",
    });
  };

  // Stats
  const totalProducts = products.length;
  const publishedCount = products.filter((p) => p.status === "published").length;
  const draftCount = products.filter((p) => p.status === "draft").length;
  const lowStockCount = products.filter((p) => p.stockQuantity <= 10).length;

  if (viewingProductId) {
    return (
      <ProductDetailView
        productId={viewingProductId}
        onBack={() => setViewingProductId(null)}
        onEdit={(prod) => {
          setViewingProductId(null);
          handleOpenModal(prod);
        }}
      />
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Success Toast */}
      {successMsg && (
        <div
          style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
          className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-sm font-bold animate-pulse"
        >
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 style={{ color: "#4F5535" }} className="text-xl font-extrabold flex items-center gap-2">
            <Flower2 style={{ color: "#B68F38" }} className="w-6 h-6" />
            Flower Product Management
          </h1>
          <p style={{ color: "#666851" }} className="text-xs mt-1">
            Add, edit, duplicate, and manage your entire flower catalog. Changes are reflected on the shop instantly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenModal()}
            style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
            className="px-4 py-2.5 rounded-xl font-bold text-xs shadow hover:opacity-90 transition flex items-center gap-1.5 border border-[#9F905E]"
          >
            <Plus className="w-4 h-4" /> Add New Flower
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Products", value: totalProducts, icon: Package, color: "#4F5535" },
          { label: "Published", value: publishedCount, icon: Eye, color: "#16a34a" },
          { label: "Drafts", value: draftCount, icon: EyeOff, color: "#9F905E" },
          { label: "Low Stock", value: lowStockCount, icon: AlertCircle, color: "#dc2626" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}
            className="border rounded-2xl p-4 flex items-center gap-3 shadow-sm"
          >
            <div
              style={{ backgroundColor: stat.color + "18", color: stat.color }}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
            >
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div style={{ color: "#666851" }} className="text-[10px] font-bold uppercase">
                {stat.label}
              </div>
              <div style={{ color: "#4F5535" }} className="text-lg font-extrabold">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}
        className="p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
      >
        <div className="relative w-full sm:w-80">
          <Search style={{ color: "#9F905E" }} className="absolute left-3 top-2.5 w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search flower by name, color, tag..."
            style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
            className="w-full border rounded-xl py-2 pl-9 pr-3 text-xs outline-none focus:border-[#B68F38] font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto flex-wrap">
          <span style={{ color: "#666851" }} className="text-xs font-bold whitespace-nowrap">
            Category:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
            className="border rounded-xl py-2 px-3 text-xs outline-none focus:border-[#B68F38] font-medium"
          >
            <option value="All">All Categories</option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <span style={{ color: "#666851" }} className="text-xs font-bold whitespace-nowrap">
            Stock:
          </span>
          <div className="flex items-center gap-1.5">
            {(["All", "In Stock", "Out of Stock"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setStockFilter(opt)}
                style={{
                  backgroundColor:
                    stockFilter === opt
                      ? opt === "In Stock"
                        ? "#E2DCBE"
                        : opt === "Out of Stock"
                        ? "rgba(184,50,69,0.12)"
                        : "#4F5535"
                      : "#F5F3E9",
                  color:
                    stockFilter === opt
                      ? opt === "In Stock"
                        ? "#4F5535"
                        : opt === "Out of Stock"
                        ? "#B83245"
                        : "#FFFFFF"
                      : "#666851",
                  borderColor:
                    stockFilter === opt
                      ? opt === "In Stock"
                        ? "#9F905E"
                        : opt === "Out of Stock"
                        ? "#B83245"
                        : "#4F5535"
                      : "#E2DCBE",
                }}
                className="px-3 py-1.5 rounded-xl text-[11px] font-extrabold border transition whitespace-nowrap"
              >
                {opt}
              </button>
            ))}
          </div>

          <span style={{ color: "#9F905E" }} className="text-[10px] font-bold whitespace-nowrap">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}
        className="border rounded-2xl overflow-hidden shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                className="border-b text-[11px] font-bold uppercase"
              >
                <th className="py-3 px-4">Flower Info</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Badges</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody style={{ borderColor: "#E2DCBE" }} className="divide-y text-xs">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Flower2 style={{ color: "#B68F38" }} className="w-8 h-8 animate-spin" />
                      <span style={{ color: "#666851" }} className="font-bold">Loading flower catalog...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Flower2 style={{ color: "#9F905E" }} className="w-8 h-8" />
                      <span style={{ color: "#666851" }} className="font-bold">No flowers found matching your filters.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((flw) => (
                  <tr key={flw._id} className="hover:bg-[#F5F3E9]/50 transition group">
                    {/* Flower Info: Image + Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={flw.image || flw.images?.[0] || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=150"}
                          alt={flw.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#E2DCBE] shadow-sm"
                        />
                        <div>
                          <div style={{ color: "#4F5535" }} className="font-extrabold text-sm group-hover:text-[#B68F38] transition">
                            {flw.name}
                          </div>
                          <div style={{ color: "#9F905E" }} className="text-[10px] font-medium">
                            {flw.color} · {flw.unit}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span
                        style={{ backgroundColor: "#F5F3E9", color: "#4F5535", borderColor: "#E2DCBE" }}
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold border"
                      >
                        {flw.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td style={{ color: "#4F5535" }} className="py-3 px-4">
                      <div className="font-extrabold text-sm">₹{flw.discountPrice || flw.price}</div>
                      {flw.discountPrice && flw.discountPrice < flw.price && (
                        <span style={{ color: "#9F905E" }} className="text-[10px] line-through">
                          ₹{flw.price}
                        </span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col items-start gap-1">
                        {/* Stock qty indicator */}
                        <span
                          style={{
                            backgroundColor:
                              flw.stockQuantity <= 10
                                ? "rgba(220, 38, 38, 0.1)"
                                : flw.stockQuantity <= 30
                                ? "rgba(182, 143, 56, 0.15)"
                                : "rgba(79, 85, 53, 0.1)",
                            color:
                              flw.stockQuantity <= 10
                                ? "#dc2626"
                                : flw.stockQuantity <= 30
                                ? "#B68F38"
                                : "#4F5535",
                            borderColor: "#E2DCBE",
                          }}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
                        >
                          {flw.stockQuantity} {flw.unit}
                        </span>
                        {/* In Stock / Out of Stock toggle */}
                        <button
                          onClick={() => handleToggleStock(flw._id)}
                          title="Click to toggle stock availability"
                          style={{
                            backgroundColor:
                              flw.available && flw.stockQuantity > 0
                                ? "#E2DCBE"
                                : "rgba(184,50,69,0.12)",
                            color:
                              flw.available && flw.stockQuantity > 0
                                ? "#4F5535"
                                : "#B83245",
                            borderColor:
                              flw.available && flw.stockQuantity > 0
                                ? "#9F905E"
                                : "#B83245",
                          }}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border transition hover:opacity-80 flex items-center gap-1"
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              backgroundColor:
                                flw.available && flw.stockQuantity > 0 ? "#4F5535" : "#B83245",
                              display: "inline-block",
                              flexShrink: 0,
                            }}
                          />
                          {flw.available && flw.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
                        </button>
                      </div>
                    </td>

                    {/* Badges */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {flw.isFeatured && (
                          <span
                            style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
                            className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                          >
                            Featured
                          </span>
                        )}
                        {flw.isBestSeller && (
                          <span
                            style={{ backgroundColor: "#B68F38", color: "#FFFFFF" }}
                            className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                          >
                            Best Seller
                          </span>
                        )}
                        {flw.isTrending && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-700">
                            Trending
                          </span>
                        )}
                        {!flw.isFeatured && !flw.isBestSeller && !flw.isTrending && (
                          <span style={{ color: "#9F905E" }} className="text-[10px]">—</span>
                        )}
                      </div>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(flw._id)}
                        style={{
                          backgroundColor:
                            flw.status === "published" ? "rgba(22, 163, 74, 0.12)" : "#E9E7DF",
                          color: flw.status === "published" ? "#16a34a" : "#666851",
                          borderColor: flw.status === "published" ? "rgba(22, 163, 74, 0.3)" : "#E2DCBE",
                        }}
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border transition hover:opacity-80"
                      >
                        {flw.status === "published" ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        <span className="capitalize">{flw.status}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingProductId(flw.slug || flw._id)}
                          title="View Product Details Page"
                          style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:opacity-90 transition shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                        <button
                          onClick={() => handleDuplicate(flw)}
                          title="Duplicate Flower"
                          style={{ backgroundColor: "#F5F3E9", color: "#4F5535" }}
                          className="p-1.5 rounded-lg border border-[#E2DCBE] hover:opacity-80 transition"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenModal(flw)}
                          title="Edit Flower"
                          style={{ backgroundColor: "#B68F38", color: "#FFFFFF" }}
                          className="p-1.5 rounded-lg hover:opacity-90 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(flw._id)}
                          title="Delete Flower"
                          style={{ backgroundColor: "#F5F3E9", color: "#b91c1c" }}
                          className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-600 hover:text-white transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}
            className="border rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 style={{ color: "#4F5535" }} className="text-base font-extrabold mb-1">
              Delete this flower?
            </h3>
            <p style={{ color: "#666851" }} className="text-xs mb-5">
              This action cannot be undone. The flower will be removed from your catalog.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{ color: "#666851" }}
                className="px-4 py-2 rounded-xl font-bold text-xs hover:text-[#4F5535]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-5 py-2 rounded-xl font-bold text-xs bg-red-600 text-white shadow hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Flower Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
          <div
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE", color: "#4F5535" }}
            className="border rounded-3xl p-6 w-full max-w-3xl my-8 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
          >
            {/* Modal Header */}
            <div
              style={{ borderColor: "#E2DCBE" }}
              className="flex items-center justify-between pb-4 border-b mb-5"
            >
              <h3 style={{ color: "#4F5535" }} className="text-lg font-extrabold flex items-center gap-2">
                <Sparkles style={{ color: "#B68F38" }} className="w-5 h-5" />
                {editingProduct ? "Edit Flower Details" : "Add New Flower Product"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-[#4F5535] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              {/* Row 1: Name + Scientific Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    Flower Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Yellow Dutch Marigold"
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  />
                </div>
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    Scientific Name
                  </label>
                  <input
                    type="text"
                    value={formData.scientificName}
                    onChange={(e) =>
                      setFormData({ ...formData, scientificName: e.target.value })
                    }
                    placeholder="e.g. Tagetes erecta"
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  />
                </div>
              </div>

              {/* Row 2: Category + Color + Season + Unit */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="Yellow / Red / White"
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  />
                </div>
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    Season
                  </label>
                  <select
                    value={formData.season}
                    onChange={(e) =>
                      setFormData({ ...formData, season: e.target.value })
                    }
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  >
                    <option value="All Season">All Season</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Monsoon">Monsoon</option>
                    <option value="Winter">Winter</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    Unit
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  >
                    <option value="per Kg">per Kg</option>
                    <option value="per Piece">per Piece</option>
                    <option value="per Garland">per Garland</option>
                    <option value="per Bundle">per Bundle</option>
                    <option value="per Basket">per Basket</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Pricing + Stock */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    Regular Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  />
                </div>
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    Discount Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.discountPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, discountPrice: Number(e.target.value) })
                    }
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  />
                </div>
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stockQuantity: Number(e.target.value),
                      })
                    }
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  />
                </div>
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    Min Order Qty
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.minOrderQuantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        minOrderQuantity: Number(e.target.value),
                      })
                    }
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  />
                </div>
              </div>

              {/* Row 4: Description */}
              <div>
                <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value, shortDescription: e.target.value })
                  }
                  placeholder="Describe the flower — fragrance, freshness, ideal uses..."
                  style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                  className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium resize-none"
                />
              </div>

              {/* Row 5: Image URL + Upload */}
              <div>
                <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                  <ImageIcon className="w-3.5 h-3.5 inline mr-1" style={{ color: "#B68F38" }} />
                  Product Image
                </label>
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Paste image URL (Cloudinary, Unsplash, etc.)"
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="flex-1 border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  />
                </div>

                {/* Image preview gallery */}
                {(formData.image || formData.images.length > 0) && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[formData.image, ...formData.images.filter((i: string) => i !== formData.image)]
                      .filter(Boolean)
                      .filter((val: string, idx: number, arr: string[]) => arr.indexOf(val) === idx)
                      .map((img: string, idx: number) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt={`Product ${idx}`}
                            className="w-16 h-16 rounded-xl object-cover border border-[#E2DCBE] shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                  </div>
                )}

                {/* Drag & Drop upload area */}
                <div
                  style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE" }}
                  className="border-2 border-dashed rounded-2xl p-4 text-center hover:border-[#B68F38] transition"
                >
                  <UploadCloud style={{ color: "#B68F38" }} className="w-7 h-7 mx-auto mb-1" />
                  <p style={{ color: "#4F5535" }} className="font-bold text-[11px]">
                    Drag & drop flower images or browse file
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="fileUploadAdmin"
                  />
                  <label
                    htmlFor="fileUploadAdmin"
                    style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
                    className="mt-2 inline-block px-3 py-1.5 rounded-lg cursor-pointer font-bold text-[11px] hover:opacity-90 transition"
                  >
                    Browse Local File
                  </label>
                </div>
              </div>

              {/* Row 6: Badges + Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-2">
                    Badges
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { key: "isFeatured", label: "Featured" },
                      { key: "isBestSeller", label: "Best Seller" },
                      { key: "isTrending", label: "Trending" },
                    ].map((badge) => (
                      <label
                        key={badge.key}
                        className="flex items-center gap-1.5 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={(formData as any)[badge.key]}
                          onChange={(e) =>
                            setFormData({ ...formData, [badge.key]: e.target.checked })
                          }
                          className="w-3.5 h-3.5 accent-[#B68F38]"
                        />
                        <span style={{ color: "#4F5535" }} className="font-medium">
                          {badge.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    <Tag className="w-3.5 h-3.5 inline mr-1" style={{ color: "#B68F38" }} />
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="puja, wedding, fresh, garland"
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  />
                </div>
              </div>

              {/* Row 7: Freshness + Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    Freshness
                  </label>
                  <select
                    value={formData.freshness}
                    onChange={(e) =>
                      setFormData({ ...formData, freshness: e.target.value })
                    }
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  >
                    <option value="Same-day harvest">Same-day harvest</option>
                    <option value="Cold-chain fresh">Cold-chain fresh</option>
                    <option value="24hr fresh">24hr fresh</option>
                    <option value="Dawn Plucked 100% Fresh">Dawn Plucked 100% Fresh</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: "#4F5535" }} className="block font-bold mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "published" | "draft",
                      })
                    }
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-[#B68F38] font-medium"
                  >
                    <option value="published">Published (Visible on Shop)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{ borderColor: "#E2DCBE" }}
                className="flex justify-end gap-3 pt-4 border-t"
              >
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-[#666851] hover:text-[#4F5535] font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
                  className="px-6 py-2.5 rounded-xl font-bold shadow hover:opacity-90 transition border border-[#9F905E] flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {editingProduct ? "Save Changes" : "Add Flower Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
