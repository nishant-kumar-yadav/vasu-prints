import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-teal-500 text-navy-900 font-semibold hover:bg-teal-400 active:bg-teal-600 shadow-xs',
        secondary: 'bg-navy-800 text-white hover:bg-navy-600 active:bg-navy-900 shadow-xs',
        outline:
          'border border-navy-200 text-navy-800 bg-white hover:border-navy-800 hover:bg-navy-50 active:bg-navy-100',
        'outline-inverse':
          'border border-white/40 text-white bg-transparent hover:bg-white/10 active:bg-white/20',
        ghost: 'text-navy-800 hover:bg-navy-50 active:bg-navy-100',
        link: 'text-teal-700 underline-offset-4 hover:underline hover:text-teal-800 p-0 h-auto',
        whatsapp:
          'border border-navy-200 text-navy-800 bg-white hover:border-navy-800 hover:bg-navy-50 active:bg-navy-100',
        danger: 'bg-danger text-white hover:bg-danger/90 active:bg-danger/80 shadow-xs',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm',
        md: 'h-11 px-4.5 text-base',
        lg: 'h-[52px] px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  showArrow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading = false, showArrow = false, children, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        ) : null}
        <span>{children}</span>
        {showArrow && !loading ? (
          <ArrowRight
            className="duration-fast size-4.5 transition-transform ease-out group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
