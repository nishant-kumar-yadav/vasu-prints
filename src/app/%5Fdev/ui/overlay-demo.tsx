'use client';

import * as React from 'react';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/components/ui';

export function OverlayDemo() {
  return (
    <section id="overlays" className="space-y-6">
      <div className="border-border border-b pb-3">
        <h2 className="font-display text-navy-900 text-2xl font-semibold">Dialog & Sheet</h2>
        <p className="text-text-secondary text-sm">
          Modal dialogs for details/confirmations and slide-in sheets for mobile navigation.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Sample Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Production Sample</DialogTitle>
              <DialogDescription>
                Review our sample kit options before committing to full production runs.
              </DialogDescription>
            </DialogHeader>
            <div className="text-text-secondary py-2 text-sm">
              Our sample kit includes unprinted paperboard structures, foil swatches, and UV DTF
              test transfers dispatched within 24–48 hours.
            </div>
            <DialogFooter>
              <Button variant="primary">Confirm Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary">Open Navigation Sheet</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>
                Explore categories, custom capabilities, and quick contact.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 py-6">
              <div className="text-navy-900 font-semibold">Product Catalog</div>
              <ul className="text-text-secondary space-y-2 text-sm">
                <li className="cursor-pointer hover:text-teal-700">Rigid Luxury Boxes</li>
                <li className="cursor-pointer hover:text-teal-700">Corrugated Mailer Boxes</li>
                <li className="cursor-pointer hover:text-teal-700">Custom Labels & Stickers</li>
                <li className="cursor-pointer hover:text-teal-700">DTF & UV DTF Transfers</li>
              </ul>
            </div>
            <SheetFooter>
              <Button variant="primary" className="w-full">
                Get a Quote
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
