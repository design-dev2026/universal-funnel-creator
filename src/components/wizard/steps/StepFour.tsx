import React from 'react';
import { useWizardStore } from '@/stores/wizardStore';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const assetOptions = [
  { id: 'website', label: 'Website / Landing Page' },
  { id: 'emailList', label: 'Email List' },
  { id: 'social', label: 'Social Following' },
  { id: 'store', label: 'Physical Store' },
  { id: 'salesTeam', label: 'Sales Team' },
];

export default function StepFour() {
  const assets = useWizardStore((state) => state.assets);
  const setAssets = useWizardStore((state) => state.setAssets);
  
  const [emailSize, setEmailSize] = React.useState('');

  const toggleAsset = (id: string) => {
    if (id === 'none') {
      setAssets([]);
      return;
    }
    
    if (assets.includes(id)) {
      setAssets(assets.filter(a => a !== id));
    } else {
      setAssets([...assets.filter(a => a !== 'none'), id]);
    }
  };

  const isNone = assets.length === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium">4. Asset Inventory</h3>
        <p className="text-sm text-muted-foreground">What existing assets can we leverage?</p>
        
        <div className="space-y-4 pt-4">
          {assetOptions.map((asset) => (
            <div key={asset.id} className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={asset.id} 
                  checked={assets.includes(asset.id)}
                  onCheckedChange={() => toggleAsset(asset.id)}
                />
                <Label htmlFor={asset.id} className="cursor-pointer font-normal">
                  {asset.label}
                </Label>
              </div>
              
              {asset.id === 'emailList' && assets.includes('emailList') && (
                <div className="pl-6 pt-1">
                  <Input 
                    placeholder="Approximate list size (e.g., 5000)" 
                    value={emailSize}
                    onChange={(e) => setEmailSize(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
              )}
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="none" 
                checked={isNone}
                onCheckedChange={() => toggleAsset('none')}
              />
              <Label htmlFor="none" className="cursor-pointer font-normal text-muted-foreground">
                None of the above (starting from scratch)
              </Label>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
