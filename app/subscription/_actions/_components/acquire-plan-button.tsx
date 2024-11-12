"use client";

import { Button } from "@/app/_components/ui/button";
import createStripeCheckout from "../create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlanButton = () => {
  const { user } = useUser();
  const isProPlan = user?.publicMetadata.subscriptionPlan === "pro";
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      throw new Error("Stripe public key not found");
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (!stripe) throw new Error("Stripe not found");
    await stripe.redirectToCheckout({ sessionId });
  };
  if (!isProPlan) {
    return (
      <Button
        className="rounded-full border font-bold hover:border-primary"
        variant={"default"}
        onClick={handleAcquirePlanClick}
      >
        Adquirir plano
      </Button>
    );
  }
  return (
    <Button
      className="rounded-full border font-bold hover:border-primary"
      variant={"link"}
      asChild
    >
      <Link
        href={
          `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${user.emailAddresses[0].emailAddress}` as string
        }
      >
        Gerenciar plano
      </Link>
    </Button>
  );
};

export default AcquirePlanButton;
