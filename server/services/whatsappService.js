import twilio from "twilio";

/**
 * Twilio WhatsApp Service
 *
 * Setup Steps:
 * 1. Go to https://www.twilio.com and create a free account
 * 2. In Twilio Console, go to Messaging → Try it out → Send a WhatsApp message
 * 3. Note down your Account SID, Auth Token, and the sandbox WhatsApp number
 * 4. You (8369407007) must first send the join code to the sandbox number
 *    e.g. WhatsApp "join <sandbox-code>" to +14155238886 (Twilio sandbox)
 * 5. For production: apply for WhatsApp Business Account through Twilio
 *
 * Add to your .env:
 *   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *   TWILIO_AUTH_TOKEN=your_auth_token
 *   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886   (Twilio sandbox number)
 */

const getClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken || accountSid.startsWith("ACxxx")) {
    // Fallback: log to console if Twilio not configured
    return null;
  }

  return twilio(accountSid, authToken);
};

/**
 * Send a WhatsApp message via Twilio
 * @param {string} to - recipient phone number (10 digits, Indian)
 * @param {string} message - message body
 */
export const sendWhatsApp = async (to, message) => {
  try {
    const client = getClient();

    if (!client) {
      // Twilio not configured — just log the message
      console.log("=======[ WHATSAPP FALLBACK LOG ]=======");
      console.log(`To: +91${to}`);
      console.log(`Message:\n${message}`);
      console.log("=======================================");
      return;
    }

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886",
      to: `whatsapp:+91${to}`,
    });

    console.log(`✅ WhatsApp sent to +91${to}`);
  } catch (error) {
    // Never crash the order flow due to WhatsApp failure
    console.error(`❌ WhatsApp send failed to +91${to}:`, error.message);
  }
};
