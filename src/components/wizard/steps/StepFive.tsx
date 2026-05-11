import React from 'react';
import { useWizardStore } from '@/stores/wizardStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function StepFive() {
  const { productDetails, audienceProfile, goal, budget, assets } = useWizardStore();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2 mb-6">
        <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
        <h3 className="text-2xl font-bold">Ready to Generate</h3>
        <p className="text-muted-foreground">Review your inputs before we build your funnel blueprint.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">Product</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{String(productDetails?.productName || 'Not specified')}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="capitalize">{String(productDetails?.productType || 'N/A')}</Badge>
              <Badge variant="outline">{String(productDetails?.priceRange || 'N/A')}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{String(audienceProfile?.personaName || 'Not specified')}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="capitalize">
                {String(audienceProfile?.awarenessLevel || 'N/A').replace('-', ' ')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">Goal & Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium capitalize">{goal || 'Not specified'}</p>
            <p className="text-2xl font-bold mt-1">${budget || 0}/mo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">Assets</CardTitle>
          </CardHeader>
          <CardContent>
            {assets.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {assets.map((asset) => (
                  <Badge key={asset} variant="secondary">{asset}</Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Starting from scratch</p>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
