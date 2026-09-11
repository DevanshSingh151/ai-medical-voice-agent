"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import {
  ActivitySquare,
  ArrowRight,
  Brain,
  FileHeart,
  Lock,
  Mic,
  Stethoscope,
  Video
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { isLoaded, userId } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 lg:px-40 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-xl tracking-tight leading-none text-foreground/90">Vital<span className="text-primary font-black">Agent</span></span>
          </Link>
          <div className="flex items-center gap-4">
            {isLoaded && userId ? (
              <Button asChild className="rounded-full shadow-md font-semibold px-6 hover:shadow-lg transition-all">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden sm:inline-flex rounded-full">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild className="rounded-full shadow-md font-semibold px-6 hover:shadow-lg transition-all">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Background Gradients */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
          </div>

          <div className="container mx-auto px-4 lg:px-40 flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Introducing Next-Gen AI Medical Assistant
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mb-6">
              Your Personal AI Doctor, <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
                A Voice Call Away.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Experience real-time medical consultations with specialized AI doctors. Describe your symptoms, get immediate guidance, and receive a comprehensive structured medical report instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1" asChild>
                <Link href={userId ? "/dashboard" : "/sign-up"}>
                  <Mic className="mr-2 h-5 w-5" /> Start Free Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-semibold bg-background/50 backdrop-blur-sm hover:bg-muted" asChild>
                <Link href="#features">
                  See How It Works <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-40">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Everything you need for immediate care</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powered by cutting-edge voice orchestration and Gemini LLMs to provide a seamless clinical experience.
              </p>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
              {/* Feature 1 - Large spanning col */}
              <div className="md:col-span-2 rounded-3xl border bg-card p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 w-full max-w-md">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Mic className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Real-Time Voice AI</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Ultra-low latency (~300ms) two-way voice conversations with empathetic AI doctors that understand context, tone, and complex symptoms.
                  </p>
                </div>
                {/* Visual Graphic */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              </div>

              {/* Feature 2 */}
              <div className="rounded-3xl border bg-primary text-primary-foreground p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">8 Specialists</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    From General Physicians to Cardiologists and Dermatologists. The right expert for your specific concern.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="rounded-3xl border bg-card p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6">
                    <FileHeart className="h-6 w-6 text-violet-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Instant Reports</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Automatically generated structured medical reports via Gemini API with chief complaints, symptoms, and actionable recommendations.
                  </p>
                </div>
              </div>

              {/* Feature 4 - Large spanning col */}
              <div className="md:col-span-2 rounded-3xl border bg-card p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-muted/50 to-transparent flex items-center justify-end pr-8 overflow-hidden pointer-events-none">
                  {/* Decorative Elements */}
                   <div className="bg-background rounded-xl p-4 shadow-sm border border-border/50 translate-x-12 opacity-50">
                    <div className="h-3 w-32 bg-muted rounded-full mb-3" />
                    <div className="h-3 w-24 bg-muted rounded-full" />
                   </div>
                </div>
                <div className="relative z-10 w-full max-w-md">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                    <Lock className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Secure & Private</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Your health data is stored securely. Robust authentication by Clerk and high-performance serverless storage with Neon PostgreSQL.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-card border-t">
          <div className="container mx-auto px-4 lg:px-40 text-center">
             <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to prioritize your health?</h2>
             <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
               Join thousands of early adopters using AI to get instant access to personalized medical guidance.
             </p>
             <Button size="lg" className="rounded-full h-14 px-10 text-lg font-bold shadow-xl hover:scale-105 transition-transform" asChild>
                <Link href={userId ? "/dashboard" : "/sign-up"}>
                  {userId ? "Go to Dashboard" : "Create Free Account"}
                </Link>
             </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-40 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0 grayscale opacity-80">
            <Logo className="h-6 w-6" />
            <span className="font-bold">VitalAgent</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} AI Medical Voice Agent SaaS. This is a hackathon/demo project. Not real medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
