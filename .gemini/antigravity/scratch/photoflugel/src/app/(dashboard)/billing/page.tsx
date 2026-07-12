"use client";

import { CreditCard, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Billing & Credits</h1>
        <p className="text-muted-foreground">Manage your subscription and usage.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Credits Card */}
        <div className="glass-card p-6 rounded-2xl border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Available Credits</h2>
              <p className="text-sm text-muted-foreground">Reset in 14 days</p>
            </div>
          </div>
          <div className="text-4xl font-bold mb-6">10</div>
          <Button className="w-full">Upgrade for Unlimited</Button>
        </div>

        {/* Current Plan */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-secondary rounded-lg">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Current Plan</h2>
              <p className="text-sm text-muted-foreground">Free Tier</p>
            </div>
          </div>
          <div className="text-4xl font-bold mb-6">$0<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
          <Button variant="outline" className="w-full">Manage Payment Methods</Button>
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mb-6">Upgrade to Pro</h2>
      <div className="glass-card p-8 rounded-2xl border-primary/30 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-bold">Pro Plan Features</h3>
          <ul className="space-y-2">
            {["Unlimited image generations", "Priority processing speed", "Commercial usage rights", "Advanced style controls"].map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-auto text-center">
          <div className="text-3xl font-bold mb-4">$20<span className="text-sm text-muted-foreground font-normal">/month</span></div>
          <Button size="lg" className="w-full px-12">Upgrade Now</Button>
        </div>
      </div>
    </div>
  );
}
