import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        aria-invalid={error || props['aria-invalid']}
        className={cn(
          'border-border text-navy-900 flex h-12 w-full rounded-md border bg-white px-3.5 py-2 text-base shadow-xs transition-colors',
          'placeholder:text-text-muted',
          'focus-visible:border-teal-500 focus-visible:ring-3 focus-visible:ring-teal-100 focus-visible:outline-none',
          'aria-invalid:border-danger aria-invalid:focus-visible:border-danger aria-invalid:focus-visible:ring-danger/15',
          'disabled:bg-surface-2 disabled:text-text-muted disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
