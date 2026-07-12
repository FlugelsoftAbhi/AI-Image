import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/services/billing";
import { supabase } from "@/services/database";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  if (event.type === "checkout.session.completed") {
    // Retrieve subscription and user details
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    
    // Update user subscription in database
    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: session.metadata.userId,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer as string,
        plan_id: subscription.items.data[0].price.id,
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      });
      
    if(error) console.error("Error saving subscription:", error);
  }

  if (event.type === "invoice.payment_succeeded") {
    // Handle recurring payment
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    
    // Update current_period_end
    const { error } = await supabase
      .from('subscriptions')
      .update({
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      })
      .eq('stripe_subscription_id', subscription.id);
      
    if(error) console.error("Error updating subscription:", error);
  }

  return new NextResponse(null, { status: 200 });
}
