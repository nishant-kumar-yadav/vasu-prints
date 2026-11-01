import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FoldLineProps extends React.SVGAttributes<SVGSVGElement> {
  orientation?: 'horizontal' | 'vertical';
  length?: number | string;
}

export function FoldLine({
  className,
  orientation = 'horizontal',
  length = '100%',
  ...props
}: FoldLineProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <svg
      width={isHorizontal ? length : '2'}
      height={isHorizontal ? '2' : length}
      viewBox={isHorizontal ? '0 0 100 2' : '0 0 2 100'}
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      aria-hidden="true"
      className={cn('shrink-0 text-current', className)}
      {...props}
    >
      {isHorizontal ? (
        <line x1="0" y1="1" x2="100" y2="1" vectorEffect="non-scaling-stroke" />
      ) : (
        <line x1="1" y1="0" x2="1" y2="100" vectorEffect="non-scaling-stroke" />
      )}
    </svg>
  );
}
