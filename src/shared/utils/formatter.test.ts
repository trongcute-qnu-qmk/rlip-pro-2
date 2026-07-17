import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPercent } from './formatter';

describe('Formatter Utilities', () => {
  it('formats currency correctly', () => {
    // Note: The exact string might vary slightly by Node version due to spaces vs non-breaking spaces.
    // Using string matching for safety.
    expect(formatCurrency(1000000)).toMatch(/1\.000\.000/);
  });

  it('formats percentage correctly', () => {
    expect(formatPercent(15.5)).toMatch(/15,5%/);
  });
});
