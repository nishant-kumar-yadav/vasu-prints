import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  id: string;
  label?: string;
  optional?: boolean;
  helpText?: string;
  error?: string;
  className?: string;
  children:
    | React.ReactNode
    | ((props: {
        id: string;
        'aria-describedby'?: string;
        'aria-invalid'?: boolean;
      }) => React.ReactNode);
}

export function FormField({
  id,
  label,
  optional,
  helpText,
  error,
  className,
  children,
}: FormFieldProps) {
  const helpId = helpText && !error ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined;

  let renderedChild: React.ReactNode;
  if (typeof children === 'function') {
    renderedChild = children({
      id,
      'aria-describedby': describedBy,
      'aria-invalid': !!error,
    });
  } else if (React.isValidElement(children)) {
    renderedChild = React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      id,
      'aria-describedby': describedBy,
      'aria-invalid': !!error,
    });
  } else {
    renderedChild = children;
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <Label htmlFor={id} optional={optional}>
          {label}
        </Label>
      )}
      {renderedChild}
      {helpText && !error && (
        <p id={helpId} className="text-text-secondary text-sm">
          {helpText}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-danger flex items-center gap-1.5 text-sm font-medium"
        >
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
