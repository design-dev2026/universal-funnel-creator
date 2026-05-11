import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useWizardStore } from '@/stores/wizardStore';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Package, Monitor, Briefcase, RefreshCw } from 'lucide-react';

const stepOneSchema = z.object({
  productType: z.enum(['physical', 'digital', 'service', 'subscription']),
  productName: z.string().min(2, 'Product name is required'),
  priceRange: z.string().min(1, 'Price range is required'),
  frequency: z.enum(['one-time', 'recurring']),
});

type StepOneForm = z.infer<typeof stepOneSchema>;

const productTypes = [
  { id: 'physical', label: 'Physical', icon: Package },
  { id: 'digital', label: 'Digital', icon: Monitor },
  { id: 'service', label: 'Service', icon: Briefcase },
  { id: 'subscription', label: 'Subscription', icon: RefreshCw },
];

export default function StepOne() {
  const productDetails = useWizardStore((state) => state.productDetails);
  const setProductDetails = useWizardStore((state) => state.setProductDetails);

  const form = useForm<StepOneForm>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      productType: (productDetails?.productType as any) || 'physical',
      productName: (productDetails?.productName as string) || '',
      priceRange: (productDetails?.priceRange as string) || '',
      frequency: (productDetails?.frequency as any) || 'one-time',
    },
  });

  const { watch, setValue, register, formState: { errors } } = form;
  const currentType = watch('productType');

  // We expose a validate function on the component so WizardBase can call it before next
  React.useEffect(() => {
    // Sync to store when form changes
    const subscription = form.watch((value) => {
      setProductDetails(value as Record<string, unknown>);
    });
    return () => subscription.unsubscribe();
  }, [form, setProductDetails]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium">1. Select Product Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productTypes.map((pt) => {
            const Icon = pt.icon;
            const isSelected = currentType === pt.id;
            return (
              <Card 
                key={pt.id}
                className={`cursor-pointer transition-all hover:scale-105 hover:shadow-md ${isSelected ? 'border-primary ring-1 ring-primary' : ''}`}
                onClick={() => setValue('productType', pt.id as any, { shouldValidate: true })}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Icon className={`w-8 h-8 mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>{pt.label}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input id="productName" placeholder="e.g. Acme Ergonomic Chair" {...register('productName')} />
          {errors.productName && <p className="text-sm text-destructive">{errors.productName.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priceRange">Price Range</Label>
            <Select 
              value={watch('priceRange')} 
              onValueChange={(val) => setValue('priceRange', val as string, { shouldValidate: true })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="$0-$50">$0 - $50</SelectItem>
                <SelectItem value="$50-$200">$50 - $200</SelectItem>
                <SelectItem value="$200-$1000">$200 - $1,000</SelectItem>
                <SelectItem value="$1000+">$1,000+</SelectItem>
              </SelectContent>
            </Select>
            {errors.priceRange && <p className="text-sm text-destructive">{errors.priceRange.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Purchase Frequency</Label>
            <Select 
              value={watch('frequency')} 
              onValueChange={(val: any) => setValue('frequency', val, { shouldValidate: true })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-time">One-time</SelectItem>
                <SelectItem value="recurring">Recurring (Subscription)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
