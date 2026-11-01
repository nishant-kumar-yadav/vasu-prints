'use client';

import * as React from 'react';
import { CropMarks, RegistrationMark, FoldLine, DielineFrame } from '@/components/site/motifs';
import { WhatsApp } from '@/components/site/icons';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';

export function MotifDemo() {
  const { ref: revealRef, isRevealed } = useReveal();

  return (
    <section id="motifs-and-icons" className="space-y-6">
      <div className="border-border border-b pb-3">
        <h2 className="font-display text-navy-900 text-2xl font-semibold">
          Packaging Motifs & Brand Icons
        </h2>
        <p className="text-text-secondary text-sm">
          Dieline signatures, crop marks, registration targets, fold lines, and the WhatsApp icon.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Crop Marks & Registration */}
        <div className="border-border space-y-4 rounded-xl border bg-white p-6 shadow-xs">
          <h3 className="font-display text-navy-900 text-base font-semibold">
            Print Production Marks
          </h3>
          <p className="text-text-secondary text-sm">
            Used as subtle aesthetic background details and corner accents.
          </p>
          <div className="flex flex-wrap items-center gap-8 pt-2">
            <div className="flex flex-col items-center gap-2">
              <CropMarks size={48} className="text-teal-600" />
              <span className="text-text-muted text-xs">CropMarks</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RegistrationMark size={32} className="text-navy-700" />
              <span className="text-text-muted text-xs">RegistrationMark</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RegistrationMark size={24} className="text-teal-500" />
              <span className="text-text-muted text-xs">24px (Teal)</span>
            </div>
          </div>
        </div>

        {/* Fold Lines */}
        <div className="border-border space-y-4 rounded-xl border bg-white p-6 shadow-xs">
          <h3 className="font-display text-navy-900 text-base font-semibold">Dashed Fold Lines</h3>
          <p className="text-text-secondary text-sm">
            Connects StepCards on desktop and indicates structural fold lines.
          </p>
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <span className="text-text-muted text-xs">Horizontal (100% width)</span>
              <FoldLine orientation="horizontal" className="text-teal-400" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-text-muted text-xs">Vertical Fold Line (48px)</span>
              <FoldLine orientation="vertical" length={48} className="text-navy-400" />
            </div>
          </div>
        </div>

        {/* Dieline Frame on Surface */}
        <div className="border-border bg-surface-2 flex flex-col items-center justify-center rounded-xl border p-6 text-center">
          <DielineFrame className="text-teal-700 opacity-80" />
          <p className="text-navy-800 mt-3 text-xs font-medium">
            DielineFrame (Light Surface / 404 Motif)
          </p>
        </div>

        {/* Dieline Frame on Navy */}
        <div className="bg-navy-900 flex flex-col items-center justify-center rounded-xl p-6 text-center">
          <DielineFrame className="text-teal-400 opacity-60" />
          <p className="text-navy-100 mt-3 text-xs font-medium">
            DielineFrame (Dark Section / Hero Background)
          </p>
        </div>
      </div>

      {/* WhatsApp Official Glyph */}
      <div className="border-border space-y-4 rounded-xl border bg-white p-6 shadow-xs">
        <h3 className="font-display text-navy-900 text-base font-semibold">
          Official WhatsApp Glyph
        </h3>
        <p className="text-text-secondary text-sm">
          Rendered in official WhatsApp green (#25D366) or white on dark backgrounds.
        </p>
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <div className="border-border flex items-center gap-2 rounded-lg border px-4 py-2">
            <WhatsApp size={24} className="text-whatsapp" />
            <span className="text-navy-900 text-sm font-medium">WhatsApp (#25D366)</span>
          </div>
          <div className="bg-navy-900 flex items-center gap-2 rounded-lg px-4 py-2 text-white">
            <WhatsApp size={24} className="text-white" />
            <span className="text-sm font-medium">WhatsApp on Navy</span>
          </div>
        </div>
      </div>

      {/* useReveal Scroll Demo */}
      <div
        ref={revealRef}
        className={cn(
          'border-border duration-slow rounded-xl border bg-white p-6 shadow-xs transition-all ease-out',
          isRevealed
            ? 'translate-y-0 opacity-100'
            : 'translate-y-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
        )}
      >
        <h3 className="font-display text-navy-900 text-base font-semibold">
          Scroll Reveal Animation (useReveal)
        </h3>
        <p className="text-text-secondary text-sm">
          Triggers smoothly when scrolled into view. Strictly adheres to prefers-reduced-motion to
          avoid unnecessary animations.
        </p>
      </div>
    </section>
  );
}
