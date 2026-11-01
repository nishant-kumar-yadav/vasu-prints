import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-sm px-2.5 py-1 text-[13px] font-medium leading-none whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-navy-50 text-navy-800',
        teal: 'bg-teal-50 text-teal-800',
        success: 'bg-emerald-50 text-success',
        warning: 'bg-amber-50 text-warning',
        danger: 'bg-red-50 text-danger',
        outline: 'border border-border text-navy-800 bg-white',
        muted: 'bg-surface-2 text-text-muted',
      },
      size: {
        sm: 'h-6 px-2 text-xs',
        md: 'h-7 px-2.5 text-[13px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size, className }))} {...props} />;
}
