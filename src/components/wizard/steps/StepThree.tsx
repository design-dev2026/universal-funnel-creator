import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useWizardStore } from '@/stores/wizardStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const stepThreeSchema = z.object({
  goal: z.string().min(1, 'Goal is required'),
  budget: z.number().min(100).max(50000),
});

type StepThreeForm = z.infer<typeof stepThreeSchema>;

export default function StepThree() {
  const goalStore = useWizardStore((state) => state.goal);
  const budgetStore = useWizardStore((state) => state.budget);
  const setGoalAndBudget = useWizardStore((state) => state.setGoalAndBudget);

  const form = useForm<StepThreeForm>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      goal: goalStore || 'sales',
      budget: budgetStore || 1000,
    },
  });

  const { watch, setValue, register, formState: { errors } } = form;
  const currentBudget = watch('budget');
  const currentGoal = watch('goal');

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      setGoalAndBudget(value.goal as string, value.budget as number);
    });
    return () => subscription.unsubscribe();
  }, [form, setGoalAndBudget]);

  const getRecommendedChannels = () => {
    if (currentBudget < 1000) return 'Email + Social (Organic)';
    if (currentBudget <= 5000) return 'Paid Ads (Meta/Google) + Email';
    return 'Omni-channel (Multi-touch Ads, Email, Retargeting)';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium">3. Goal & Budget</h3>
        
        <div className="space-y-2">
          <Label htmlFor="goal">Primary Goal</Label>
          <Select 
            value={currentGoal} 
            onValueChange={(val) => setValue('goal', val as string, { shouldValidate: true })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales & Revenue</SelectItem>
              <SelectItem value="leads">Lead Generation</SelectItem>
              <SelectItem value="webinars">Webinar Registrations</SelectItem>
              <SelectItem value="calls">Booked Calls</SelectItem>
            </SelectContent>
          </Select>
          {errors.goal && <p className="text-sm text-destructive">{errors.goal.message}</p>}
        </div>

        <div className="space-y-6 pt-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="budget">Monthly Budget ($)</Label>
            <div className="w-32">
              <Input 
                type="number" 
                value={currentBudget} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) {
                    setValue('budget', val, { shouldValidate: true });
                  }
                }}
              />
            </div>
          </div>
          
          <Slider 
            value={[currentBudget]} 
            min={100} 
            max={50000} 
            step={100}
            onValueChange={(val: any) => setValue('budget', Array.isArray(val) ? val[0] : val, { shouldValidate: true })}
          />
          {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
        </div>

        <Card className="mt-8 bg-secondary/30 border-primary/20">
          <CardContent className="p-4 flex items-start gap-4">
            <Info className="w-6 h-6 text-primary mt-1 shrink-0" />
            <div>
              <h4 className="font-medium text-primary">Recommended Channel Mix</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Based on your {currentGoal} goal and ${currentBudget} budget, we recommend:
              </p>
              <p className="font-semibold mt-2">{getRecommendedChannels()}</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </motion.div>
  );
}
