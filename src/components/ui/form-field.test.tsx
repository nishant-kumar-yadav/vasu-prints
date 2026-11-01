import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormField } from './form-field';
import { Input } from './input';

describe('FormField Primitive', () => {
  it('associates label with input using htmlFor and id', () => {
    render(
      <FormField id="company" label="Company Name">
        {(props) => <Input {...props} />}
      </FormField>,
    );

    const input = screen.getByLabelText('Company Name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'company');
  });

  it('shows (optional) marker only when optional is true', () => {
    const { rerender } = render(
      <FormField id="company" label="Company Name" optional>
        {(props) => <Input {...props} />}
      </FormField>,
    );

    expect(screen.getByText('(optional)')).toBeInTheDocument();

    rerender(
      <FormField id="company" label="Company Name">
        {(props) => <Input {...props} />}
      </FormField>,
    );

    expect(screen.queryByText('(optional)')).not.toBeInTheDocument();
  });

  it('links help text via aria-describedby', () => {
    render(
      <FormField
        id="phone"
        label="Phone Number"
        helpText="Include country code for international delivery"
      >
        {(props) => <Input {...props} />}
      </FormField>,
    );

    const input = screen.getByLabelText('Phone Number');
    expect(input).toHaveAttribute('aria-describedby', 'phone-help');
    expect(screen.getByText('Include country code for international delivery')).toHaveAttribute(
      'id',
      'phone-help',
    );
  });

  it('wires error message, AlertCircle icon, aria-invalid, and alert role', () => {
    render(
      <FormField
        id="email"
        label="Email Address"
        helpText="We will send your quote here"
        error="Please provide a valid work email"
      >
        {(props) => <Input {...props} />}
      </FormField>,
    );

    const input = screen.getByLabelText('Email Address');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');

    const alertMessage = screen.getByRole('alert');
    expect(alertMessage).toHaveTextContent('Please provide a valid work email');
    expect(alertMessage).toHaveAttribute('id', 'email-error');
  });

  it('supports direct React element child cloning with id and a11y attributes', () => {
    render(
      <FormField id="quantity" label="Quantity" error="Minimum quantity is 100 units">
        <Input />
      </FormField>,
    );

    const input = screen.getByLabelText('Quantity');
    expect(input).toHaveAttribute('id', 'quantity');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'quantity-error');
  });
});
