import { create } from 'zustand';

interface WizardState {
  currentStep: number;
  productDetails: Record<string, unknown> | null;
  audienceProfile: Record<string, unknown> | null;
  goal: string | null;
  budget: number | null;
  assets: string[];
  generatedBlueprint: Record<string, unknown> | null;
  
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  setProductDetails: (details: Record<string, unknown>) => void;
  setAudienceProfile: (profile: Record<string, unknown>) => void;
  setGoalAndBudget: (goal: string, budget: number) => void;
  setAssets: (assets: string[]) => void;
  setGeneratedBlueprint: (blueprint: Record<string, unknown>) => void;
  
  resetWizard: () => void;
}

export const useWizardStore = create<WizardState>((set) => ({
  currentStep: 0,
  productDetails: null,
  audienceProfile: null,
  goal: null,
  budget: null,
  assets: [],
  generatedBlueprint: null,
  
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  
  setProductDetails: (details) => set({ productDetails: details }),
  setAudienceProfile: (profile) => set({ audienceProfile: profile }),
  setGoalAndBudget: (goal, budget) => set({ goal, budget }),
  setAssets: (assets) => set({ assets }),
  setGeneratedBlueprint: (blueprint) => set({ generatedBlueprint: blueprint }),
  
  resetWizard: () => set({ 
    currentStep: 0, 
    productDetails: null, 
    audienceProfile: null, 
    goal: null, 
    budget: null, 
    assets: [], 
    generatedBlueprint: null 
  }),
}));
