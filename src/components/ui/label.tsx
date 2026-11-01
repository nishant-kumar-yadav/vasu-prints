import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  optional?: boolean;
}

export const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, children, optional = false, ...props }, ref) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(
          'text-navy-900 text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className,
        )}
        {...props}
      >
        {children}
        {optional && <span className="text-text-muted ml-1 text-xs font-normal">(optional)</span>}
      </LabelPrimitive.Root>
    );
  },
);

Label.displayName = LabelPrimitive.Root.displayName;
