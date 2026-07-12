import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Image as ImageIcon, Zap, Lock, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-6 py-4 flex items-center justify-between glass sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">PhotoFlugel</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-24 md:py-32 flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium mb-8 bg-muted/50">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Gemini AI Integration Ready
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            Visualize the Impossible
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            PhotoFlugel is the premium AI image generation platform for creators, designers, and visionaries. 
            Transform your ideas into breathtaking visuals in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto group">
                Start Generating <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Explore Features
              </Button>
            </Link>
          </div>
          
          <div className="mt-20 w-full max-w-4xl aspect-video rounded-xl overflow-hidden glass-card relative group">
            {/* Placeholder for Hero Image Demo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground font-medium">Breathtaking Visuals go here</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-24 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Crafted for Excellence</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need to produce studio-quality assets, without the studio.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Lightning Fast", desc: "Optimized infrastructure delivers your images in mere seconds." },
                { icon: Sparkles, title: "Unmatched Detail", desc: "Powered by the latest AI models for photorealistic results." },
                { icon: Lock, title: "Private & Secure", desc: "Your prompts and generated assets are entirely yours." },
              ].map((f, i) => (
                <div key={i} className="glass-card p-6 rounded-xl text-left hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-6 py-24 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground text-lg">Choose the perfect plan for your creative workflow.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Free", price: "$0", desc: "Perfect for exploring.", features: ["10 Generations", "Standard Speed", "Community Support"] },
              { name: "Pro", price: "$20", desc: "For professional creators.", features: ["Unlimited Generations", "Fast Processing", "Commercial Rights", "Priority Support"], popular: true },
              { name: "Business", price: "$99", desc: "For teams and enterprises.", features: ["Everything in Pro", "API Access", "Concurrent Generations", "Dedicated Account Manager"] },
            ].map((p, i) => (
              <div key={i} className={`glass-card p-8 rounded-xl flex flex-col ${p.popular ? 'border-primary ring-1 ring-primary' : ''}`}>
                {p.popular && <div className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Most Popular</div>}
                <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                <div className="text-4xl font-bold mb-2">{p.price}<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                <p className="text-muted-foreground mb-6">{p.desc}</p>
                <ul className="mb-8 flex-1 space-y-3">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={p.popular ? "default" : "outline"} className="w-full">
                  {p.price === "$0" ? "Start Free" : "Subscribe Now"}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 text-center">
          <div className="max-w-3xl mx-auto glass-card p-12 rounded-2xl border-primary/20">
            <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to create something amazing?</h2>
            <p className="text-xl text-muted-foreground mb-8">Join thousands of creators using PhotoFlugel today.</p>
            <Link href="/sign-up">
              <Button size="lg" className="px-8 text-lg">Get Started for Free</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold tracking-tight">PhotoFlugel</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 PhotoFlugel. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
