import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/CartContext";
import { inr, SITE } from "@/lib/site";
import { useState } from "react";

export const Route = createFileRoute("/basket")({
  head: () => ({
    meta: [
      { title: `Your Basket — ${SITE.brand}` },
      { name: "description", content: "Review your flower basket, update quantities, and proceed to checkout." },
    ],
  }),
  component: BasketPage,
});

// ─── Coupon definitions ───────────────────────────────────────────────────────
const COUPONS: Record<string, number> = {
  BAPPA10: 10,   // 10% off
  FRESH50: 50,   // ₹50 flat
  GANPATI: 15,   // 15% off
};

function BasketPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    discountAmount,
    setDiscountAmount,
    grandTotal,
  } = useCart();

  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    if (couponApplied) {
      setCouponMsg({ text: "A coupon is already applied. Remove it first.", ok: false });
      return;
    }
    if (COUPONS[code] !== undefined) {
      const raw = COUPONS[code];
      // % based if ≤ 30, else flat ₹
      const saving = raw <= 30 ? Math.round((totalPrice * raw) / 100) : raw;
      setDiscountAmount(saving);
      setCouponApplied(true);
      setCouponMsg({ text: `✓ Coupon "${code}" applied! You saved ${inr(saving)}.`, ok: true });
    } else {
      setCouponMsg({ text: "Invalid coupon code. Please try again.", ok: false });
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountAmount(0);
    setCouponApplied(false);
    setCoupon("");
    setCouponMsg(null);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="text-8xl mb-6 animate-bounce">🛒</div>
        <h1 className="font-display text-3xl font-extrabold text-primary mb-3">
          Your basket is empty
        </h1>
        <p className="text-foreground/60 max-w-sm mb-8 leading-relaxed">
          You haven't added any flowers yet. Browse our fresh dawn-picked collection and fill your basket!
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl transition hover:brightness-110"
        >
          <span>🌺 Continue Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ── Page Header ── */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary">
              🛒 Your Flower Basket
            </h1>
            <p className="mt-1 text-sm text-foreground/60">
              {totalItems} {totalItems === 1 ? "item" : "items"} · Review and checkout below
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground/80 hover:border-primary transition"
            >
              ← Continue Shopping
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition"
            >
              Clear Basket
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* ── Left: Item List ── */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const subtotal = item.flower.price * item.quantity;
              return (
                <div
                  key={item.flower.slug}
                  className="flex gap-4 rounded-3xl border border-border/60 bg-card p-4 shadow-sm hover:shadow-md transition"
                >
                  {/* Image */}
                  <Link to="/flowers/$slug" params={{ slug: item.flower.slug }}>
                    <div className="shrink-0 h-24 w-24 md:h-28 md:w-28 overflow-hidden rounded-2xl border border-border/40 bg-muted">
                      <img
                        src={item.flower.image}
                        alt={item.flower.name}
                        className="h-full w-full object-cover hover:scale-105 transition duration-300"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to="/flowers/$slug"
                          params={{ slug: item.flower.slug }}
                          className="font-display text-base md:text-lg font-bold text-foreground hover:text-primary transition line-clamp-1"
                        >
                          {item.flower.name}
                        </Link>
                        <div className="mt-0.5 flex items-center gap-2 flex-wrap">
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                            {item.flower.category}
                          </span>
                          <span className="text-xs text-foreground/50">{item.flower.color}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.flower.slug)}
                        aria-label={`Remove ${item.flower.name}`}
                        className="shrink-0 rounded-full p-1.5 text-foreground/40 hover:bg-rose-50 hover:text-rose-500 transition"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Price + Qty + Subtotal */}
                    <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
                      <div className="text-sm text-foreground/60">
                        {inr(item.flower.price)}{" "}
                        <span className="text-xs">/ {item.flower.unit}</span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded-full border border-border bg-background">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.flower.slug, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 rounded-full text-sm font-bold hover:bg-muted disabled:opacity-40 transition flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.flower.slug, item.quantity + 1)}
                          className="h-8 w-8 rounded-full text-sm font-bold hover:bg-muted transition flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-display text-lg font-extrabold text-primary">
                        {inr(subtotal)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="space-y-4">
            {/* Coupon */}
            <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm">
              <h2 className="font-display text-sm font-bold text-foreground/80 mb-3 uppercase tracking-wide">
                🎁 Coupon / Promo Code
              </h2>
              {couponApplied ? (
                <div className="flex items-center justify-between rounded-2xl bg-green-50 border border-green-200 px-4 py-3">
                  <span className="text-sm font-bold text-green-700">
                    {coupon.toUpperCase()} applied!
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-xs font-semibold text-rose-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    placeholder="Enter coupon code"
                    className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary transition"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:brightness-110 transition"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponMsg && (
                <p className={`mt-2 text-xs font-semibold ${couponMsg.ok ? "text-green-600" : "text-rose-500"}`}>
                  {couponMsg.text}
                </p>
              )}
              <p className="mt-3 text-[10px] text-foreground/40">
                Try: BAPPA10 · FRESH50 · GANPATI
              </p>
            </div>

            {/* Summary Card */}
            <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm space-y-3">
              <h2 className="font-display text-base font-bold text-primary mb-4">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-sm">
                <Row label={`Total Items`} value={`${totalItems} ${totalItems === 1 ? "item" : "items"}`} />
                <Row label="Subtotal" value={inr(totalPrice)} />
                {discountAmount > 0 && (
                  <Row label="Discount" value={`− ${inr(discountAmount)}`} valueClass="text-green-600 font-bold" />
                )}
                <Row label="Delivery" value="FREE" valueClass="text-green-600 font-bold" />
              </div>

              <div className="border-t border-border/60 pt-3 flex items-center justify-between">
                <span className="font-display text-base font-bold text-foreground">Grand Total</span>
                <span className="font-display text-2xl font-extrabold text-primary">{inr(grandTotal)}</span>
              </div>

              <button
                type="button"
                onClick={() => navigate({ to: "/checkout" })}
                className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center gap-2 mt-2"
              >
                <span>Proceed to Checkout</span>
                <span>→</span>
              </button>

              <Link
                to="/shop"
                className="block text-center text-xs text-foreground/60 hover:text-primary hover:underline pt-1"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Trust badges */}
            <div className="rounded-3xl border border-border/40 bg-card/60 p-4">
              <div className="grid grid-cols-2 gap-3 text-center text-[11px] text-foreground/60">
                {[
                  ["🌅", "Dawn-picked Fresh"],
                  ["🚚", "Same-day Delivery"],
                  ["🔒", "Secure Payment"],
                  ["🌿", "100% Natural"],
                ].map(([icon, label]) => (
                  <div key={label} className="space-y-1">
                    <div className="text-2xl">{icon}</div>
                    <div className="font-semibold">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-foreground/70">{label}</span>
      <span className={`font-semibold text-foreground ${valueClass ?? ""}`}>{value}</span>
    </div>
  );
}
