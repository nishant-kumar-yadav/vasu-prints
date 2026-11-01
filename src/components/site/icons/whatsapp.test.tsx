import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WhatsApp } from './WhatsApp';

describe('WhatsApp Icon', () => {
  it('renders official glyph with aria-hidden', () => {
    const { container } = render(<WhatsApp size={24} className="text-whatsapp" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveClass('text-whatsapp');
    expect(container.querySelector('path')).toBeInTheDocument();
  });
});
