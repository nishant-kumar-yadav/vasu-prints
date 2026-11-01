import { notFound } from 'next/navigation';
import { UiGallery } from './ui-gallery';

export const dynamic = 'force-dynamic';

export default function UiDevPage() {
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_DEV_PAGES !== 'true') {
    notFound();
  }

  return (
    <main className="bg-surface min-h-screen py-8">
      <UiGallery />
    </main>
  );
}
