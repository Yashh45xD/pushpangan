import { sendWhatsApp } from "./whatsappService.js";
import {
  sendOrderConfirmationToCustomer,
  sendNewOrderAlertToAdmin,
} from "./emailService.js";

const ADMIN_PHONE = process.env.ADMIN_PHONE || "8369407007";

/**
 * Sends all order notifications when a new order is placed:
 *  1. ✅ Email to customer   — Beautiful order confirmation
 *  2. ✅ WhatsApp to customer — Quick confirmation message
 *  3. ✅ Email to Admin (yashvarpe169@gmail.com) — Full order details alert
 *  4. ✅ WhatsApp to Admin (8369407007)          — Quick alert with key details
 */
export const sendOrderNotifications = async (order, customer) => {
  const orderId = `#${order._id.toString().slice(-8).toUpperCase()}`;
  const itemSummary = order.orderItems
    .map((i) => `${i.name} ×${i.quantity}`)
    .join(", ");

  // ─── 1. Email → Customer ────────────────────────────────────────────────
  try {
    await sendOrderConfirmationToCustomer(customer.email, order, customer.name);
  } catch (err) {
    console.error("❌ Customer confirmation email failed:", err.message);
  }

  // ─── 2. WhatsApp → Customer ─────────────────────────────────────────────
  if (customer.phone) {
    const customerMsg =
      `🌸 *Pushpangan — Order Confirmed!*\n\n` +
      `Hi ${customer.name}! 🎉\n\n` +
      `Your order ${orderId} has been placed successfully.\n\n` +
      `🌷 *Items:* ${itemSummary}\n` +
      `💰 *Total:* ₹${order.grandTotal}\n` +
      `💳 *Payment:* ${order.paymentMethod}\n\n` +
      `📦 We'll notify you once your flowers are out for delivery!\n\n` +
      `Thank you for shopping with Pushpangan 🌸`;

    await sendWhatsApp(customer.phone.replace(/\D/g, "").slice(-10), customerMsg);
  }

  // ─── 3. Email → Admin (yashvarpe169@gmail.com) ──────────────────────────
  try {
    await sendNewOrderAlertToAdmin(
      order,
      customer.name,
      customer.email,
      customer.phone
    );
  } catch (err) {
    console.error("❌ Admin alert email failed:", err.message);
  }

  // ─── 4. WhatsApp → Admin (8369407007) ───────────────────────────────────
  const adminMsg =
    `🛒 *New Order — Pushpangan!*\n\n` +
    `*Order ID:* ${orderId}\n` +
    `*Customer:* ${customer.name}\n` +
    `*Phone:* ${customer.phone || "N/A"}\n` +
    `*Email:* ${customer.email}\n\n` +
    `🌸 *Items:* ${itemSummary}\n` +
    `💰 *Grand Total:* ₹${order.grandTotal}\n` +
    `💳 *Payment:* ${order.paymentMethod} — ${order.paymentStatus}\n\n` +
    `📦 *Deliver to:*\n` +
    `${order.shippingAddress.fullName}\n` +
    `${order.shippingAddress.street}, ${order.shippingAddress.city}\n` +
    `${order.shippingAddress.state} - ${order.shippingAddress.pincode}\n` +
    `📞 ${order.shippingAddress.phone}\n\n` +
    `⚡ Please confirm and prepare the order!`;

  await sendWhatsApp(ADMIN_PHONE, adminMsg);
};
