import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/CartContext";
import { inr, SITE } from "@/lib/site";
import { useState } from "react";
import { orderService } from "@/services/orderService";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: `Checkout — ${SITE.brand}` },
      { name: "description", content: "Complete your flower order from Pushpangan." },
    ],
  }),
  component: CheckoutPage,
});

type PaymentMethod = "cod" | "card";

function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cart,
    totalPrice,
    discountAmount,
    deliveryCharge,
    gstAmount,
    grandTotal,
    clearCart,
  } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.phone.trim() || form.phone.length < 10) e.phone = "Enter a valid 10-digit phone.";
    if (!form.address.trim()) e.address = "Address is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.pincode.trim() || form.pincode.length < 6) e.pincode = "Enter a valid 6-digit pincode.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const createdOrder = await orderService.createOrder({
        total_amount: totalPrice,
        discount_amount: discountAmount,
        delivery_fee: deliveryCharge,
        final_amount: grandTotal,
        shipping_address: `${form.name}, ${form.address}`,
        shipping_city: form.city,
        shipping_state: form.state,
        shipping_pincode: form.pincode,
        shipping_phone: form.phone,
        payment_method: payment,
        items: cart.map((item) => ({
          product_id: item.flower.slug,
          product_name: item.flower.name,
          unit_price: item.flower.price,
          quantity: item.quantity,
          subtotal: item.flower.price * item.quantity,
        })),
      });

      const id = createdOrder?.orderId || createdOrder?.order_number || `ORD-${Date.now()}`;
      setOrderId(id);
      clearCart();
      setPlaced(true);
    } catch (e) {
      console.error("Failed to place order:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !placed) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="font-display text-3xl font-extrabold text-primary mb-3">Your basket is empty</h1>
        <Link
          to="/shop"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl hover:brightness-110 transition"
        >
          🌺 Shop Now
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="text-8xl mb-6 animate-bounce">🌸</div>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-3">
          Order Placed Successfully!
        </h1>
        <p className="text-foreground/60 max-w-sm mb-2 leading-relaxed">
          Thank you for your order! Our team will call you within 30 minutes to confirm delivery.
        </p>
        <p className="text-xs text-foreground/50 mb-8">
          Order ID: <span className="font-bold text-foreground">{orderId}</span>
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl hover:brightness-110 transition"
          >
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="rounded-full border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground hover:border-primary transition"
          >
            Shop More Flowers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/basket" className="text-xs font-semibold text-foreground/60 hover:text-primary">
            ← Back to Basket
          </Link>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-primary">
            Checkout
          </h1>
          <p className="mt-1 text-sm text-foreground/60">Complete your delivery details and place your order.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* ── Left: Form ── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Delivery Details */}
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold text-primary mb-5">
                🚚 Delivery Details
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" required error={errors.name}>
                  <input
                    id="checkout-name"
                    type="text"
                    placeholder="Ramesh Sharma"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={inputCls(!!errors.name)}
                  />
                </Field>
                <Field label="Phone Number" required error={errors.phone}>
                  <input
                    id="checkout-phone"
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={inputCls(!!errors.phone)}
                  />
                </Field>
                <Field label="Delivery Address" required error={errors.address} className="sm:col-span-2">
                  <textarea
                    id="checkout-address"
                    placeholder="Flat / House No, Street, Locality"
                    rows={2}
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className={inputCls(!!errors.address) + " resize-none"}
                  />
                </Field>
                <Field label="City" required error={errors.city}>
                  <input
                    id="checkout-city"
                    type="text"
                    placeholder="Pune"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={inputCls(!!errors.city)}
                  />
                </Field>
                <Field label="Pincode" required error={errors.pincode}>
                  <input
                    id="checkout-pincode"
                    type="text"
                    placeholder="411001"
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) => handleChange("pincode", e.target.value)}
                    className={inputCls(!!errors.pincode)}
                  />
                </Field>
                <Field label="State" className="sm:col-span-2">
                  <select
                    id="checkout-state"
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className={inputCls(false)}
                  >
                    {["Maharashtra", "Goa", "Gujarat", "Karnataka", "Delhi"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold text-primary mb-5">
                💳 Payment Method
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  [
                    { id: "cod", label: "Cash on Delivery", icon: "💵" },
                    { id: "card", label: "Credit / Debit Card", icon: "💳" },
                  ] as { id: PaymentMethod; label: string; icon: string }[]
                ).map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPayment(pm.id)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-sm font-semibold transition ${
                      payment === pm.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-background text-foreground/70 hover:border-primary/40"
                    }`}
                  >
                    <span className="text-2xl">{pm.icon}</span>
                    <span>{pm.label}</span>
                  </button>
                ))}
              </div>
              {payment === "cod" && (
                <p className="mt-4 text-xs text-foreground/60 bg-muted rounded-xl px-4 py-2">
                  Pay cash to the delivery person. No extra charges.
                </p>
              )}
              {payment === "card" && (
                <p className="mt-4 text-xs text-foreground/60 bg-muted rounded-xl px-4 py-2">
                  Online card payment will be collected via a secure payment link after order confirmation.
                </p>
              )}
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm">
              <h2 className="font-display text-base font-bold text-primary mb-4">
                Your Order ({cart.length} {cart.length === 1 ? "item" : "items"})
              </h2>
              <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.flower.slug} className="flex items-center gap-3">
                    <img
                      src={item.flower.image}
                      alt={item.flower.name}
                      className="h-12 w-12 rounded-xl object-cover border border-border/40 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {item.flower.name}
                      </p>
                      <p className="text-xs text-foreground/50">
                        {inr(item.flower.price)} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-primary shrink-0">
                      {inr(item.flower.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t border-border/60 pt-4 text-sm">
                <SummaryRow label="Subtotal" value={inr(totalPrice)} />
                {discountAmount > 0 && (
                  <SummaryRow label="Discount" value={`− ${inr(discountAmount)}`} green />
                )}
                <SummaryRow
                  label="Delivery"
                  value={deliveryCharge === 0 ? "FREE" : inr(deliveryCharge)}
                  green={deliveryCharge === 0}
                />
                <SummaryRow label="GST (5%)" value={inr(gstAmount)} />
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
                <span className="font-display font-bold text-foreground">Grand Total</span>
                <span className="font-display text-xl font-extrabold text-primary">{inr(grandTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isSubmitting || cart.length === 0}
              className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-xl transition hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                  <span>Placing Order…</span>
                </>
              ) : (
                <>
                  <span>🌸 Place Order</span>
                  <span>→</span>
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-foreground/40">
              By placing your order you agree to our terms. Prices are indicative and subject to daily market rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-foreground/70 mb-1">
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition ${
    hasError
      ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
  }`;
}

function SummaryRow({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-foreground/60">{label}</span>
      <span className={`font-semibold ${green ? "text-green-600" : "text-foreground"}`}>{value}</span>
    </div>
  );
}
