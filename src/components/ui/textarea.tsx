import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={error || props['aria-invalid']}
        className={cn(
          'border-border text-navy-900 flex min-h-[120px] w-full rounded-md border bg-white px-3.5 py-3 text-base shadow-xs transition-colors',
          'placeholder:text-text-muted resize-y',
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

Textarea.displayName = 'Textarea';
