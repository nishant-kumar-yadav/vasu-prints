import { notFound } from 'next/navigation';
import { UiGallery } from './ui-gallery';

export default function UiDevPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <main className="bg-surface min-h-screen py-8">
      <UiGallery />
    </main>
  );
}
