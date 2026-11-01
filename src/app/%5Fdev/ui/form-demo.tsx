'use client';

import * as React from 'react';
import {
  Input,
  Textarea,
  Label,
  FormField,
  Checkbox,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
} from '@/components/ui';

export function FormDemo() {
  const [checkboxChecked, setCheckboxChecked] = React.useState<boolean | 'indeterminate'>(true);
  const [selectValue, setSelectValue] = React.useState<string>('rigid-boxes');

  return (
    <section id="form-controls" className="space-y-6">
      <div className="border-border border-b pb-3">
        <h2 className="font-display text-navy-900 text-2xl font-semibold">Form Controls</h2>
        <p className="text-text-secondary text-sm">
          Input, Textarea, Select, Checkbox, Label, and FormField wiring.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          id="full-name"
          label="Contact Name"
          helpText="Enter your official business contact name"
        >
          {(fieldProps) => (
            <Input {...fieldProps} placeholder="e.g. Rajesh Sharma" defaultValue="" />
          )}
        </FormField>

        <FormField
          id="email-error"
          label="Work Email"
          error="Please enter a valid business email address"
        >
          {(fieldProps) => <Input {...fieldProps} type="email" defaultValue="invalid-email" />}
        </FormField>

        <FormField
          id="company-name"
          label="Company Name"
          optional
          helpText="Optional if ordering as an individual brand"
        >
          {(fieldProps) => <Input {...fieldProps} placeholder="Vasu Enterprises" />}
        </FormField>

        <FormField id="category-select" label="Product Category">
          {() => (
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger id="category-select">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Packaging</SelectLabel>
                  <SelectItem value="rigid-boxes">Rigid Luxury Boxes</SelectItem>
                  <SelectItem value="corrugated">Corrugated Mailer Boxes</SelectItem>
                  <SelectItem value="folding-cartons">Folding Cartons</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Prints & Transfers</SelectLabel>
                  <SelectItem value="stickers">Custom Stickers</SelectItem>
                  <SelectItem value="dtf">DTF Transfers</SelectItem>
                  <SelectItem value="uv-dtf">UV DTF Decals</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </FormField>
      </div>

      <FormField
        id="specifications"
        label="Project Specifications & Requirements"
        optional
        helpText="Include dimensions (L x W x H in mm), quantity, material preference, and finishing details."
      >
        {(fieldProps) => (
          <Textarea
            {...fieldProps}
            rows={4}
            placeholder="e.g. 500 pcs rigid box, 200x150x50 mm, matte black with gold foil logo..."
          />
        )}
      </FormField>

      <div className="flex flex-col gap-4 pt-2">
        <h3 className="text-navy-700 text-sm font-medium">Checkboxes</h3>
        <div className="flex items-center space-x-3">
          <Checkbox id="terms" checked={checkboxChecked} onCheckedChange={setCheckboxChecked} />
          <Label htmlFor="terms" className="cursor-pointer">
            I agree to the sample review and artwork requirements
          </Label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="terms-disabled" disabled checked />
          <Label htmlFor="terms-disabled" className="cursor-not-allowed opacity-50">
            Disabled checked agreement option
          </Label>
        </div>
      </div>
    </section>
  );
}
