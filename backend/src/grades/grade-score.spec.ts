import { describe, expect, it } from 'vitest';
import { isGradeWithinMaximum } from './grade-score.js';

describe('isGradeWithinMaximum', () => {
  it('accepts scores within the configured maximum', () => {
    expect(isGradeWithinMaximum(0, 100)).toBe(true);
    expect(isGradeWithinMaximum(87.5, 100)).toBe(true);
    expect(isGradeWithinMaximum(10, 10)).toBe(true);
  });

  it('rejects scores above the maximum or invalid numeric values', () => {
    expect(isGradeWithinMaximum(101, 100)).toBe(false);
    expect(isGradeWithinMaximum(-1, 100)).toBe(false);
    expect(isGradeWithinMaximum(1, 0)).toBe(false);
    expect(isGradeWithinMaximum(Number.NaN, 100)).toBe(false);
  });
});
