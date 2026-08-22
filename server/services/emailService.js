import nodemailer from "nodemailer";

const createTransporter = () => {
  const user = process.env.SMTP_USER || "pushpangan001@gmail.com";
  const pass = process.env.SMTP_PASS;

  if (pass && pass !== "your_gmail_app_password_here") {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user,
        pass,
      },
    });
  }

  // Fallback: log to console if SMTP password is not configured
  return {
    sendMail: async (options) => {
      console.log("==========[ EMAIL CONFIGURATION REQUIRED ]==========");
      console.log(`To configure email sending:`);
      console.log(`1. Enable 2-Step Verification on Gmail account: pushpangan001@gmail.com`);
      console.log(`2. Generate an 'App Password' under security settings.`);
      console.log(`3. Update the SMTP_PASS value in your .env file.`);
      console.log(`--------------------------------------------------`);
      console.log(`To      : ${options.to}`);
      console.log(`Subject : ${options.subject}`);
      console.log(`Body    :\n${options.text || "[HTML email]"}`);
      console.log("====================================================");
      return { messageId: "mock-email-id" };
    },
  };
};

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "yashvarpe169@gmail.com";
const FROM_ADDRESS = `"Pushpangan Flowers 🌸" <${process.env.SMTP_USER || "pushpangan001@gmail.com"}>`;

