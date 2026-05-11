"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Users, Eye, Activity, Target, Mail, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardMeta() {
  const [blueprint, setBlueprint] = useState<any>(null);

  useEffect(() => {
    // Fetch the generated blueprint for the self-test funnel
    fetch('/meta-funnel-blueprint.json')
      .then(res => res.json())
      .then(data => setBlueprint(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Landing Page
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight">Meta Funnel Dashboard</h1>
          <p className="text-xl text-muted-foreground mt-2">The System Selling Itself</p>
        </div>
        <Link href="/">
          <Button size="lg" className="bg-[#6D28D9] hover:bg-[#5b21b6]">Join the Beta</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">+14% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Captured</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-muted-foreground mt-1">6.7% conversion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funnel Completion Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-muted-foreground mt-1">Above 30% benchmark</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal: 100 Beta Testers</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84 / 100</div>
            <div className="w-full bg-secondary h-2 mt-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: '84%' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Live Funnel Performance</h2>
        {blueprint ? (
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {blueprint.stages.map((stage: any, i: number) => (
              <React.Fragment key={stage.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="w-full md:w-64"
                >
                  <Card className="text-center relative overflow-hidden border-primary/20">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6D28D9] to-primary" />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{stage.name}</CardTitle>
                      <CardDescription className="capitalize">{stage.type.replace('_', ' ')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary mb-1">
                        {i === 0 ? '1.2k' : i === 1 ? '340' : i === 2 ? '84' : '12'}
                      </div>
                      <p className="text-xs text-muted-foreground">Visitors</p>
                    </CardContent>
                  </Card>
                </motion.div>
                {i < blueprint.stages.length - 1 && (
                  <ArrowDown className="md:-rotate-90 w-8 h-8 text-muted-foreground/30 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12 animate-pulse">
            Loading blueprint visualization...
          </div>
        )}
      </div>
    </div>
  );
}
