'use client';

import * as React from 'react';
import { Button } from '@/components/ui';

export function ButtonDemo() {
  return (
    <section id="buttons" className="space-y-6">
      <div className="border-border border-b pb-3">
        <h2 className="font-display text-navy-900 text-2xl font-semibold">Buttons</h2>
        <p className="text-text-secondary text-sm">
          All variants, sizes, loading, and interactive states.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-navy-700 text-sm font-medium">Variants</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary (Teal)</Button>
          <Button variant="secondary">Secondary (Navy)</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="whatsapp">WhatsApp Action</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>

      <div className="bg-navy-800 space-y-4 rounded-xl p-6">
        <h3 className="text-navy-100 text-sm font-medium">Inverse (on Navy background)</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="outline-inverse">Outline Inverse</Button>
          <Button variant="primary">Primary</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-navy-700 text-sm font-medium">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small (36px - Admin)</Button>
          <Button size="md">Medium (44px - Default)</Button>
          <Button size="lg">Large (52px - Hero/Form)</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-navy-700 text-sm font-medium">States & Enhancements</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button showArrow>With Animated Arrow</Button>
          <Button loading>Loading State</Button>
          <Button disabled>Disabled Button</Button>
        </div>
      </div>
    </section>
  );
}
