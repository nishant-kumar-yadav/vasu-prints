import { notFound } from 'next/navigation';

export default function TokensDevPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const navySwatches = [
    { name: 'navy-50', hex: '#F2F5F9', bg: 'bg-navy-50', text: 'text-navy-900' },
    { name: 'navy-100', hex: '#E3E9F1', bg: 'bg-navy-100', text: 'text-navy-900' },
    { name: 'navy-200', hex: '#C3CFDD', bg: 'bg-navy-200', text: 'text-navy-900' },
    { name: 'navy-300', hex: '#94A6BC', bg: 'bg-navy-300', text: 'text-navy-900' },
    { name: 'navy-400', hex: '#5F7894', bg: 'bg-navy-400', text: 'text-white' },
    { name: 'navy-500', hex: '#3A5573', bg: 'bg-navy-500', text: 'text-white' },
    { name: 'navy-600', hex: '#23405F', bg: 'bg-navy-600', text: 'text-white' },
    { name: 'navy-700', hex: '#173452', bg: 'bg-navy-700', text: 'text-white' },
    { name: 'navy-800', hex: '#102B46', bg: 'bg-navy-800', text: 'text-white' },
    { name: 'navy-900', hex: '#0B1F33', bg: 'bg-navy-900', text: 'text-white' },
    { name: 'navy-950', hex: '#07141F', bg: 'bg-navy-950', text: 'text-white' },
  ];

  const tealSwatches = [
    { name: 'teal-50', hex: '#E6F7F7', bg: 'bg-teal-50', text: 'text-navy-900' },
    { name: 'teal-100', hex: '#C2EDED', bg: 'bg-teal-100', text: 'text-navy-900' },
    { name: 'teal-200', hex: '#8EDEDE', bg: 'bg-teal-200', text: 'text-navy-900' },
    { name: 'teal-300', hex: '#4FCACA', bg: 'bg-teal-300', text: 'text-navy-900' },
    { name: 'teal-400', hex: '#1AB6B6', bg: 'bg-teal-400', text: 'text-navy-900' },
    { name: 'teal-500', hex: '#00A6A6', bg: 'bg-teal-500', text: 'text-navy-900' },
    { name: 'teal-600', hex: '#008F8F', bg: 'bg-teal-600', text: 'text-white' },
    { name: 'teal-700', hex: '#007A7A', bg: 'bg-teal-700', text: 'text-white' },
    { name: 'teal-800', hex: '#006262', bg: 'bg-teal-800', text: 'text-white' },
  ];

  const surfaceSwatches = [
    { name: 'white', hex: '#FFFFFF', bg: 'bg-white', text: 'text-navy-900' },
    { name: 'surface', hex: '#F6F8FA', bg: 'bg-surface', text: 'text-navy-900' },
    { name: 'surface-2', hex: '#EEF2F6', bg: 'bg-surface-2', text: 'text-navy-900' },
    { name: 'border', hex: '#E2E8F0', bg: 'bg-border', text: 'text-navy-900' },
  ];

  const semanticSwatches = [
    { name: 'success', hex: '#15803D', bg: 'bg-success', text: 'text-white' },
    { name: 'warning', hex: '#B45309', bg: 'bg-warning', text: 'text-white' },
    { name: 'danger', hex: '#B91C1C', bg: 'bg-danger', text: 'text-white' },
    { name: 'whatsapp', hex: '#25D366', bg: 'bg-whatsapp', text: 'text-navy-900' },
  ];

  const contrastPairs = [
    {
      bgClass: 'bg-white',
      textClass: 'text-navy-900',
      pair: 'navy-900 on white',
      ratio: '16.7:1',
      allowed: 'All text',
    },
    {
      bgClass: 'bg-white',
      textClass: 'text-navy-800',
      pair: 'navy-800 on white',
      ratio: '14.4:1',
      allowed: 'All text',
    },
    {
      bgClass: 'bg-navy-800',
      textClass: 'text-white',
      pair: 'white on navy-800',
      ratio: '14.4:1',
      allowed: 'All text',
    },
    {
      bgClass: 'bg-teal-500',
      textClass: 'text-navy-900 font-semibold',
      pair: 'navy-900 on teal-500',
      ratio: '4.8:1',
      allowed: 'Button labels (≥15px, weight 600)',
    },
    {
      bgClass: 'bg-white',
      textClass: 'text-teal-700',
      pair: 'teal-700 on white',
      ratio: '5.2:1',
      allowed: 'Links, eyebrow text',
    },
    {
      bgClass: 'bg-navy-800',
      textClass: 'text-teal-300',
      pair: 'teal-300 on navy-800',
      ratio: '~6.5:1',
      allowed: 'Accent text on dark sections',
    },
  ];

  return (
    <main className="bg-surface min-h-screen p-6 md:p-12">
      <div className="mx-auto max-w-6xl space-y-16">
        <div>
          <span className="text-eyebrow">Design System</span>
          <h1 className="text-h1 text-navy-900 mt-2">VasuPrint Tokens & Styles</h1>
          <p className="text-lead text-text-secondary mt-3">
            Living token gallery displaying color swatches, contrast verification pairs, and
            typography scale.
          </p>
        </div>

        {/* Navy Palette */}
        <section>
          <h2 className="text-h2 text-navy-900 mb-6">Brand Navy Palette</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
            {navySwatches.map((s) => (
              <div
                key={s.name}
                className="border-border overflow-hidden rounded-lg border bg-white shadow-xs"
              >
                <div className={`h-16 w-full ${s.bg}`} />
                <div className="p-2 text-xs">
                  <div className="text-navy-900 font-semibold">{s.name}</div>
                  <div className="text-text-muted">{s.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teal Palette */}
        <section>
          <h2 className="text-h2 text-navy-900 mb-6">Brand Teal Palette</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
            {tealSwatches.map((s) => (
              <div
                key={s.name}
                className="border-border overflow-hidden rounded-lg border bg-white shadow-xs"
              >
                <div className={`h-16 w-full ${s.bg}`} />
                <div className="p-2 text-xs">
                  <div className="text-navy-900 font-semibold">{s.name}</div>
                  <div className="text-text-muted">{s.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Surfaces & Status */}
        <section className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-h2 text-navy-900 mb-6">Surfaces & Borders</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {surfaceSwatches.map((s) => (
                <div
                  key={s.name}
                  className="border-border overflow-hidden rounded-lg border bg-white shadow-xs"
                >
                  <div className={`h-16 w-full ${s.bg} border-border border-b`} />
                  <div className="p-2 text-xs">
                    <div className="text-navy-900 font-semibold">{s.name}</div>
                    <div className="text-text-muted">{s.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-h2 text-navy-900 mb-6">Semantic & WhatsApp</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {semanticSwatches.map((s) => (
                <div
                  key={s.name}
                  className="border-border overflow-hidden rounded-lg border bg-white shadow-xs"
                >
                  <div className={`h-16 w-full ${s.bg}`} />
                  <div className="p-2 text-xs">
                    <div className="text-navy-900 font-semibold">{s.name}</div>
                    <div className="text-text-muted">{s.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contrast Verification Pairs (§2.2) */}
        <section>
          <h2 className="text-h2 text-navy-900 mb-2">Contrast Pairs (DESIGN-SYSTEM §2.2)</h2>
          <p className="text-text-secondary mb-6 text-sm">
            Every pair verified for WCAG AA compliance.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contrastPairs.map((p) => (
              <div
                key={p.pair}
                className={`border-border flex flex-col justify-between rounded-lg border p-6 shadow-sm ${p.bgClass}`}
              >
                <div>
                  <div className="mb-2 font-mono text-xs tracking-wider uppercase opacity-75">
                    Ratio: {p.ratio}
                  </div>
                  <div className={`text-lg font-medium ${p.textClass}`}>{p.pair}</div>
                </div>
                <div className={`mt-4 text-xs opacity-80 ${p.textClass}`}>
                  Allowed for: {p.allowed}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Scale (§3.1) */}
        <section className="border-border space-y-8 rounded-xl border bg-white p-8 shadow-sm">
          <div>
            <h2 className="text-h2 text-navy-900">Type Scale (DESIGN-SYSTEM §3.1)</h2>
            <p className="text-text-secondary text-sm">
              Manrope for headings, Inter for body and UI.
            </p>
          </div>

          <div className="divide-border space-y-6 divide-y pt-4">
            <div className="pt-4">
              <span className="text-text-muted mb-1 block font-mono text-xs">
                text-display (Home Hero H1)
              </span>
              <div className="text-display text-navy-900">
                Packaging That Makes Your Brand Stand Out.
              </div>
            </div>
            <div className="pt-4">
              <span className="text-text-muted mb-1 block font-mono text-xs">
                text-h1 (Page H1)
              </span>
              <div className="text-h1 text-navy-900">Mono Carton Boxes for Retail & Pharma</div>
            </div>
            <div className="pt-4">
              <span className="text-text-muted mb-1 block font-mono text-xs">
                text-h2 (Section Titles)
              </span>
              <div className="text-h2 text-navy-900">
                Printing Solutions Designed Around Your Business
              </div>
            </div>
            <div className="pt-4">
              <span className="text-text-muted mb-1 block font-mono text-xs">
                text-h3 (Card Titles)
              </span>
              <div className="text-h3 text-navy-900">Paper Gumming Stickers & Labels</div>
            </div>
            <div className="pt-4">
              <span className="text-text-muted mb-1 block font-mono text-xs">
                text-h4 (Sub-headings)
              </span>
              <div className="text-h4 text-navy-900">High-Resolution Offset CMYK Printing</div>
            </div>
            <div className="pt-4">
              <span className="text-text-muted mb-1 block font-mono text-xs">
                text-lead (Intro paragraphs)
              </span>
              <p className="text-lead text-text-secondary max-w-prose">
                Custom-manufactured mono cartons with precision dielines, food-grade coatings and
                striking finishes.
              </p>
            </div>
            <div className="pt-4">
              <span className="text-text-muted mb-1 block font-mono text-xs">
                text-body (Default text)
              </span>
              <p className="text-body text-navy-900 max-w-prose">
                We manufacture bulk packaging cartons and custom adhesive stickers engineered to
                your exact product dimensions.
              </p>
            </div>
            <div className="pt-4">
              <span className="text-text-muted mb-1 block font-mono text-xs">
                text-small (Meta, Captions)
              </span>
              <p className="text-small text-text-muted">
                Minimum order quantity: 1,000 units · Dispatch in 5–7 working days
              </p>
            </div>
            <div className="pt-4">
              <span className="text-text-muted mb-1 block font-mono text-xs">
                text-eyebrow (Section Labels)
              </span>
              <div className="text-eyebrow">CUSTOM PACKAGING BOXES</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
