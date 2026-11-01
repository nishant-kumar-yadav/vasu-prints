'use client';

import * as React from 'react';
import {
  Badge,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Skeleton,
  Separator,
  Button,
} from '@/components/ui';

export function ContentDemo() {
  return (
    <>
      {/* BADGES & CHIPS */}
      <section id="badges" className="space-y-6">
        <div className="border-border border-b pb-3">
          <h2 className="font-display text-navy-900 text-2xl font-semibold">
            Badges & Status Chips
          </h2>
          <p className="text-text-secondary text-sm">
            Categories, finishes, stock chips, and admin lead status badges.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default">Default / Navy (New)</Badge>
          <Badge variant="teal">Teal Highlight</Badge>
          <Badge variant="success">Won / Active</Badge>
          <Badge variant="warning">Quoted / In Review</Badge>
          <Badge variant="danger">High Priority / Urgent</Badge>
          <Badge variant="outline">Outline Chip</Badge>
          <Badge variant="muted">Muted / Archived</Badge>
        </div>

        <div className="flex items-center gap-3">
          <Badge size="sm" variant="teal">
            Small (24px)
          </Badge>
          <Badge size="md" variant="teal">
            Medium (28px - Default)
          </Badge>
        </div>
      </section>

      {/* ACCORDION (FAQ) */}
      <section id="accordion" className="space-y-6">
        <div className="border-border border-b pb-3">
          <h2 className="font-display text-navy-900 text-2xl font-semibold">Accordion (FAQ)</h2>
          <p className="text-text-secondary text-sm">
            Collapsible FAQ items with rotating Plus icon and 1px dividers.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the minimum order quantity (MOQ)?</AccordionTrigger>
            <AccordionContent>
              MOQs vary by product category. Rigid luxury boxes start at 500 units, corrugated
              shipping cartons at 250 units, and custom stickers or DTF sheets can be ordered in
              batches starting from 100 units.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What artwork file formats do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept vector formats for optimal sharpness: CDR, AI, EPS, PDF, and SVG. For raster
              artwork, high-resolution TIFF, PSD, or PNG files (at least 300 DPI at actual print
              size with CMYK colour profile) are accepted.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Do you provide physical structural samples?</AccordionTrigger>
            <AccordionContent>
              Yes. We can provide blank unprinted mockups (dieline proofs) to verify sizing and fit
              for your product, as well as digitally printed proof sheets before full production
              begins.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* TOOLTIP, SKELETON & SEPARATOR */}
      <section id="other" className="space-y-6">
        <div className="border-border border-b pb-3">
          <h2 className="font-display text-navy-900 text-2xl font-semibold">
            Tooltips, Skeletons & Separator
          </h2>
          <p className="text-text-secondary text-sm">
            Helper hints, loading states, and layout dividers.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-navy-700 text-sm font-medium">Tooltips</h3>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover or Focus for Tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>Custom dielines prepared in 24 hours</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="text-navy-700 text-sm font-medium">Skeletons (Pulse Shimmer)</h3>
          <div className="flex items-center space-x-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
