import { Star } from "lucide-react";

const reviews = [
  { product: "Yellow Dutch Marigold Bunch", rating: 5, comment: "Absolutely fresh and vibrant! Delivered on time.", date: "28 Jul 2026", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60" },
  { product: "Pink Chrysanthemums", rating: 4, comment: "Beautiful flowers, very well packed. A little bit wilted at tips.", date: "20 Jul 2026", image: "https://images.unsplash.com/photo-1490750967868-88df5691cc99?w=60" },
];

export function ReviewsSection() {
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
      <div className="px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
        <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>My Reviews</h2>
        <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>{reviews.length} reviews submitted</p>
      </div>
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center py-12 text-center">
          <Star size={36} style={{ color: "#B68F38", opacity: 0.3 }} />
          <p className="mt-3 text-sm" style={{ color: "#9F905E" }}>No reviews yet</p>
        </div>
      ) : (
        <div className="divide-y p-4 space-y-3" style={{ borderColor: "#F0EFE6" }}>
          {reviews.map((r, i) => (
            <div key={i} className="flex gap-4 py-3">
              <img src={r.image} alt={r.product} className="w-14 h-14 rounded-xl object-cover border" style={{ borderColor: "#E2DCBE" }} />
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: "#4F5535" }}>{r.product}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={12} fill={s <= r.rating ? "#B68F38" : "none"} style={{ color: "#B68F38" }} />
                  ))}
                </div>
                <p className="text-xs mt-1" style={{ color: "#555" }}>{r.comment}</p>
                <p className="text-[11px] mt-1" style={{ color: "#9F905E" }}>{r.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
