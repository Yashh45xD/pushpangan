import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";

const mockWishlist = [
  { _id: "w1", name: "Yellow Dutch Marigold Bunch", price: 149, originalPrice: 199, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200", inStock: true },
  { _id: "w2", name: "Pink Chrysanthemums", price: 299, originalPrice: 349, image: "https://images.unsplash.com/photo-1490750967868-88df5691cc99?w=200", inStock: true },
  { _id: "w3", name: "Red Roses Premium", price: 499, originalPrice: 599, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200", inStock: false },
  { _id: "w4", name: "White Lilies Bouquet", price: 399, originalPrice: 449, image: "https://images.unsplash.com/photo-1490750967868-88df5691cc99?w=200", inStock: true },
];

export function WishlistSection() {
  const [items, setItems] = useState(mockWishlist);
  const remove = (id: string) => setItems(i => i.filter(x => x._id !== id));

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
        <div>
          <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>My Wishlist</h2>
          <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>{items.length} saved items</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center py-14 text-center">
          <Heart size={40} style={{ color: "#B68F38", opacity: 0.3, margin: "0 auto 12px" }} />
          <p className="text-sm font-medium" style={{ color: "#666851" }}>Your wishlist is empty</p>
          <a href="/shop" className="mt-3 rounded-full px-4 py-2 text-xs font-bold text-white" style={{ backgroundColor: "#4F5535" }}>🌸 Browse Flowers</a>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
          {items.map(item => (
            <div key={item._id} className="group relative rounded-2xl border overflow-hidden transition hover:shadow-md" style={{ borderColor: "#E2DCBE" }}>
              <div className="relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover transition group-hover:scale-105" />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-gray-700">Out of Stock</span>
                  </div>
                )}
                <button
                  onClick={() => remove(item._id)}
                  className="absolute right-2 top-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition hover:bg-rose-50"
                >
                  <Trash2 size={12} className="text-rose-500" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold line-clamp-2" style={{ color: "#333" }}>{item.name}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-sm font-black" style={{ color: "#4F5535" }}>₹{item.price}</span>
                  <span className="text-[11px] line-through" style={{ color: "#aaa" }}>₹{item.originalPrice}</span>
                </div>
                <button
                  disabled={!item.inStock}
                  className="mt-2 w-full flex items-center justify-center gap-1 rounded-xl py-1.5 text-[11px] font-bold transition hover:opacity-90 disabled:opacity-40"
                  style={{ backgroundColor: "#4F5535", color: "#fff" }}
                >
                  <ShoppingCart size={11} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
