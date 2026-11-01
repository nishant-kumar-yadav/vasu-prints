import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RegistrationMarkProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number | string;
}

export function RegistrationMark({ className, size = 24, ...props }: RegistrationMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
      className={cn('shrink-0 text-current', className)}
      {...props}
    >
      {/* Outer target circle */}
      <circle cx="12" cy="12" r="7" />
      {/* Inner precision circle */}
      <circle cx="12" cy="12" r="3" />
      {/* Vertical crosshair */}
      <line x1="12" y1="2" x2="12" y2="22" strokeLinecap="round" />
      {/* Horizontal crosshair */}
      <line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" />
    </svg>
  );
}
