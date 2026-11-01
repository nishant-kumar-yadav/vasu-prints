import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from '@/app/page';

describe('Smoke Test', () => {
  it('renders home page without crashing', () => {
    const { container } = render(<HomePage />);
    expect(container).toBeInTheDocument();
  });
});
