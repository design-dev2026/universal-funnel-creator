import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useWizardStore } from '@/stores/wizardStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { User, Store, Building } from 'lucide-react'; // Fallbacks

const stepTwoSchema = z.object({
  personaName: z.string().min(2, 'Persona name is required'),
  demographics: z.string().min(5, 'Please provide some demographics'),
  painPoints: z.string().min(5, 'Please list at least one pain point'),
  awarenessLevel: z.enum(['unaware', 'problem-aware', 'solution-aware', 'product-aware', 'most-aware']),
});

type StepTwoForm = z.infer<typeof stepTwoSchema>;

const personas = [
  {
    id: 'smb',
    name: 'Small Business Owner',
    icon: Store,
    demographics: 'Age 30-55, local service provider or retailer, 1-10 employees.',
    painPoints: 'Lack of time, unpredictable revenue, high overhead costs.',
  },
  {
    id: 'ecomm',
    name: 'E-commerce Manager',
    icon: User,
    demographics: 'Age 25-45, tech-savvy, works at $1M-$10M brand.',
    painPoints: 'High CAC, low retention rate, complex inventory management.',
  },
  {
    id: 'b2b',
    name: 'B2B Enterprise',
    icon: Building,
    demographics: 'Director/VP level, large corporation, multiple decision makers.',
    painPoints: 'Inefficient workflows, siloed data, long sales cycles.',
  },
];

export default function StepTwo() {
  const audienceProfile = useWizardStore((state) => state.audienceProfile);
  const setAudienceProfile = useWizardStore((state) => state.setAudienceProfile);

  const form = useForm<StepTwoForm>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      personaName: (audienceProfile?.personaName as string) || '',
      demographics: (audienceProfile?.demographics as string) || '',
      painPoints: (audienceProfile?.painPoints as string) || '',
      awarenessLevel: (audienceProfile?.awarenessLevel as any) || 'problem-aware',
    },
  });

  const { watch, setValue, register, formState: { errors } } = form;

  const handlePersonaSelect = (persona: typeof personas[0]) => {
    setValue('personaName', persona.name, { shouldValidate: true });
    setValue('demographics', persona.demographics, { shouldValidate: true });
    setValue('painPoints', persona.painPoints, { shouldValidate: true });
  };

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      setAudienceProfile(value as Record<string, unknown>);
    });
    return () => subscription.unsubscribe();
  }, [form, setAudienceProfile]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Quick Start: Choose a Persona</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <Card 
                key={p.id}
                className="cursor-pointer transition-all hover:scale-105 hover:shadow-md"
                onClick={() => handlePersonaSelect(p)}
              >
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    {p.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-xs text-muted-foreground">
                  <p className="truncate">{p.painPoints}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-medium">Customize Persona</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="personaName">Persona Name</Label>
            <Input id="personaName" placeholder="e.g. Freelance Designer" {...register('personaName')} />
            {errors.personaName && <p className="text-sm text-destructive">{errors.personaName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="demographics">Demographics</Label>
            <Textarea id="demographics" placeholder="Describe their age, location, income, job..." {...register('demographics')} />
            {errors.demographics && <p className="text-sm text-destructive">{errors.demographics.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="painPoints">Pain Points</Label>
            <Textarea id="painPoints" placeholder="What keeps them up at night?" {...register('painPoints')} />
            {errors.painPoints && <p className="text-sm text-destructive">{errors.painPoints.message}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-medium">Awareness Level</h3>
        <RadioGroup 
          value={watch('awarenessLevel')}
          onValueChange={(val: any) => setValue('awarenessLevel', val, { shouldValidate: true })}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-secondary/50 cursor-pointer transition-colors" onClick={() => setValue('awarenessLevel', 'unaware')}>
            <RadioGroupItem value="unaware" id="unaware" />
            <Label htmlFor="unaware" className="cursor-pointer">Unaware <span className="block text-xs text-muted-foreground font-normal">Don't know they have a problem</span></Label>
          </div>
          <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-secondary/50 cursor-pointer transition-colors" onClick={() => setValue('awarenessLevel', 'problem-aware')}>
            <RadioGroupItem value="problem-aware" id="problem-aware" />
            <Label htmlFor="problem-aware" className="cursor-pointer">Problem Aware <span className="block text-xs text-muted-foreground font-normal">Know the problem, seeking solutions</span></Label>
          </div>
          <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-secondary/50 cursor-pointer transition-colors" onClick={() => setValue('awarenessLevel', 'solution-aware')}>
            <RadioGroupItem value="solution-aware" id="solution-aware" />
            <Label htmlFor="solution-aware" className="cursor-pointer">Solution Aware <span className="block text-xs text-muted-foreground font-normal">Know solutions exist, comparing</span></Label>
          </div>
          <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-secondary/50 cursor-pointer transition-colors" onClick={() => setValue('awarenessLevel', 'product-aware')}>
            <RadioGroupItem value="product-aware" id="product-aware" />
            <Label htmlFor="product-aware" className="cursor-pointer">Product Aware <span className="block text-xs text-muted-foreground font-normal">Know your product, need an offer</span></Label>
          </div>
          <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-secondary/50 cursor-pointer transition-colors md:col-span-2" onClick={() => setValue('awarenessLevel', 'most-aware')}>
            <RadioGroupItem value="most-aware" id="most-aware" />
            <Label htmlFor="most-aware" className="cursor-pointer">Most Aware <span className="block text-xs text-muted-foreground font-normal">Ready to buy, need a push</span></Label>
          </div>
        </RadioGroup>
      </div>
    </motion.div>
  );
}
