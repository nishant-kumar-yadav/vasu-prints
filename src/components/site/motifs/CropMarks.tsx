import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CropMarksProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number | string;
}

export function CropMarks({ className, size = 48, ...props }: CropMarksProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      className={cn('shrink-0 text-current', className)}
      {...props}
    >
      {/* Top-Left Crop Marks */}
      <line x1="0" y1="12" x2="12" y2="12" />
      <line x1="12" y1="0" x2="12" y2="12" />

      {/* Top-Right Crop Marks */}
      <line x1="36" y1="0" x2="36" y2="12" />
      <line x1="36" y1="12" x2="48" y2="12" />

      {/* Bottom-Left Crop Marks */}
      <line x1="0" y1="36" x2="12" y2="36" />
      <line x1="12" y1="36" x2="12" y2="48" />

      {/* Bottom-Right Crop Marks */}
      <line x1="36" y1="36" x2="36" y2="48" />
      <line x1="36" y1="36" x2="48" y2="36" />
    </svg>
  );
}
