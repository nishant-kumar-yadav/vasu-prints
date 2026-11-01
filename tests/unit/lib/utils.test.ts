import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('Utility cn()', () => {
  it('combines class names correctly', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'is-active', false && 'is-hidden')).toBe('base is-active');
  });

  it('merges tailwind classes conflict-free', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
    expect(cn('bg-navy-800', 'bg-navy-900')).toBe('bg-navy-900');
  });
});
