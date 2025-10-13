// web/src/app/layout.tsx
import './globals.css';
import Link from 'next/link';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans">
        <header className="bg-white/80 backdrop-blur sticky top-0 z-10 border-b">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold">
              YourName
            </Link>

            <nav aria-label="Primary" className="space-x-6">
              <Link href="/" className="text-sm hover:underline">
                Home
              </Link>
              <Link href="/projects" className="text-sm hover:underline">
                Projects
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 mx-auto max-w-5xl px-4 sm:px-6 py-8 w-full">
          {children}
        </main>

        <footer className="bg-muted border-t">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 text-sm text-center">
            © {new Date().getFullYear()} YourName —{' '}
            <a
              href="https://github.com/andreisas/portofolio-fullstack"
              className="underline"
            >
              Source
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
