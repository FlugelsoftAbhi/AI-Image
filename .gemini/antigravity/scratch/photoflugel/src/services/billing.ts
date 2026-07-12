import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-01-27.acacia', // using current stable version
});

export const PLAN_LIMITS = {
  Free: 10,
  Pro: -1, // Unlimited
  Business: -1, // Unlimited, higher concurrency or speed
};

export async function createCheckoutSession(userId: string, email: string, priceId: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: email,
    metadata: {
      userId,
    },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  });

  return session;
}
