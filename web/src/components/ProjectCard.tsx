import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type ProjectCardProps = {
  title: string;
  description: string;
  stack?: string[];
  href?: string;
  imageSrc?: string;
};

export default function ProjectCard({
  title,
  description,
  stack = [],
  href = '#',
  imageSrc = '/window.svg',
}: ProjectCardProps) {
  const initials = title
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article className="rounded-xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-shadow bg-white">
      <Link href={href} className="block">
        <div className="relative h-36 sm:h-44 w-full bg-neutral-100 flex items-center justify-center">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={`${title} thumbnail`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-neutral-200 text-neutral-700 text-2xl font-bold">
              {initials}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-neutral-600 mt-2 line-clamp-3">
            {description}
          </p>

          {stack.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {stack.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-neutral-100 text-neutral-800 px-2 py-1 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
