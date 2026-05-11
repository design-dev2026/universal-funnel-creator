"use client";

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useWizardStore } from '@/stores/wizardStore';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import BlueprintView from './BlueprintView';

// 1. Lazy load step components
const StepOne = dynamic(() => import('./steps/StepOne'), { ssr: false });
const StepTwo = dynamic(() => import('./steps/StepTwo'), { ssr: false });
const StepThree = dynamic(() => import('./steps/StepThree'), { ssr: false });
const StepFour = dynamic(() => import('./steps/StepFour'), { ssr: false });
const StepFive = dynamic(() => import('./steps/StepFive'), { ssr: false });

const stepsConfig = [
  { id: 0, label: 'Product', component: <StepOne /> },
  { id: 1, label: 'Audience', component: <StepTwo /> },
  { id: 2, label: 'Budget', component: <StepThree /> },
  { id: 3, label: 'Assets', component: <StepFour /> },
  { id: 4, label: 'Generate', component: <StepFive /> },
];

const WizardBase: React.FC = React.memo(() => {
  const currentStep = useWizardStore((state) => state.currentStep);
  const nextStepAction = useWizardStore((state) => state.nextStep);
  const prevStepAction = useWizardStore((state) => state.prevStep);
  const generatedBlueprint = useWizardStore((state) => state.generatedBlueprint);
  const setGeneratedBlueprint = useWizardStore((state) => state.setGeneratedBlueprint);
  
  const productDetails = useWizardStore((state) => state.productDetails);
  const audienceProfile = useWizardStore((state) => state.audienceProfile);
  const goal = useWizardStore((state) => state.goal);
  const budget = useWizardStore((state) => state.budget);
  const assets = useWizardStore((state) => state.assets);

  const [isGenerating, setIsGenerating] = useState(false);

  // If blueprint exists, show it instead of wizard
  if (generatedBlueprint) {
    return <BlueprintView />;
  }

  // Validation logic before proceeding
  const handleNext = () => {
    // Very basic validation - the Zod forms in each step handle actual form-level validation.
    // Ideally we would trigger form submission here, but since Zustand is reactive,
    // we just check if the required store fields are populated for the current step.
    if (currentStep === 0 && (!productDetails || !productDetails.productName)) {
      alert("Please complete the product details.");
      return;
    }
    if (currentStep === 1 && (!audienceProfile || !audienceProfile.personaName)) {
      alert("Please complete the audience details.");
      return;
    }
    nextStepAction();
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // Minimum 2 second loading as requested
      const timer = new Promise(resolve => setTimeout(resolve, 2000));
      
      const payload = { productDetails, audienceProfile, goal, budget, assets };
      const responsePromise = fetch('/api/generate-funnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const [response] = await Promise.all([responsePromise, timer]);
      
      if (!response.ok) throw new Error('Generation failed');
      
      const data = await response.json();
      setGeneratedBlueprint(data.blueprint);
      
    } catch (error) {
      console.error(error);
      alert('Failed to generate blueprint. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const CurrentStepComponent = stepsConfig.find((s) => s.id === currentStep)?.component || <div>Unknown Step</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-card rounded-xl shadow-sm border border-border/50">
      
      {/* Step Indicator */}
      <div className="mb-10">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-secondary -z-10 rounded-full" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 transition-all duration-500 ease-in-out -z-10 rounded-full" 
            style={{ 
              width: `${(currentStep / (stepsConfig.length - 1)) * 100}%`,
              backgroundColor: '#6D28D9' 
            }}
          />
          
          {stepsConfig.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm border-2
                    ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                      isActive ? 'bg-[#6D28D9] border-[#6D28D9] text-white' : 
                      'bg-background border-muted-foreground/30 text-muted-foreground'}
                  `}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                </div>
                <span className={`text-xs mt-2 font-medium ${isActive ? 'text-[#6D28D9]' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            <Loader2 className="w-16 h-16 text-[#6D28D9]" />
          </motion.div>
          <div className="text-center">
            <h3 className="text-2xl font-bold animate-pulse">Building Your Funnel...</h3>
            <p className="text-muted-foreground mt-2">Our rule engine is analyzing your inputs and generating the perfect blueprint.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="min-h-[400px] overflow-x-hidden p-1">
            {CurrentStepComponent}
          </div>

          <div className="mt-8 pt-6 border-t flex justify-between">
            <button 
              onClick={prevStepAction}
              disabled={currentStep === 0}
              className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-md disabled:opacity-50 hover:bg-secondary/80 transition-colors font-medium"
            >
              Back
            </button>
            
            {currentStep === stepsConfig.length - 1 ? (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                className="px-6 py-2.5 bg-[#6D28D9] text-white rounded-md hover:bg-[#5b21b6] transition-colors font-medium shadow-md flex items-center shadow-[#6D28D9]/20"
              >
                Generate My Funnel
              </motion.button>
            ) : (
              <button 
                onClick={handleNext}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium shadow-sm"
              >
                Next Step
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
});

WizardBase.displayName = 'WizardBase';

export default WizardBase;