/* ─────────────────────────────────────────────────────────────────────────── */
/*  OTP Email                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */
export const sendOTPEmail = async (email, otp, title = "Pushpangan Email Verification") => {
  const transporter = createTransporter();

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:12px;padding:24px;background:#fafafa;">
      <div style="text-align:center;margin-bottom:20px;">
        <h1 style="color:#e11d48;margin:0;">🌸 Pushpangan</h1>
        <p style="color:#666;font-size:14px;">Fresh Flowers Delivered To Your Doorstep</p>
      </div>
      <div style="background:#fff;border-radius:8px;padding:24px;box-shadow:0 2px 4px rgba(0,0,0,.05);">
        <h2 style="color:#333;margin-top:0;">${title}</h2>
        <p style="color:#555;line-height:1.5;">Your One Time Password (OTP) is:</p>
        <div style="text-align:center;margin:30px 0;">
          <span style="display:inline-block;font-size:32px;font-weight:bold;letter-spacing:8px;color:#e11d48;background:#ffe4e6;padding:12px 24px;border-radius:8px;border:1px dashed #f43f5e;">
            ${otp}
          </span>
        </div>
        <p style="color:#777;font-size:13px;">⏱️ This OTP is valid for <strong>10 minutes</strong>. Please do not share this code with anyone.</p>
      </div>
      <p style="text-align:center;color:#aaa;font-size:12px;margin-top:20px;">
        &copy; ${new Date().getFullYear()} Pushpangan. All rights reserved.
      </p>
    </div>
  `;

  await transporter.sendMail({ from: FROM_ADDRESS, to: email, subject: title, html });
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Order Confirmation Email → Customer                                        */
/* ─────────────────────────────────────────────────────────────────────────── */
export const sendOrderConfirmationToCustomer = async (customerEmail, order, customerName) => {
  const transporter = createTransporter();

  const itemRows = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;">${item.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:right;">₹${item.price}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:right;">₹${item.price * item.quantity}</td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#e11d48,#f43f5e);padding:32px 24px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:28px;">🌸 Pushpangan</h1>
        <p style="color:rgba(255,255,255,.85);margin:6px 0 0;">Your order is confirmed!</p>
      </div>

      <!-- Body -->
      <div style="padding:28px 24px;background:#fff;">
        <h2 style="color:#1e293b;margin-top:0;">Hi ${customerName}! 🎉</h2>
        <p style="color:#475569;line-height:1.6;">
          Thank you for your order. We've received it and are preparing your beautiful flowers.
          You'll receive another notification once your order is out for delivery.
        </p>

        <!-- Order Info -->
        <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:20px 0;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="color:#64748b;padding:4px 0;">Order ID</td>
              <td style="color:#0f172a;font-weight:600;text-align:right;">#${order._id.toString().slice(-8).toUpperCase()}</td>
            </tr>
            <tr>
              <td style="color:#64748b;padding:4px 0;">Payment Method</td>
              <td style="color:#0f172a;text-align:right;">${order.paymentMethod}</td>
            </tr>
            <tr>
              <td style="color:#64748b;padding:4px 0;">Payment Status</td>
              <td style="color:#0f172a;text-align:right;">${order.paymentStatus}</td>
            </tr>
            <tr>
              <td style="color:#64748b;padding:4px 0;">Order Status</td>
              <td style="text-align:right;"><span style="background:#dcfce7;color:#166534;padding:2px 10px;border-radius:20px;font-size:12px;">${order.orderStatus}</span></td>
            </tr>
          </table>
        </div>

        <!-- Items Table -->
        <h3 style="color:#1e293b;margin-bottom:12px;">🌷 Items Ordered</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="background:#f1f5f9;">
              <th style="padding:8px 12px;text-align:left;color:#475569;">Flower</th>
              <th style="padding:8px 12px;text-align:center;color:#475569;">Qty</th>
              <th style="padding:8px 12px;text-align:right;color:#475569;">Price</th>
              <th style="padding:8px 12px;text-align:right;color:#475569;">Total</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <!-- Price Summary -->
        <div style="margin-top:20px;background:#fdf2f8;border-radius:8px;padding:16px;">
          <table style="width:100%;font-size:14px;border-collapse:collapse;">
            <tr>
              <td style="color:#64748b;padding:4px 0;">Subtotal</td>
              <td style="text-align:right;color:#1e293b;">₹${order.subtotal}</td>
            </tr>
            <tr>
              <td style="color:#64748b;padding:4px 0;">GST (18%)</td>
              <td style="text-align:right;color:#1e293b;">₹${order.tax}</td>
            </tr>
            <tr>
              <td style="color:#64748b;padding:4px 0;">Shipping</td>
              <td style="text-align:right;color:#1e293b;">${order.shippingPrice === 0 ? "FREE" : "₹" + order.shippingPrice}</td>
            </tr>
            ${order.discountAmount > 0 ? `<tr><td style="color:#16a34a;padding:4px 0;">Discount</td><td style="text-align:right;color:#16a34a;">-₹${order.discountAmount}</td></tr>` : ""}
            <tr>
              <td style="color:#0f172a;font-weight:700;font-size:16px;padding:8px 0 4px;">Grand Total</td>
              <td style="text-align:right;color:#e11d48;font-weight:700;font-size:16px;padding:8px 0 4px;">₹${order.grandTotal}</td>
            </tr>
          </table>
        </div>

        <!-- Shipping Address -->
        <div style="margin-top:20px;">
          <h3 style="color:#1e293b;margin-bottom:8px;">📦 Delivery Address</h3>
          <p style="color:#475569;background:#f8fafc;padding:12px;border-radius:8px;margin:0;line-height:1.6;">
            ${order.shippingAddress.fullName} | ${order.shippingAddress.phone}<br/>
            ${order.shippingAddress.street}, ${order.shippingAddress.city},<br/>
            ${order.shippingAddress.state} - ${order.shippingAddress.pincode}
          </p>
        </div>

        <p style="margin-top:24px;color:#475569;">
          Questions? Reply to this email or call us. We're happy to help! 🌸
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#1e293b;padding:16px 24px;text-align:center;">
        <p style="color:#94a3b8;font-size:12px;margin:0;">&copy; ${new Date().getFullYear()} Pushpangan Flowers. All rights reserved.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: FROM_ADDRESS,
    to: customerEmail,
    subject: `🌸 Order Confirmed! #${order._id.toString().slice(-8).toUpperCase()} — Pushpangan`,
    html,
  });

  console.log(`✅ Order confirmation email sent to customer: ${customerEmail}`);
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  New Order Alert Email → Admin (yashvarpe169@gmail.com)                    */
/* ─────────────────────────────────────────────────────────────────────────── */
export const sendNewOrderAlertToAdmin = async (order, customerName, customerEmail, customerPhone) => {
  const transporter = createTransporter();

  const itemList = order.orderItems
    .map((item) => `• ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`)
    .join("\n");

  const itemRows = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;">${item.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:right;">₹${item.price * item.quantity}</td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#0f172a,#1e3a5f);padding:28px 24px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:22px;">🛒 New Order Received!</h1>
        <p style="color:rgba(255,255,255,.7);margin:6px 0 0;font-size:14px;">Pushpangan Admin Alert</p>
      </div>

      <!-- Body -->
      <div style="padding:28px 24px;background:#fff;">
        <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:14px 16px;border-radius:0 8px 8px 0;margin-bottom:24px;">
          <strong style="color:#92400e;">⚡ Action Required:</strong>
          <span style="color:#78350f;"> Please confirm and prepare this order.</span>
        </div>

        <!-- Customer Info -->
        <h3 style="color:#1e293b;margin:0 0 12px;">👤 Customer Details</h3>
        <div style="background:#f8fafc;border-radius:8px;padding:16px;margin-bottom:20px;">
          <table style="width:100%;font-size:14px;border-collapse:collapse;">
            <tr><td style="color:#64748b;padding:3px 0;">Name</td><td style="color:#0f172a;font-weight:600;">${customerName}</td></tr>
            <tr><td style="color:#64748b;padding:3px 0;">Email</td><td style="color:#0f172a;">${customerEmail}</td></tr>
            <tr><td style="color:#64748b;padding:3px 0;">Phone</td><td style="color:#0f172a;">${customerPhone || "N/A"}</td></tr>
          </table>
        </div>

        <!-- Order Info -->
        <h3 style="color:#1e293b;margin:0 0 12px;">📋 Order Details</h3>
        <div style="background:#f8fafc;border-radius:8px;padding:16px;margin-bottom:20px;">
          <table style="width:100%;font-size:14px;border-collapse:collapse;">
            <tr><td style="color:#64748b;padding:3px 0;">Order ID</td><td style="color:#0f172a;font-weight:600;">#${order._id.toString().slice(-8).toUpperCase()}</td></tr>
            <tr><td style="color:#64748b;padding:3px 0;">Payment</td><td style="color:#0f172a;">${order.paymentMethod} — ${order.paymentStatus}</td></tr>
            <tr><td style="color:#64748b;padding:3px 0;">Grand Total</td><td style="color:#e11d48;font-weight:700;font-size:16px;">₹${order.grandTotal}</td></tr>
          </table>
        </div>

        <!-- Items -->
        <h3 style="color:#1e293b;margin:0 0 12px;">🌸 Items</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="background:#f1f5f9;">
              <th style="padding:8px 12px;text-align:left;">Flower</th>
              <th style="padding:8px 12px;text-align:center;">Qty</th>
              <th style="padding:8px 12px;text-align:right;">Amount</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <!-- Delivery Address -->
        <div style="margin-top:20px;">
          <h3 style="color:#1e293b;margin-bottom:8px;">📦 Delivery Address</h3>
          <p style="color:#475569;background:#f8fafc;padding:12px;border-radius:8px;margin:0;line-height:1.6;">
            ${order.shippingAddress.fullName} | ${order.shippingAddress.phone}<br/>
            ${order.shippingAddress.street}, ${order.shippingAddress.city},<br/>
            ${order.shippingAddress.state} - ${order.shippingAddress.pincode}
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#0f172a;padding:16px 24px;text-align:center;">
        <p style="color:#94a3b8;font-size:12px;margin:0;">Pushpangan Admin Notification System</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: FROM_ADDRESS,
    to: ADMIN_EMAIL,
    subject: `🛒 New Order #${order._id.toString().slice(-8).toUpperCase()} — ₹${order.grandTotal} | ${customerName}`,
    html,
    text: `NEW ORDER RECEIVED!\n\nCustomer: ${customerName}\nEmail: ${customerEmail}\nPhone: ${customerPhone}\n\nOrder ID: #${order._id}\nTotal: ₹${order.grandTotal}\nPayment: ${order.paymentMethod}\n\nItems:\n${itemList}\n\nDelivery:\n${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`,
  });

  console.log(`✅ Admin order alert email sent to: ${ADMIN_EMAIL}`);
};
