'use client';

import * as React from 'react';
import { TooltipProvider } from '@/components/ui';
import { ButtonDemo } from './button-demo';
import { FormDemo } from './form-demo';
import { OverlayDemo } from './overlay-demo';
import { ContentDemo } from './content-demo';

export function UiGallery() {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <span className="text-sm font-semibold tracking-wider text-teal-700 uppercase">
            Development Only
          </span>
          <h1 className="font-display text-navy-900 mt-1 text-3xl font-bold sm:text-4xl">
            UI Primitives Gallery
          </h1>
          <p className="text-text-secondary mt-2 text-base">
            Interactive playground and visual verification for all VasuPrint UI primitives.
          </p>
        </div>

        <ButtonDemo />
        <FormDemo />
        <ContentDemo />
        <OverlayDemo />
      </div>
    </TooltipProvider>
  );
}
