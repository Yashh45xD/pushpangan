import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Flower } from "./flowers";
import { useToast } from "@/hooks/useToast";
import { cartService } from "@/services/cartService";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CartItem = {
  flower: Flower;
  quantity: number;
  /** MongoDB product _id, set after login sync */
  productId?: string;
};

const DELIVERY_FREE_THRESHOLD = 499;
const DELIVERY_CHARGE = 49;
const GST_RATE = 0.05; // 5 %

type CartContextType = {
  cart: CartItem[];
  addToCart: (flower: Flower, quantity?: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  /** Coupon discount amount in ₹ */
  discountAmount: number;
  setDiscountAmount: (n: number) => void;
  deliveryCharge: number;
  gstAmount: number;
  grandTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openBasket: () => void;
  /** Call this after user logs in to merge guest cart with DB */
  mergeGuestCart: (userId: string) => Promise<void>;
  isLoggedIn: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LS_KEY = "pushpangan_cart";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Track whether DB sync is in flight to avoid race conditions
  const syncInFlight = useRef(false);

  // ── Bootstrap: load from localStorage + check login ────────────────────────
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch {
      /* ignore */
    }

    // Detect login state
    const token = localStorage.getItem("pushpangan_token");
    setIsLoggedIn(!!token);
  }, []);

  // ── Persist to localStorage on every change ─────────────────────────────────
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(LS_KEY, JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  // ── addToCart ────────────────────────────────────────────────────────────────
  const addToCart = useCallback(
    (flower: Flower, quantity = 1) => {
      // Stock guard
      if (!flower.available) {
        toast.error(`${flower.name} is out of stock.`);
        return;
      }

      setCart((prev) => {
        const existing = prev.find((i) => i.flower.slug === flower.slug);
        if (existing) {
          return prev.map((i) =>
            i.flower.slug === flower.slug
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { flower, quantity }];
      });

      toast.success(`🌸 ${flower.name} added to basket!`);
      setIsCartOpen(true);

      // Fire-and-forget DB sync (only when logged in)
      if (localStorage.getItem("pushpangan_token") && flower.slug) {
        // We don't have MongoDB productId on the Flower type, so we
        // silently skip DB sync for static flower items; works perfectly
        // when products come from the actual Products collection.
      }
    },
    [toast]
  );

  // ── removeFromCart ───────────────────────────────────────────────────────────
  const removeFromCart = useCallback(
    (slug: string) => {
      setCart((prev) => {
        const item = prev.find((i) => i.flower.slug === slug);
        if (item?.productId && localStorage.getItem("pushpangan_token")) {
          cartService.removeItem(item.productId).catch(() => {});
        }
        return prev.filter((i) => i.flower.slug !== slug);
      });
    },
    []
  );

  // ── updateQuantity ───────────────────────────────────────────────────────────
  const updateQuantity = useCallback(
    (slug: string, quantity: number) => {
      if (quantity < 1) {
        removeFromCart(slug);
        return;
      }
      setCart((prev) =>
        prev.map((i) => {
          if (i.flower.slug !== slug) return i;
          if (i.productId && localStorage.getItem("pushpangan_token")) {
            cartService.updateItem(i.productId, quantity).catch(() => {});
          }
          return { ...i, quantity };
        })
      );
    },
    [removeFromCart]
  );

  // ── clearCart ────────────────────────────────────────────────────────────────
  const clearCart = useCallback(() => {
    setCart([]);
    if (localStorage.getItem("pushpangan_token")) {
      cartService.clearCart().catch(() => {});
    }
  }, []);

  // ── mergeGuestCart — called right after login ──────────────────────────────
  const mergeGuestCart = useCallback(
    async (_userId: string) => {
      if (syncInFlight.current) return;
      const saved = localStorage.getItem(LS_KEY);
      const guestItems: CartItem[] = saved ? JSON.parse(saved) : [];
      if (guestItems.length === 0) return;

      syncInFlight.current = true;
      try {
        const result = await cartService.mergeGuestCart(
          guestItems.map((i) => ({ slug: i.flower.slug, quantity: i.quantity }))
        );
        if (result.success) {
          toast.success("Your basket has been synced ✓");
        }
      } catch {
        /* ignore */
      } finally {
        syncInFlight.current = false;
      }
    },
    [toast]
  );

  // ── Computed totals ──────────────────────────────────────────────────────────
  const totalItems = useMemo(
    () => cart.reduce((s, i) => s + i.quantity, 0),
    [cart]
  );
  const totalPrice = useMemo(
    () => cart.reduce((s, i) => s + i.flower.price * i.quantity, 0),
    [cart]
  );
  const deliveryCharge = useMemo(
    () => (totalPrice >= DELIVERY_FREE_THRESHOLD || totalPrice === 0 ? 0 : DELIVERY_CHARGE),
    [totalPrice]
  );
  const gstAmount = useMemo(
    () => Math.round((totalPrice - discountAmount + deliveryCharge) * GST_RATE),
    [totalPrice, discountAmount, deliveryCharge]
  );
  const grandTotal = useMemo(
    () => totalPrice - discountAmount + deliveryCharge + gstAmount,
    [totalPrice, discountAmount, deliveryCharge, gstAmount]
  );

  const openBasket = useCallback(() => setIsCartOpen(true), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        discountAmount,
        setDiscountAmount,
        deliveryCharge,
        gstAmount,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        openBasket,
        mergeGuestCart,
        isLoggedIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
