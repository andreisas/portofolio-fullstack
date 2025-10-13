// web/src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <section className="min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Welcome to DevFinder
        </h1>

        <p className="text-lg sm:text-xl text-neutral-700 mb-8">
          We help companies find top developers — and help developers land the
          right job by showcasing real project work, clearly and quickly.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/projects"
            className="inline-block bg-black text-white px-6 py-3 rounded-full font-medium hover:opacity-95"
          >
            See projects
          </Link>

          <Link
            href="/projects/add"
            className="inline-block border border-neutral-300 text-neutral-800 px-6 py-3 rounded-full font-medium hover:bg-neutral-100"
          >
            Add your project
          </Link>
        </div>
      </div>
    </section>
  );
}
