import Stripe from "stripe";
import UserModel from "../models/user.model.js";

const CREDIT_MAP = {
  100: 50,
  200: 200,
  500: 500,
};


//controller for create credits
export const createCreditsOrder = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is missing in process.env");
      return res.status(500).json({ message: "Server configuration error: Stripe key missing" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const userId = req.userId;
    const { amount } = req.body;

    if (!amount || !CREDIT_MAP[amount]) {
      return res.status(400).json({ message: "Invalid credit plan" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // payment_method_
      success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}payment-success`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${CREDIT_MAP[amount]} Credits`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId ? String(userId) : "",
        credits: String(CREDIT_MAP[amount]),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error in createCreditsOrder:", error);
    return res.status(500).json({ message: error.message || "Stripe order creation failed" });
  }
};


// stripe webhook controller
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).send("Stripe key missing");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata?.userId;
    const creditsToAdd = Number(session.metadata?.credits);

    if (!userId || isNaN(creditsToAdd)) {
      console.error("Invalid metadata in session:", session.metadata);
      return res.status(400).json({ message: "Invalid metadata" });
    }

    try {
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $inc: { credits: creditsToAdd },$set: { isCreditAvailable: true },
        },
        { new: true }
      );
    } catch (dbError) {
      console.error("Database update error during webhook:", dbError);
      return res.status(500).json({ message: "Database update failed" });
    }
  }

  return res.json({ received: true });
};




