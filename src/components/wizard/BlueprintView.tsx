import React from 'react';
import { useWizardStore } from '@/stores/wizardStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Megaphone, Mail, Monitor, Phone, Download, Rocket, Settings2, Copy, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const getChannelIcon = (channel: string) => {
  switch (channel.toLowerCase()) {
    case 'facebook':
    case 'instagram':
    case 'social':
      return <Megaphone className="w-5 h-5" />;
    case 'email':
      return <Mail className="w-5 h-5" />;
    case 'web':
    case 'landing_page':
      return <Monitor className="w-5 h-5" />;
    case 'sales_call':
    case 'phone':
      return <Phone className="w-5 h-5" />;
    default:
      return <Megaphone className="w-5 h-5" />;
  }
};

export default function BlueprintView() {
  const blueprint = useWizardStore((state) => state.generatedBlueprint);
  const resetWizard = useWizardStore((state) => state.resetWizard);

  if (!blueprint) return null;

  const stages = Array.isArray(blueprint.stages) ? blueprint.stages : [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Your Funnel Blueprint</h2>
          <p className="text-muted-foreground mt-1">Ready to deploy. Built specifically for your audience and goals.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => alert("Switching to Expert View...")}>
            <Settings2 className="w-4 h-4 mr-2" /> Expert View
          </Button>
          <Button variant="outline" onClick={() => alert("Exporting PDF...")}>
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button onClick={() => alert("Deploying Blueprint to integrations...")}>
            <Rocket className="w-4 h-4 mr-2" /> Deploy
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-xl font-semibold">Funnel Architecture</h3>
          <div className="relative pl-6 space-y-8 border-l-2 border-primary/20 ml-3">
            {stages.map((stage: any, index: number) => (
              <div key={stage.id} className="relative">
                <div className="absolute -left-9 bg-background p-1 rounded-full border-2 border-primary text-primary">
                  {getChannelIcon(stage.channel || 'web')}
                </div>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{stage.name}</CardTitle>
                    <CardDescription className="capitalize">{stage.type?.replace('_', ' ')} • {stage.channel}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>Goal:</strong> {stage.copyTemplate?.callToAction || 'Advance to next step'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="copy" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="copy">Copy Templates</TabsTrigger>
              <TabsTrigger value="workflow">Automation Workflow</TabsTrigger>
              <TabsTrigger value="metrics">Metrics to Track</TabsTrigger>
            </TabsList>

            <TabsContent value="copy" className="space-y-4">
              {stages.map((stage: any) => (
                <Card key={`copy-${stage.id}`}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-md">{stage.name} Copy</CardTitle>
                      <CardDescription>{stage.type}</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm"><Copy className="w-4 h-4 mr-2" /> Copy</Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-4 rounded-md font-mono text-sm">
                      <p className="font-semibold mb-2">{stage.copyTemplate?.headline}</p>
                      <p className="whitespace-pre-wrap">{stage.copyTemplate?.body}</p>
                      <div className="mt-4 inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold">
                        {stage.copyTemplate?.callToAction}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="workflow" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trigger & Action Sequence</CardTitle>
                  <CardDescription>Configure these in your CRM or Marketing Automation tool.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Play className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-semibold">Trigger: Lead Opts In</p>
                        <p className="text-sm text-muted-foreground">User submits form on Consideration Landing Page.</p>
                      </div>
                    </div>
                    <div className="pl-2 border-l-2 ml-2 h-6 border-dashed border-muted-foreground/30"></div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-semibold">Action: Send Welcome Email</p>
                        <p className="text-sm text-muted-foreground">Deliver lead magnet and introduce brand.</p>
                      </div>
                    </div>
                    <div className="pl-2 border-l-2 ml-2 h-6 border-dashed border-muted-foreground/30"></div>
                    <div className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full border-2 border-yellow-500 flex items-center justify-center text-[10px] font-bold mt-0.5">W</div>
                      <div>
                        <p className="font-semibold">Wait: 1 Day</p>
                      </div>
                    </div>
                    <div className="pl-2 border-l-2 ml-2 h-6 border-dashed border-muted-foreground/30"></div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-semibold">Action: Send Value / Proof Email</p>
                        <p className="text-sm text-muted-foreground">Share case study to build trust.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>KPI Dashboard</CardTitle>
                  <CardDescription>Benchmarks to aim for.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-secondary/20 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Ad CTR</p>
                      <p className="text-2xl font-bold text-primary mt-1">&gt; 1.5%</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Opt-in Rate</p>
                      <p className="text-2xl font-bold text-primary mt-1">20-30%</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Email Open</p>
                      <p className="text-2xl font-bold text-primary mt-1">35%+</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Conversion</p>
                      <p className="text-2xl font-bold text-primary mt-1">2-5%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="flex justify-center mt-12 pt-8 border-t">
        <Button variant="ghost" onClick={resetWizard}>Start Over</Button>
      </div>
    </motion.div>
  );
}
