import { describe, it, expect } from 'vitest';
import { generateFunnel } from '../src/lib/engine/ruleEngine';

describe('ruleEngine.generateFunnel', () => {
  it('1. should return a valid blueprint object for basic input', () => {
    const input = { goal: 'lead_gen' };
    const result = generateFunnel(input);
    expect(result.blueprintId).toBeDefined();
    expect(result.stages.length).toBeGreaterThan(0);
  });

  it('2. should handle missing fields without throwing', () => {
    const result = generateFunnel({});
    expect(result.metadata.inputUsed).toEqual({});
    expect(result.stages[0].name).toBe('Awareness');
  });

  it('3. should handle extreme budgets gracefully', () => {
    const result = generateFunnel({ budget: 100000000 });
    expect(result.metadata.inputUsed.budget).toBe(100000000);
  });

  it('4. should process empty channels list', () => {
    const result = generateFunnel({ channels: [] });
    expect(result.metadata.inputUsed.channels).toEqual([]);
  });

  it('5. should handle physical product types', () => {
    const result = generateFunnel({ productType: 'physical' });
    expect(result.metadata.inputUsed.productType).toBe('physical');
  });

  it('6. should handle digital product types', () => {
    const result = generateFunnel({ productType: 'digital' });
    expect(result.metadata.inputUsed.productType).toBe('digital');
  });

  it('7. should handle service product types', () => {
    const result = generateFunnel({ productType: 'service' });
    expect(result.metadata.inputUsed.productType).toBe('service');
  });

  it('8. should process B2B audience', () => {
    const result = generateFunnel({ audience: 'b2b' });
    expect(result.metadata.inputUsed.audience).toBe('b2b');
  });

  it('9. should process B2C audience', () => {
    const result = generateFunnel({ audience: 'b2c' });
    expect(result.metadata.inputUsed.audience).toBe('b2c');
  });

  it('10. should handle low budgets gracefully', () => {
    const result = generateFunnel({ budget: 5 });
    expect(result.metadata.inputUsed.budget).toBe(5);
  });
});
