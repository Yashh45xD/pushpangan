import { Package, RotateCcw, Download, ShoppingCart } from "lucide-react";

interface OrderItem {
  name?: string;
  flowerName?: string;
  product_name?: string;
  image?: string;
  qty?: number;
  quantity?: number;
  price?: number;
}

interface Order {
  _id?: string;
  id?: string;
  orderNumber?: string;
  orderId?: string;
  order_number?: string;
  items?: OrderItem[];
  totalAmount?: number;
  grandTotal?: number;
  total_amount?: number;
  orderStatus?: string;
  createdAt: string;
}

interface Props { orders: Order[]; }

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  Delivered: { color: "#4F5535", bg: "#F0F5EC", dot: "#4F5535" },
  Pending: { color: "#B68F38", bg: "#FFF8E8", dot: "#B68F38" },
  Confirmed: { color: "#0284c7", bg: "#EFF9FF", dot: "#0284c7" },
  "Out for Delivery": { color: "#0284c7", bg: "#EFF9FF", dot: "#0284c7" },
  Cancelled: { color: "#ef4444", bg: "#FFF1F1", dot: "#ef4444" },
  Processing: { color: "#8b5cf6", bg: "#F5F3FF", dot: "#8b5cf6" },
};

export function RecentOrdersSection({ orders }: Props) {
  const fmt = (d: string) => {
    try {
      return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    } catch {
      return d;
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-2xl border bg-white shadow-sm p-12 text-center" style={{ borderColor: "#E2DCBE" }}>
        <Package size={40} style={{ color: "#B68F38", opacity: 0.4, margin: "0 auto 12px" }} />
        <p className="text-sm font-medium" style={{ color: "#666851" }}>No orders yet</p>
        <p className="text-xs mt-1 text-gray-500">Your flower order history will appear here once you place an order.</p>
        <a href="/shop" className="mt-4 inline-block rounded-full px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:opacity-90" style={{ backgroundColor: "#4F5535" }}>
          🌸 Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
        <div>
          <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>Recent Orders</h2>
          <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>Your latest flower purchases</p>
        </div>
        <a href="/orders" className="text-xs font-semibold hover:underline" style={{ color: "#B68F38" }}>View all →</a>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#F7F5EF" }}>
              {["Product", "Order #", "Date", "Amount", "Status", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide" style={{ color: "#9F905E" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              const item = order.items?.[0];
              const itemName = item?.flowerName || item?.name || item?.product_name || "Pushpangan Blooms";
              const itemQty = item?.quantity || item?.qty || 1;
              const orderIdStr = order.orderId || order.orderNumber || order.order_number || order._id || "ORDER";
              const totalAmt = order.grandTotal || order.totalAmount || order.total_amount || 0;
              const statusStr = order.orderStatus || "Pending";
              const sc = statusConfig[statusStr] || statusConfig["Pending"];

              return (
                <tr key={order._id || order.id || orderIdStr} className="border-t transition hover:bg-[#FDFBF4]" style={{ borderColor: "#F0EFE6" }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item?.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60"}
                        alt={itemName}
                        className="w-12 h-12 rounded-xl object-cover shadow-sm border"
                        style={{ borderColor: "#E2DCBE" }}
                      />
                      <div>
                        <p className="font-semibold text-xs line-clamp-2" style={{ color: "#333", maxWidth: 160 }}>{itemName}</p>
                        {order.items && order.items.length > 1 && <p className="text-[10px] mt-0.5" style={{ color: "#9F905E" }}>+{order.items.length - 1} more item(s)</p>}
                        <p className="text-[10px] mt-0.5" style={{ color: "#9F905E" }}>Qty: {itemQty}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono font-semibold" style={{ color: "#4F5535" }}>#{orderIdStr}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs" style={{ color: "#666" }}>{fmt(order.createdAt)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold" style={{ color: "#4F5535" }}>₹{totalAmt.toLocaleString("en-IN")}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold w-fit" style={{ color: sc.color, backgroundColor: sc.bg }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sc.dot }} />
                      {statusStr}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <a href="/orders" className="rounded-lg border px-2 py-1 text-[10px] font-semibold transition hover:bg-gray-50 flex items-center gap-1" style={{ borderColor: "#E2DCBE", color: "#4F5535" }}>
                        <RotateCcw size={10} /> Track
                      </a>
                      <a href="/orders" className="rounded-lg border px-2 py-1 text-[10px] font-semibold transition hover:bg-gray-50 flex items-center gap-1" style={{ borderColor: "#E2DCBE", color: "#666" }}>
                        <Download size={10} /> Invoice
                      </a>
                      <a href="/orders" className="rounded-lg px-2 py-1 text-[10px] font-bold transition hover:opacity-90 flex items-center gap-1" style={{ backgroundColor: "#4F5535", color: "#fff" }}>
                        <ShoppingCart size={10} /> Again
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y" style={{ borderColor: "#F0EFE6" }}>
        {orders.map(order => {
          const item = order.items?.[0];
          const itemName = item?.flowerName || item?.name || item?.product_name || "Pushpangan Blooms";
          const orderIdStr = order.orderId || order.orderNumber || order.order_number || order._id || "ORDER";
          const totalAmt = order.grandTotal || order.totalAmount || order.total_amount || 0;
          const statusStr = order.orderStatus || "Pending";
          const sc = statusConfig[statusStr] || statusConfig["Pending"];

          return (
            <div key={order._id || order.id || orderIdStr} className="p-4">
              <div className="flex gap-3">
                <img src={item?.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60"} alt={itemName} className="w-14 h-14 rounded-xl object-cover border" style={{ borderColor: "#E2DCBE" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: "#333" }}>{itemName}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "#9F905E" }}>#{orderIdStr} · {fmt(order.createdAt)}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-bold" style={{ color: "#4F5535" }}>₹{totalAmt.toLocaleString("en-IN")}</span>
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ color: sc.color, backgroundColor: sc.bg }}>{statusStr}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <a href="/orders" className="flex-1 text-center rounded-lg border py-1.5 text-[11px] font-semibold" style={{ borderColor: "#E2DCBE", color: "#4F5535" }}>Track Order</a>
                <a href="/orders" className="flex-1 text-center rounded-lg py-1.5 text-[11px] font-bold text-white" style={{ backgroundColor: "#4F5535" }}>Buy Again</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
