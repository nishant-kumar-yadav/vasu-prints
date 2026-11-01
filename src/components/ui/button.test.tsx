import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button Primitive', () => {
  it('renders button with label', () => {
    render(<Button>Submit Quote</Button>);
    const button = screen.getByRole('button', { name: /submit quote/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'false');
  });

  it('sets aria-busy and disabled when loading', () => {
    render(<Button loading>Submit Quote</Button>);
    const button = screen.getByRole('button', { name: /submit quote/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('renders disabled attribute when disabled is true', () => {
    render(<Button disabled>Disabled Action</Button>);
    const button = screen.getByRole('button', { name: /disabled action/i });
    expect(button).toBeDisabled();
  });

  it('applies variant and size classes properly', () => {
    const { rerender } = render(
      <Button variant="primary" size="lg">
        Hero Button
      </Button>,
    );
    let button = screen.getByRole('button', { name: /hero button/i });
    expect(button).toHaveClass('bg-teal-500');
    expect(button).toHaveClass('h-[52px]');

    rerender(
      <Button variant="secondary" size="sm">
        Admin Button
      </Button>,
    );
    button = screen.getByRole('button', { name: /admin button/i });
    expect(button).toHaveClass('bg-navy-800');
    expect(button).toHaveClass('h-9');

    rerender(<Button variant="outline-inverse">Inverse Button</Button>);
    button = screen.getByRole('button', { name: /inverse button/i });
    expect(button).toHaveClass('border-white/40');
  });

  it('renders arrow icon when showArrow is true', () => {
    const { container } = render(<Button showArrow>Explore Products</Button>);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
