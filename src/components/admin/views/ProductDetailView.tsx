import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { productService, type DbProduct } from "../../../services/productService";
import { FLOWERS, findFlower, type Flower } from "../../../lib/flowers";
import { useCart } from "../../../lib/CartContext";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  Check,
  Edit,
  Trash2,
  ArrowLeft,
  Eye,
  Plus,
  Minus,
  X,
  Sparkles,
  Tag,
  AlertCircle,
  RefreshCw,
  ZoomIn,
  ChevronRight,
  Store,
  MessageSquare,
  Award,
  ThumbsUp,
  Copy,
  ExternalLink,
  Package,
  Layers,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Percent,
  Gift,
  Building2,
  Search,
  Bell,
  Flower2,
} from "lucide-react";

interface ProductDetailViewProps {
  productId?: string;
  onBack?: () => void;
  onEdit?: (product: any) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  productId = "orange-marigold",
  onBack,
  onEdit,
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"about" | "specs" | "reviews">("about");
  const [addedToast, setAddedToast] = useState(false);

  // Admin Quick Action Modals
  const [showStockModal, setShowStockModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [newStock, setNewStock] = useState<number>(100);
  const [newPrice, setNewPrice] = useState<number>(199);
  const [newDiscountPrice, setNewDiscountPrice] = useState<number>(149);
  const [showWriteReview, setShowWriteReview] = useState(false);

  // New Review Form State
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  // Mock Customer Reviews (Persistent in localStorage per product)
  const [reviews, setReviews] = useState<any[]>([
    {
      id: "rev-1",
      name: "Priyamvada Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      rating: 5,
      date: "Yesterday",
      verified: true,
      text: "Extremely fresh marigold flowers! Delivered at 6 AM right before our pooja. Vibrant color and wonderful fragrance. Highly recommended!",
    },
    {
      id: "rev-2",
      name: "Rajesh Deshmukh",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      rating: 5,
      date: "3 days ago",
      verified: true,
      text: "Ordered 10 kg in bulk for wedding decoration. All flowers were intact, fresh and petal count was fantastic. Excellent packaging.",
    },
    {
      id: "rev-3",
      name: "Snehal Patil",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      rating: 4,
      date: "1 week ago",
      verified: true,
      text: "Very fresh blooms. Delivered on time in Navi Mumbai. Will order lotus and mogra next week for Ganesh festival.",
    },
  ]);

  // Load Product Data
  const loadProductData = async () => {
    setLoading(true);
    try {
      // 1. Check localStorage pushpangan_admin_products
      const savedAdmin = localStorage.getItem("pushpangan_admin_products");
      let found: any = null;

      if (savedAdmin) {
        const parsed = JSON.parse(savedAdmin);
        found = parsed.find(
          (p: any) =>
            p._id === productId ||
            p.slug === productId ||
            p.id === productId ||
            p.name.toLowerCase().includes(productId.toLowerCase())
        );
      }

      // 2. Fallback to productService or default catalog
      if (!found) {
        const dbProd = await productService.getProductBySlug(productId);
        if (dbProd) {
          found = {
            _id: dbProd._id || dbProd.slug,
            name: dbProd.name,
            slug: dbProd.slug,
            category: typeof dbProd.category === "object" ? (dbProd.category as any).name : dbProd.category,
            color: dbProd.color || "Orange",
            price: dbProd.price,
            discountPrice: dbProd.discount_price || Math.round(dbProd.price * 0.8),
            stockQuantity: dbProd.stock_quantity || 100,
            unit: dbProd.unit || "kg",
            image: dbProd.image,
            images: dbProd.images && dbProd.images.length > 0 ? dbProd.images : [dbProd.image],
            description: dbProd.short_description || dbProd.long_description || "",
            shortDescription: dbProd.short_description || "",
            scientificName: dbProd.botanical_name || "",
            occasions: ["Festival", "Wedding", "Pooja", "Temple"],
            freshness: "Dawn Plucked 100% Fresh",
            season: "All Season",
            isFeatured: dbProd.featured,
            status: "published",
            minOrderQuantity: 1,
            available: dbProd.availability,
            vendorName: "Pushpangan Fresh Farms",
            vendorLocation: "Pune / Navi Mumbai",
            rating: 4.8,
            reviewCount: 124,
          };
        }
      }

      // 3. Fallback to FLOWERS.ts static list if still null
      if (!found) {
        const staticFlw = findFlower(productId) || FLOWERS[0];
        found = {
          _id: staticFlw.slug,
          name: staticFlw.name,
          slug: staticFlw.slug,
          category: staticFlw.category,
          color: staticFlw.color,
          price: Math.round(staticFlw.price * 1.25),
          discountPrice: staticFlw.price,
          stockQuantity: 100,
          unit: staticFlw.unit.replace("per ", ""),
          image: staticFlw.image,
          images: [
            staticFlw.image,
            "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709569/6cd676ac-edb2-44f6-8d88-d472354c11ec.png",
            "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png",
            "https://res.cloudinary.com/r1o7fosa/image/upload/v1784737646/3cb09d52-4e7a-4425-9451-dc103c77bb5f.png",
          ],
          description: staticFlw.description,
          shortDescription: staticFlw.description,
          scientificName: "Tagetes erecta",
          occasions: staticFlw.occasions,
          freshness: staticFlw.freshness,
          season: "All Season",
          isFeatured: true,
          status: "published",
          minOrderQuantity: 1,
          available: staticFlw.available,
          vendorName: "Pushpangan Fresh Farms",
          vendorLocation: "Pune & Mumbai Mandi Direct",
          rating: 4.8,
          reviewCount: 124,
        };
      }

      // Ensure gallery images array is non-empty
      if (!found.images || found.images.length === 0) {
        found.images = [found.image];
      }
      if (!found.images.includes(found.image)) {
        found.images.unshift(found.image);
      }

      setProduct(found);
      setSelectedImage(found.image || found.images[0]);
      setNewStock(found.stockQuantity || 100);
      setNewPrice(found.price || 249);
      setNewDiscountPrice(found.discountPrice || 199);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductData();
  }, [productId]);

  // Helper to persist product changes to localStorage
  const updateProductInStorage = (updatedFields: Partial<any>) => {
    if (!product) return;
    const newProductState = { ...product, ...updatedFields };
    setProduct(newProductState);

    try {
      const savedAdmin = localStorage.getItem("pushpangan_admin_products");
      let list: any[] = savedAdmin ? JSON.parse(savedAdmin) : [];
      const idx = list.findIndex((p: any) => p._id === product._id || p.slug === product.slug);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...updatedFields };
      } else {
        list.unshift(newProductState);
      }
      localStorage.setItem("pushpangan_admin_products", JSON.stringify(list));

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("pushpangan_products_updated"));
      }
    } catch (e) {
      console.error("Failed to save product update:", e);
    }
  };

  // Toggle Featured status
  const handleToggleFeatured = () => {
    const nextState = !product.isFeatured;
    updateProductInStorage({ isFeatured: nextState });
  };

  // Toggle Published/Draft status
  const handleToggleStatus = () => {
    const nextStatus = product.status === "published" ? "draft" : "published";
    updateProductInStorage({ status: nextStatus, available: nextStatus === "published" });
  };

  // Save updated stock
  const handleSaveStock = () => {
    updateProductInStorage({ stockQuantity: newStock, available: newStock > 0 });
    setShowStockModal(false);
  };

  // Save updated price
  const handleSavePrice = () => {
    updateProductInStorage({ price: newPrice, discountPrice: newDiscountPrice });
    setShowPriceModal(false);
  };

  // Delete product
  const handleDeleteProduct = () => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;
    try {
      const savedAdmin = localStorage.getItem("pushpangan_admin_products");
      if (savedAdmin) {
        const list = JSON.parse(savedAdmin).filter(
          (p: any) => p._id !== product._id && p.slug !== product.slug
        );
        localStorage.setItem("pushpangan_admin_products", JSON.stringify(list));
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("pushpangan_products_updated"));
      }
    } catch {}
    if (onBack) onBack();
    else navigate({ to: "/admin" });
  };

  // Add to Cart handler
  const handleAddToCart = () => {
    if (!product) return;
    const flowerObj: Flower = {
      slug: product.slug,
      name: product.name,
      category: product.category,
      color: product.color || "Orange",
      price: product.discountPrice || product.price,
      unit: product.unit.startsWith("per") ? product.unit : (`per ${product.unit}` as any),
      available: product.available,
      image: product.image,
      description: product.description,
      occasions: product.occasions || ["Festival", "Wedding"],
      freshness: product.freshness || "Dawn Plucked 100% Fresh",
    };
    addToCart(flowerObj, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  // Submit Review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) return;

    const newRev = {
      id: "rev-" + Date.now(),
      name: reviewForm.name,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      rating: Number(reviewForm.rating),
      date: "Just now",
      verified: true,
      text: reviewForm.comment,
    };

    setReviews([newRev, ...reviews]);
    setReviewForm({ name: "", rating: 5, comment: "" });
    setShowWriteReview(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3E9] flex flex-col items-center justify-center p-8 text-[#4F5535]">
        <Flower2 className="w-10 h-10 animate-spin text-[#B68F38] mb-3" />
        <p className="font-extrabold text-sm">Loading Product Details from Database...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F3E9] p-8 text-center text-[#4F5535]">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <button
          onClick={() => (onBack ? onBack() : navigate({ to: "/admin" }))}
          className="mt-4 px-4 py-2 bg-[#4F5535] text-white rounded-xl font-bold text-xs"
        >
          Return to Admin Catalog
        </button>
      </div>
    );
  }

  const currentPrice = product.discountPrice || product.price;
  const originalPrice = product.price;
  const discountPercent =
    originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  // Related products list
  const relatedProducts = FLOWERS.filter((f) => f.slug !== product.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F5F3E9] text-[#4F5535] font-sans pb-24">
      {/* Toast Notification */}
      {addedToast && (
        <div
          style={{ backgroundColor: "#B83245", color: "#FFFFFF" }}
          className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce"
        >
          <CheckCircle2 className="w-4 h-4 text-white" />
          Added {quantity} {product.unit} of "{product.name}" to cart!
        </div>
      )}

      {/* ADMIN CONTROL TOOLBAR (Top Bar) */}
      <div
        style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
        className="sticky top-0 z-40 px-4 py-3 shadow-md flex flex-wrap items-center justify-between gap-3 border-b border-[#9F905E]"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => (onBack ? onBack() : navigate({ to: "/admin" }))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs font-extrabold text-[#E2DCBE]">
            <Sparkles className="w-4 h-4 text-[#B68F38]" />
            <span>Admin Live Product Console</span>
          </div>
        </div>

        {/* Action Buttons in Admin Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Edit Product */}
          <button
            onClick={() => (onEdit ? onEdit(product) : null)}
            className="px-3 py-1.5 rounded-xl bg-[#B68F38] text-white hover:opacity-90 font-bold text-xs flex items-center gap-1.5 shadow-xs transition"
          >
            <Edit className="w-3.5 h-3.5" /> Edit Product
          </button>

          {/* Change Price */}
          <button
            onClick={() => setShowPriceModal(true)}
            className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Percent className="w-3.5 h-3.5 text-[#E2DCBE]" /> Change Price
          </button>

          {/* Update Stock */}
          <button
            onClick={() => setShowStockModal(true)}
            className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Package className="w-3.5 h-3.5 text-[#E2DCBE]" /> Update Stock ({product.stockQuantity})
          </button>

          {/* Featured Toggle */}
          <button
            onClick={handleToggleFeatured}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
              product.isFeatured
                ? "bg-amber-500 text-white shadow-xs"
                : "bg-white/15 hover:bg-white/25 text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {product.isFeatured ? "Featured ★" : "Make Featured"}
          </button>

          {/* Published / Draft Toggle */}
          <button
            onClick={handleToggleStatus}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
              product.status === "published"
                ? "bg-emerald-600 text-white"
                : "bg-slate-600 text-slate-200"
            }`}
          >
            {product.status === "published" ? <Eye className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {product.status === "published" ? "Published" : "Draft"}
          </button>

          {/* View Customer Page */}
          <Link
            to="/flowers/$slug"
            params={{ slug: product.slug }}
            target="_blank"
            className="px-3 py-1.5 rounded-xl bg-[#B83245] text-white font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Customer View
          </Link>

          {/* Delete Product */}
          <button
            onClick={handleDeleteProduct}
            className="p-1.5 rounded-xl bg-rose-600/30 hover:bg-rose-600 text-rose-100 hover:text-white transition"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 space-y-6">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-[#666851]">
          <Link to="/" className="hover:text-[#B68F38] transition">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#9F905E]" />
          <Link to="/shop" className="hover:text-[#B68F38] transition">Flowers</Link>
          <ChevronRight className="w-3 h-3 text-[#9F905E]" />
          <span className="hover:text-[#B68F38] cursor-pointer">{product.category}</span>
          <ChevronRight className="w-3 h-3 text-[#9F905E]" />
          <span className="text-[#4F5535] font-extrabold">{product.name}</span>
        </nav>

        {/* TOP SECTION: TWO COLUMNS (Left: Image Gallery, Right: Product Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDE — Product Images Gallery (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Image Box */}
            <div
              className="relative bg-white rounded-3xl border border-[#E2DCBE] p-4 shadow-sm group overflow-hidden cursor-zoom-in"
              onClick={() => setShowLightbox(true)}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <div className="aspect-square w-full rounded-2xl overflow-hidden relative flex items-center justify-center bg-white">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                    isZoomed ? "scale-125" : "scale-100"
                  }`}
                />
              </div>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-1.5 z-10">
                {discountPercent > 0 && (
                  <span
                    style={{ backgroundColor: "#B83245", color: "#FFFFFF" }}
                    className="px-3 py-1 rounded-full text-xs font-black shadow-md tracking-wider uppercase"
                  >
                    {discountPercent}% OFF
                  </span>
                )}
                {product.isFeatured && (
                  <span
                    style={{ backgroundColor: "#B68F38", color: "#FFFFFF" }}
                    className="px-3 py-1 rounded-full text-xs font-black shadow-md uppercase tracking-wider"
                  >
                    Featured ★
                  </span>
                )}
              </div>

              {/* Click hint */}
              <div className="absolute bottom-6 right-6 bg-slate-900/60 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <ZoomIn className="w-3.5 h-3.5 text-[#E2DCBE]" />
                Click to view full image
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Product Information (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Title & Ratings */}
            <div className="space-y-2 border-b border-[#E2DCBE] pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#E2DCBE]/60 text-[#4F5535] text-[11px] font-extrabold uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-xs text-[#9F905E] font-semibold">SKU: {product.slug?.toUpperCase()}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#4F5535] tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Rating & Reviews Bar */}
              <div className="flex items-center gap-4 text-xs">
                <a href="#reviews" className="flex items-center gap-1 font-black text-[#B68F38] hover:underline">
                  <span className="bg-[#B68F38] text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                    ★ {product.rating || 4.8}
                  </span>
                </a>
                <span className="text-[#666851] font-semibold">•</span>
                <a href="#reviews" className="text-[#4F5535] font-extrabold hover:underline">
                  {reviews.length || product.reviewCount || 124} Verified Customer Reviews
                </a>
                <span className="text-[#666851] font-semibold">•</span>
                <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Dawn Plucked Fresh
                </span>
              </div>

              {/* Short Description */}
              <p className="text-xs text-[#4F5535]/90 leading-relaxed pt-1">
                {product.description || "Fresh, vibrant, dawn-harvested flowers direct from local growers. Ideal for garlands, temple poojas, grand wedding decor, and festive celebrations."}
              </p>
            </div>

            {/* Price Card Section */}
            <div className="bg-white rounded-3xl border border-[#E2DCBE] p-5 shadow-xs space-y-3">
              <div className="flex items-baseline gap-3">
                <span
                  style={{ color: "#B83245" }}
                  className="text-3xl font-black tracking-tight"
                >
                  ₹{currentPrice}
                </span>
                <span className="text-xs text-[#666851] font-bold">/ {product.unit}</span>

                {originalPrice > currentPrice && (
                  <>
                    <span className="text-sm text-[#9F905E] line-through font-bold">
                      ₹{originalPrice}
                    </span>
                    <span
                      style={{ backgroundColor: "rgba(184, 50, 69, 0.1)", color: "#B83245" }}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border border-rose-200"
                    >
                      Save ₹{originalPrice - currentPrice} ({discountPercent}% OFF)
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-[#666851] font-medium">
                Inclusive of all taxes. Free shipping on orders above ₹999.
              </p>

              {/* Quantity Selector + Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center justify-between border-2 border-[#E2DCBE] bg-[#F5F3E9] rounded-2xl px-3 py-1.5 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-[#4F5535] hover:text-[#B83245] font-black transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-extrabold text-sm px-4 min-w-[60px] text-center">
                    {quantity} {product.unit}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-[#4F5535] hover:text-[#B83245] font-black transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  style={{ backgroundColor: "#B83245", color: "#FFFFFF" }}
                  className="flex-1 px-6 py-3 rounded-2xl font-extrabold text-xs shadow-md hover:opacity-95 transition flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>

                {/* Buy Now Button */}
                <button
                  onClick={() => {
                    handleAddToCart();
                    navigate({ to: "/checkout" });
                  }}
                  style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
                  className="flex-1 px-6 py-3 rounded-2xl font-extrabold text-xs shadow-md hover:opacity-90 transition flex items-center justify-center gap-2 transform active:scale-95 border border-[#9F905E]"
                >
                  Buy Now →
                </button>
              </div>
            </div>

            {/* Important Product Quick Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white rounded-2xl p-3 border border-[#E2DCBE]">
                <div className="text-[10px] text-[#9F905E] font-bold uppercase">Color</div>
                <div className="font-extrabold text-[#4F5535] mt-0.5">{product.color || "Orange"}</div>
              </div>
              <div className="bg-[#F5F3E9] rounded-2xl p-3 border border-[#E2DCBE]">
                <div className="text-[10px] text-[#9F905E] font-bold uppercase">Stock</div>
                <div
                  style={{ backgroundColor: "#E2DCBE", color: "#4F5535", borderColor: "#9F905E" }}
                  className="font-extrabold mt-0.5 inline-block px-2.5 py-0.5 rounded-full text-xs border"
                >
                  {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} ${product.unit})` : "Out of Stock"}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-3 border border-[#E2DCBE]">
                <div className="text-[10px] text-[#9F905E] font-bold uppercase">Min Order</div>
                <div className="font-extrabold text-[#4F5535] mt-0.5">{product.minOrderQuantity || 1} {product.unit}</div>
              </div>
              <div className="bg-white rounded-2xl p-3 border border-[#E2DCBE]">
                <div className="text-[10px] text-[#9F905E] font-bold uppercase">Freshness</div>
                <div className="font-extrabold text-[#4F5535] mt-0.5">{product.freshness || "Same-day harvest"}</div>
              </div>
            </div>

            {/* Delivery & Availability Card */}
            <div className="bg-white rounded-3xl border border-[#E2DCBE] p-4 space-y-3 shadow-xs">
              <div className="font-extrabold text-xs text-[#4F5535] flex items-center gap-2 border-b border-[#E2DCBE] pb-2">
                <Truck className="w-4 h-4 text-[#B68F38]" /> Delivery & Availability Information
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#4F5535]">Delivery Available</div>
                    <div className="text-[11px] text-[#666851]">Same-day express delivery in Mumbai & Pune</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#B68F38] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#4F5535]">Expected Delivery</div>
                    <div className="text-[11px] text-[#666851]">Tomorrow by 7:00 AM</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#B83245] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#4F5535]">Delivering To</div>
                    <div className="text-[11px] text-[#666851]">Mumbai, Navi Mumbai, Thane & Pune</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Gift className="w-4 h-4 text-[#B68F38] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#4F5535]">Free Delivery</div>
                    <div className="text-[11px] text-[#666851]">On all flower orders above ₹999</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Information Card */}
            <div className="bg-white rounded-3xl border border-[#E2DCBE] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#4F5535] text-white font-black flex items-center justify-center text-lg shadow-sm border border-[#9F905E]">
                  P
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#9F905E] uppercase tracking-wider">Sold & Fulfilled By</div>
                  <div className="font-extrabold text-sm text-[#4F5535] flex items-center gap-1.5">
                    {product.vendorName || "Pushpangan Fresh Farms"}
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                      ✓ Verified Seller
                    </span>
                  </div>
                  <div className="text-[11px] text-[#666851] font-medium mt-0.5">
                    📍 {product.vendorLocation || "Pune & Mumbai Mandi Growers Hub"} · ★ 4.9 Seller Rating
                  </div>
                </div>
              </div>

              <Link
                to="/shop"
                className="px-4 py-2 rounded-xl border-2 border-[#E2DCBE] hover:bg-[#F5F3E9] text-xs font-bold text-[#4F5535] text-center shrink-0 transition"
              >
                View Seller Profile
              </Link>
            </div>

            {/* Offers Section */}
            <div className="space-y-2">
              <div className="font-extrabold text-xs text-[#4F5535] flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-[#B83245]" /> Special Offers & Services
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-2xl border border-[#E2DCBE] space-y-1">
                  <div className="font-bold text-[#B83245] flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" /> Bulk Order Offer
                  </div>
                  <p className="text-[11px] text-[#666851]">Get 15% special discount on bulk flower orders above 10 kg.</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-[#E2DCBE] space-y-1">
                  <div className="font-bold text-[#B68F38] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Festival Special
                  </div>
                  <p className="text-[11px] text-[#666851]">Pre-book 10-day daily pooja garlands for Ganesh festival.</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-[#E2DCBE] space-y-1">
                  <div className="font-bold text-emerald-700 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Free Express Shipping
                  </div>
                  <p className="text-[11px] text-[#666851]">Free morning 6 AM delivery on orders above ₹999.</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-[#E2DCBE] space-y-1">
                  <div className="font-bold text-[#4F5535] flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Event Decorators Rate
                  </div>
                  <p className="text-[11px] text-[#666851]">Wholesale rate available for registered wedding decorators.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOWER SECTION TABS: Product Description, Specifications, Reviews */}
        <div id="reviews" className="bg-white rounded-3xl border border-[#E2DCBE] p-6 shadow-sm space-y-6">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#E2DCBE] gap-8 text-sm font-bold">
            <button
              onClick={() => setActiveTab("about")}
              className={`pb-3 transition relative ${
                activeTab === "about"
                  ? "text-[#B83245] border-b-2 border-[#B83245] font-black"
                  : "text-[#666851] hover:text-[#4F5535]"
              }`}
            >
              About This Flower
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 transition relative ${
                activeTab === "specs"
                  ? "text-[#B83245] border-b-2 border-[#B83245] font-black"
                  : "text-[#666851] hover:text-[#4F5535]"
              }`}
            >
              Specifications Table
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 transition relative ${
                activeTab === "reviews"
                  ? "text-[#B83245] border-b-2 border-[#B83245] font-black"
                  : "text-[#666851] hover:text-[#4F5535]"
              }`}
            >
              Customer Reviews ({reviews.length})
            </button>
          </div>

          {/* TAB 1: About This Flower */}
          {activeTab === "about" && (
            <div className="space-y-4 text-xs text-[#4F5535] leading-relaxed">
              <h3 className="text-base font-extrabold text-[#4F5535]">Detailed Product Description</h3>
              <p>
                {product.description || "Our fresh flowers are handpicked at dawn by expert florists from trusted growers across Maharashtra. Each bloom is selected for vibrant petal color, fresh aroma, and long stem durability."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#F5F3E9] p-4 rounded-2xl border border-[#E2DCBE] space-y-1">
                  <h4 className="font-extrabold text-sm text-[#4F5535]">🌸 Quality & Freshness</h4>
                  <p className="text-[11px] text-[#666851]">100% organic, dawn-plucked blooms with zero artificial spray or preservatives.</p>
                </div>
                <div className="bg-[#F5F3E9] p-4 rounded-2xl border border-[#E2DCBE] space-y-1">
                  <h4 className="font-extrabold text-sm text-[#4F5535]">📦 Packaging Information</h4>
                  <p className="text-[11px] text-[#666851]">Ventilated eco-friendly moisture-lock boxes ensuring 48-hour peak freshness.</p>
                </div>
                <div className="bg-[#F5F3E9] p-4 rounded-2xl border border-[#E2DCBE] space-y-1">
                  <h4 className="font-extrabold text-sm text-[#4F5535]">🌿 Storage Instructions</h4>
                  <p className="text-[11px] text-[#666851]">Keep in cool shade or damp cloth. Sprinkle light water mist twice daily.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Specifications Table */}
          {activeTab === "specs" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse border border-[#E2DCBE] rounded-2xl">
                <thead>
                  <tr className="bg-[#F5F3E9] text-[#4F5535] font-extrabold">
                    <th className="py-3 px-4 border-b border-[#E2DCBE] w-1/3">Specification</th>
                    <th className="py-3 px-4 border-b border-[#E2DCBE]">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DCBE] text-[#4F5535]">
                  <tr><td className="py-2.5 px-4 font-bold bg-[#F5F3E9]/40">Product Name</td><td className="py-2.5 px-4">{product.name}</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold bg-[#F5F3E9]/40">Scientific Name</td><td className="py-2.5 px-4 italic">{product.scientificName || "Tagetes erecta"}</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold bg-[#F5F3E9]/40">Category</td><td className="py-2.5 px-4">{product.category}</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold bg-[#F5F3E9]/40">Color</td><td className="py-2.5 px-4">{product.color || "Orange"}</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold bg-[#F5F3E9]/40">Unit</td><td className="py-2.5 px-4">{product.unit}</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold bg-[#F5F3E9]/40">Minimum Order</td><td className="py-2.5 px-4">{product.minOrderQuantity || 1} {product.unit}</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold bg-[#F5F3E9]/40">Current Stock</td><td className="py-2.5 px-4"><span style={{ backgroundColor: "#E2DCBE", color: "#4F5535", borderColor: "#9F905E" }} className="px-2.5 py-0.5 rounded-full text-xs font-extrabold border">In Stock ({product.stockQuantity} {product.unit})</span></td></tr>
                  <tr><td className="py-2.5 px-4 font-bold bg-[#F5F3E9]/40">Freshness Guarantee</td><td className="py-2.5 px-4">{product.freshness || "Dawn Plucked 100% Fresh"}</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold bg-[#F5F3E9]/40">Suitable Occasions</td><td className="py-2.5 px-4">{Array.isArray(product.occasions) ? product.occasions.join(", ") : "Wedding, Temple, Pooja, Festival"}</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold bg-[#F5F3E9]/40">Primary Seller</td><td className="py-2.5 px-4 font-bold text-[#B83245]">{product.vendorName || "Pushpangan Fresh Farms"}</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: Reviews Section */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Review Summary Bar */}
              <div className="bg-[#F5F3E9] p-6 rounded-3xl border border-[#E2DCBE] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="text-3xl font-black text-[#4F5535] flex items-center gap-2">
                    4.8 <span className="text-xl text-[#B68F38]">★★★★★</span>
                  </div>
                  <p className="text-xs text-[#666851] font-semibold mt-1">Based on {reviews.length + 120} verified customer reviews</p>
                </div>

                <button
                  onClick={() => setShowWriteReview(!showWriteReview)}
                  style={{ backgroundColor: "#B83245", color: "#FFFFFF" }}
                  className="px-5 py-2.5 rounded-2xl font-extrabold text-xs shadow hover:opacity-90 transition flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" /> Write a Review
                </button>
              </div>

              {/* Write Review Form */}
              {showWriteReview && (
                <form onSubmit={handleSubmitReview} className="bg-white p-5 rounded-3xl border-2 border-[#B68F38] space-y-4 text-xs shadow-md">
                  <h4 className="font-extrabold text-sm text-[#4F5535]">Submit Your Product Review</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1 text-[#4F5535]">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        placeholder="e.g. Ananya Deshmukh"
                        className="w-full p-2.5 rounded-xl border border-[#E2DCBE] bg-[#F5F3E9] outline-none focus:border-[#B68F38]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1 text-[#4F5535]">Star Rating</label>
                      <select
                        value={reviewForm.rating}
                        onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-[#E2DCBE] bg-[#F5F3E9] outline-none focus:border-[#B68F38] font-bold text-[#B68F38]"
                      >
                        <option value={5}>★★★★★ (5 - Excellent)</option>
                        <option value={4}>★★★★☆ (4 - Very Good)</option>
                        <option value={3}>★★★☆☆ (3 - Average)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold mb-1 text-[#4F5535]">Your Review Comment *</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="Share details about freshness, delivery, packaging..."
                      className="w-full p-2.5 rounded-xl border border-[#E2DCBE] bg-[#F5F3E9] outline-none focus:border-[#B68F38] resize-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowWriteReview(false)}
                      className="px-4 py-2 rounded-xl text-[#666851] font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
                      className="px-5 py-2 rounded-xl font-extrabold text-xs shadow hover:opacity-90"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}

              {/* Individual Review Cards */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl border border-[#E2DCBE] bg-white space-y-2 text-xs shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={rev.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-[#E2DCBE]" />
                        <div>
                          <div className="font-extrabold text-[#4F5535] flex items-center gap-1.5">
                            {rev.name}
                            {rev.verified && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full font-bold">
                                ✓ Verified Buyer
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-[#666851]">{rev.date}</div>
                        </div>
                      </div>
                      <div className="text-[#B68F38] font-black text-sm">
                        {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                      </div>
                    </div>
                    <p className="text-[#4F5535] leading-relaxed pt-1">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RELATED PRODUCTS ("You May Also Like") */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#4F5535] flex items-center gap-2">
              <Flower2 className="w-5 h-5 text-[#B83245]" /> You May Also Like
            </h2>
            <Link to="/shop" className="text-xs font-extrabold text-[#B83245] hover:underline">
              View All Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <div
                key={rel.slug}
                className="bg-white rounded-3xl border border-[#E2DCBE] p-3 space-y-2 shadow-xs hover:shadow-md transition group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-white relative">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-[#B68F38] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    ★ 4.8
                  </span>
                </div>
                <div>
                  <div className="text-[10px] text-[#9F905E] font-bold uppercase">{rel.category}</div>
                  <h3 className="font-extrabold text-xs text-[#4F5535] truncate group-hover:text-[#B83245] transition">
                    {rel.name}
                  </h3>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-black text-sm text-[#B83245]">₹{rel.price}</span>
                    <span className="text-[10px] text-[#666851] font-semibold">{rel.unit}</span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(rel, 1)}
                  style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
                  className="w-full py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 shadow-xs hover:opacity-90 transition"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedImage}
            alt={product.name}
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* ADMIN MODAL: UPDATE STOCK */}
      {showStockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-[#E2DCBE] p-6 w-full max-w-sm shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-[#4F5535]">Update Product Stock</h3>
            <div>
              <label className="block text-xs font-bold text-[#4F5535] mb-1">Available Quantity ({product.unit})</label>
              <input
                type="number"
                min="0"
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[#E2DCBE] bg-[#F5F3E9] text-xs outline-none font-bold text-[#4F5535]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowStockModal(false)}
                className="px-4 py-2 text-xs font-bold text-[#666851]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStock}
                style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
                className="px-5 py-2 rounded-xl text-xs font-extrabold shadow hover:opacity-90"
              >
                Save Stock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN MODAL: CHANGE PRICE */}
      {showPriceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-[#E2DCBE] p-6 w-full max-w-sm shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-[#4F5535]">Update Product Pricing</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#4F5535] mb-1">Regular Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#E2DCBE] bg-[#F5F3E9] outline-none font-bold text-[#4F5535]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#4F5535] mb-1">Selling / Discount Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={newDiscountPrice}
                  onChange={(e) => setNewDiscountPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#E2DCBE] bg-[#F5F3E9] outline-none font-bold text-[#B83245]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowPriceModal(false)}
                className="px-4 py-2 text-xs font-bold text-[#666851]"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrice}
                style={{ backgroundColor: "#B83245", color: "#FFFFFF" }}
                className="px-5 py-2 rounded-xl text-xs font-extrabold shadow hover:opacity-90"
              >
                Save New Price
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
