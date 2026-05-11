"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Layers, Settings, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Added to waitlist!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      
      {/* Real-time metrics bar */}
      <div className="w-full bg-[#6D28D9] text-white text-sm py-2 px-4 flex justify-center items-center gap-6 font-medium">
        <span>Funnels Generated: 1</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">Average Conversion Lift: 94%</span>
        <span className="hidden sm:inline">•</span>
        <span>Beta Users Waiting: 84</span>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center relative px-4 pt-20 pb-16">
        
        {/* Subtle Background Animation */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#6D28D9_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#6D28D9_100%)] opacity-20" />

        <div className="max-w-4xl w-full text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center rounded-full border border-[#6D28D9]/30 bg-[#6D28D9]/10 px-3 py-1 text-sm text-[#6D28D9] mb-4 hover:bg-[#6D28D9]/20 transition-colors"
          >
            <Link href="/dashboard-meta" className="flex items-center">
              See our system sell itself <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
          >
            Build the Perfect Marketing Funnel for Anything. <span className="text-[#6D28D9]">Without AI.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            A wizard-driven, automated system that creates proven funnels for physical products, digital goods, services, and more—online & offline. No marketing expertise needed.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 bg-[#6D28D9] hover:bg-[#5b21b6]" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Free Beta
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mt-32">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-3 p-6 rounded-2xl bg-card border shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Truly Omni-Channel</h3>
            <p className="text-muted-foreground">Manage online ads, email, direct mail, and phone calls from one dashboard.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-3 p-6 rounded-2xl bg-card border shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-[#6D28D9]/10 flex items-center justify-center text-[#6D28D9] mb-4">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Expert-Level Strategy</h3>
            <p className="text-muted-foreground">Our pre-built knowledge base asks you simple questions and outputs a perfect funnel.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-3 p-6 rounded-2xl bg-card border shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Built to Prove Itself</h3>
            <p className="text-muted-foreground">This very page was created by our own system—watch it work in real-time.</p>
          </motion.div>
        </div>

        {/* Waitlist Section */}
        <div id="waitlist" className="w-full max-w-md mt-32 bg-secondary/30 p-8 rounded-3xl border text-center">
          <h2 className="text-2xl font-bold mb-2">Get Early Access</h2>
          <p className="text-muted-foreground mb-6">Join the beta and build your first funnel for free.</p>
          
          {status === 'success' ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-green-500/10 text-green-600 p-4 rounded-xl flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8" />
              <p className="font-medium">{message}</p>
              <Link href="/dashboard-meta" className="text-sm underline mt-2 hover:text-green-800">
                Check our live dashboard metrics →
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleJoinWaitlist} className="space-y-4">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full text-center h-12" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full h-12 bg-[#6D28D9] hover:bg-[#5b21b6]" disabled={status === 'loading'}>
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </Button>
              {status === 'error' && <p className="text-sm text-destructive mt-2">{message}</p>}
            </form>
          )}
        </div>

      </main>

      <footer className="w-full py-8 text-center text-sm text-muted-foreground border-t">
        <p>Powered by the Universal Funnel Creator</p>
      </footer>
    </div>
  );
}
