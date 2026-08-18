import { useCart } from "@/lib/CartContext";
import { inr } from "@/lib/site";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    deliveryCharge,
    gstAmount,
    grandTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close cart drawer"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-card shadow-2xl border-l border-border/80 text-foreground animate-in slide-in-from-right duration-300">
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-border/60 p-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌺</span>
            <h2 className="font-display text-xl font-bold text-primary">Your Basket</h2>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="rounded-full p-2 text-foreground/60 hover:bg-muted hover:text-foreground transition"
          >
            ✕
          </button>
        </div>

        {/* ── Item List ── */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="text-6xl">🌸</div>
              <p className="font-display text-lg font-semibold text-foreground/80">
                Your basket is empty
              </p>
              <p className="text-sm text-foreground/55 max-w-xs mx-auto">
                Add fresh marigolds, roses, lotus and jasmine to your basket.
              </p>
              <Link
                to="/shop"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground hover:brightness-110 transition"
              >
                🌺 Browse Flowers
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.flower.slug}
                className="flex gap-3 rounded-2xl border border-border/60 bg-background/60 p-3 shadow-sm items-start"
              >
                <Link
                  to="/flowers/$slug"
                  params={{ slug: item.flower.slug }}
                  onClick={() => setIsCartOpen(false)}
                  className="shrink-0"
                >
                  <img
                    src={item.flower.image}
                    alt={item.flower.name}
                    className="h-16 w-16 rounded-xl object-cover border border-border/40 hover:scale-105 transition duration-200"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <h3 className="font-display text-sm font-bold text-foreground truncate">
                        {item.flower.name}
                      </h3>
                      <p className="text-[10px] text-foreground/50 mt-0.5">{item.flower.category}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.flower.slug)}
                      className="shrink-0 rounded-full p-1 text-foreground/40 hover:bg-rose-50 hover:text-rose-500 transition"
                      title="Remove"
                      aria-label={`Remove ${item.flower.name}`}
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="text-xs text-foreground/55 mt-0.5">
                    {inr(item.flower.price)} / {item.flower.unit}
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    {/* Qty stepper */}
                    <div className="flex items-center rounded-full border border-border bg-card">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.flower.slug, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-6 w-6 rounded-full text-xs font-bold hover:bg-muted disabled:opacity-40 transition flex items-center justify-center"
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.flower.slug, item.quantity + 1)}
                        className="h-6 w-6 rounded-full text-xs font-bold hover:bg-muted transition flex items-center justify-center"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-display text-sm font-bold text-primary">
                      {inr(item.flower.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Footer / Summary ── */}
        {cart.length > 0 && (
          <div className="border-t border-border/80 bg-card p-4 md:p-5 space-y-3 shadow-lg">
            {/* Mini summary */}
            <div className="space-y-1.5 text-xs text-foreground/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">{inr(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className={deliveryCharge === 0 ? "font-bold text-green-600" : "font-semibold text-foreground"}>
                  {deliveryCharge === 0 ? "FREE 🎉" : inr(deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-semibold text-foreground">{inr(gstAmount)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/60 pt-2">
              <span className="text-sm font-bold text-foreground">Grand Total</span>
              <span className="font-display text-xl font-extrabold text-primary">{inr(grandTotal)}</span>
            </div>

            {/* Continue Shopping */}
            <Link
              to="/shop"
              onClick={() => setIsCartOpen(false)}
              className="block w-full rounded-xl border border-border bg-background py-2.5 text-center text-xs font-bold text-foreground/80 hover:border-primary hover:text-primary transition"
            >
              Continue Shopping
            </Link>

            {/* Checkout */}
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full rounded-2xl bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground shadow-lg transition hover:brightness-110"
            >
              Proceed to Checkout →
            </Link>

            <button
              type="button"
              onClick={clearCart}
              className="w-full text-center text-xs text-foreground/50 hover:underline hover:text-foreground/70 pt-0.5"
            >
              Clear Basket
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
