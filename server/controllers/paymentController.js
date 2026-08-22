import { sendResponse } from "../utils/sendResponse.js";

// Simulating Razorpay / Stripe payment gateway responses for checkout
export const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, currency = "INR", paymentMethod = "Razorpay" } = req.body;

    if (!amount) {
      return sendResponse(res, 400, false, "Payment amount is required");
    }

    if (paymentMethod === "Razorpay") {
      const orderId = `rzp_order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      return sendResponse(res, 200, true, "Razorpay payment order generated", {
        id: orderId,
        entity: "order",
        amount: Math.round(amount * 100), // in paise
        currency,
        receipt: `receipt_${Date.now()}`,
        status: "created",
      });
    }

    if (paymentMethod === "Stripe") {
      const clientSecret = `pi_${Date.now()}_secret_${Math.floor(Math.random() * 1000000)}`;
      return sendResponse(res, 200, true, "Stripe payment intent created", {
        clientSecret,
        amount,
        currency,
      });
    }

    return sendResponse(res, 200, true, "Cash on delivery selected", { paymentMethod: "COD" });
  } catch (error) {
    next(error);
  }
};

export const verifyPaymentSignature = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // In production, verify crypto HMAC-SHA256 signature
    return sendResponse(res, 200, true, "Payment signature verified successfully", {
      status: "Paid",
      paymentId: razorpay_payment_id || `pay_${Date.now()}`,
    });
  } catch (error) {
    next(error);
  }
};
