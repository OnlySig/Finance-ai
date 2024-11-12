"use server";
import Stripe from "stripe";
import actionUseUserId from "@/app/_hooks/actionUserId";

const createStripeCheckout = async () => {
  const userId = await actionUseUserId();
  if (!userId) throw new Error("Usuário não logado!");
  if (!process.env.STRIPE_SECRET_KEY)
    throw new Error("Stripe secret key not found.");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PRO_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  });
  return {
    sessionId: session.id,
  };
};

export default createStripeCheckout;
