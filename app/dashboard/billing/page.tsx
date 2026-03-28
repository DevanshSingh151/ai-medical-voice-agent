import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// A simple mock pricing table mimicking what Clerk provides for Stripe integrations
export default function BillingPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Upgrade Your Plan</h1>
          <p className="text-muted-foreground">Get unlimited access to AI specialist consultations</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Free Plan */}
          <div className="rounded-2xl border bg-card p-8 flex flex-col items-start gap-4 shadow-sm h-full">
            <h3 className="text-2xl font-bold">Basic</h3>
            <p className="text-muted-foreground text-sm">Perfect for quick general health questions.</p>
            <div className="text-4xl font-bold my-4">Free</div>
            <Button variant="outline" className="w-full rounded-full" disabled>Current Plan</Button>
            
            <div className="space-y-3 mt-6 w-full">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>1 free consultation per month</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>Access to General Physician AI</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>Basic structured medical reports</span>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="rounded-2xl border-2 border-primary bg-card p-8 flex flex-col items-start gap-4 shadow-lg ring-4 ring-primary/10 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 py-1 px-4 bg-primary text-primary-foreground text-xs font-bold rounded-bl-lg uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-primary">Pro Care</h3>
            <p className="text-muted-foreground text-sm">Comprehensive access for you and your family.</p>
            <div className="text-4xl font-bold my-4">$19<span className="text-xl text-muted-foreground font-normal">/mo</span></div>
            <Button className="w-full rounded-full shadow-md text-md font-semibold h-11 transition-transform hover:scale-105">Upgrade to Pro</Button>
            
            <div className="space-y-3 mt-6 w-full">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Unlimited AI consultations</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Access to ALL 8 Specialists</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Priority low-latency voice routing</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Comprehensive PDF report exports</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-8">
          Billing functionality is in demo mode. Real Stripe integration requires setting up products in Clerk dashboard.
        </p>
      </div>
    </div>
  );
}
