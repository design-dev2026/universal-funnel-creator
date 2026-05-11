import * as fs from 'fs';
import * as path from 'path';
import { generateFunnel } from '../src/lib/engine/ruleEngine';

const input = {
  productDetails: {
    productType: 'subscription',
    productName: 'Universal Funnel Creator',
    priceRange: '$49/month',
    frequency: 'recurring',
  },
  audienceProfile: {
    personaName: 'Small Business Owner, E-commerce Manager, and Creative Professional',
    demographics: 'Founders, Marketers, Solo-preneurs',
    painPoints: 'struggling to build funnels, waste money on ads',
    awarenessLevel: 'problem-aware',
  },
  budget: 0,
  goal: 'leads',
  assets: [],
};

async function run() {
  console.log('Generating Self-Test Blueprint...');
  const blueprint = generateFunnel(input);
  
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outPath = path.join(publicDir, 'meta-funnel-blueprint.json');
  fs.writeFileSync(outPath, JSON.stringify(blueprint, null, 2));
  
  console.log(`Blueprint written to: ${outPath}`);
}

run().catch(console.error);
