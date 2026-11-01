import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CropMarks, DielineFrame, RegistrationMark, FoldLine } from './index';

describe('Packaging Motifs', () => {
  it('renders CropMarks with aria-hidden and customizable size', () => {
    const { container } = render(<CropMarks size={64} className="text-teal-500" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveClass('text-teal-500');
  });

  it('renders RegistrationMark with precision crosshair circles', () => {
    const { container } = render(<RegistrationMark size={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('circle').length).toBe(2);
    expect(container.querySelectorAll('line').length).toBe(2);
  });

  it('renders FoldLine in horizontal and vertical orientations with dashed styling', () => {
    const { container: hContainer } = render(<FoldLine orientation="horizontal" length="200" />);
    const hSvg = hContainer.querySelector('svg');
    expect(hSvg).toHaveAttribute('stroke-dasharray', '4 4');
    expect(hSvg).toHaveAttribute('width', '200');

    const { container: vContainer } = render(<FoldLine orientation="vertical" length="150" />);
    const vSvg = vContainer.querySelector('svg');
    expect(vSvg).toHaveAttribute('stroke-dasharray', '4 4');
    expect(vSvg).toHaveAttribute('height', '150');
  });

  it('renders DielineFrame with box cut path and fold lines', () => {
    const { container } = render(
      <DielineFrame width={320} height={240} className="text-teal-700" />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('width', '320');
    expect(svg).toHaveAttribute('height', '240');
    expect(container.querySelectorAll('path').length).toBeGreaterThanOrEqual(1);
  });
});
