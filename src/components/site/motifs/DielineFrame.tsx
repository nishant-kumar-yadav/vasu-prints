import * as React from 'react';
import { cn } from '@/lib/utils';

export interface DielineFrameProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

export function DielineFrame({
  className,
  width = 280,
  height = 200,
  ...props
}: DielineFrameProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 280 200"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={cn('shrink-0 text-current', className)}
      {...props}
    >
      {/* Outer Cut Lines (solid, 1.5px) */}
      <path
        d="M 50,40 L 70,20 L 210,20 L 230,40 L 250,40 L 250,160 L 230,160 L 210,180 L 70,180 L 50,160 L 30,160 L 30,40 Z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Glue tab / side flap */}
      <path d="M 30,55 L 15,65 L 15,135 L 30,145" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Internal Fold Lines (dashed, 1.2px) */}
      <line x1="80" y1="40" x2="80" y2="160" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1="140" y1="40" x2="140" y2="160" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1="200" y1="40" x2="200" y2="160" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1="30" y1="40" x2="250" y2="40" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1="30" y1="160" x2="250" y2="160" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1="30" y1="55" x2="30" y2="145" strokeWidth="1.2" strokeDasharray="4 3" />

      {/* Flap Tuck Slits */}
      <line x1="95" y1="20" x2="125" y2="20" strokeWidth="1.5" />
      <line x1="155" y1="20" x2="185" y2="20" strokeWidth="1.5" />

      {/* Corner Crop Indicators */}
      <line x1="8" y1="8" x2="16" y2="8" strokeWidth="1" />
      <line x1="8" y1="8" x2="8" y2="16" strokeWidth="1" />
      <line x1="272" y1="8" x2="264" y2="8" strokeWidth="1" />
      <line x1="272" y1="8" x2="272" y2="16" strokeWidth="1" />
      <line x1="8" y1="192" x2="16" y2="192" strokeWidth="1" />
      <line x1="8" y1="192" x2="8" y2="184" strokeWidth="1" />
      <line x1="272" y1="192" x2="264" y2="192" strokeWidth="1" />
      <line x1="272" y1="192" x2="272" y2="184" strokeWidth="1" />

      {/* Registration Marks on edge */}
      <circle cx="265" cy="100" r="4" strokeWidth="1" />
      <line x1="265" y1="94" x2="265" y2="106" strokeWidth="1" />
      <line x1="259" y1="100" x2="271" y2="100" strokeWidth="1" />
    </svg>
  );
}
