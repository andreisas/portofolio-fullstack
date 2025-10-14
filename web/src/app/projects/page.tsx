import React from 'react';
import ProjectCard from '../../components/ProjectCard';

type ApiProject = {
  id: number;
  title: string;
  description: string;
  stack: string[];
};

type ErrorWithDetails = Error & { status?: number; details?: unknown };

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function fetchProjects(): Promise<ApiProject[]> {
  const res = await fetch(`${API_BASE}/projects?limit=12`, {
    cache: 'no-store',
  });
  if (res.status === 404) return [];
  const body = await res.json();
  if (!res.ok) {
    // API returns { error: string, details?: any }
    const message = body?.error || `Failed to fetch projects: ${res.status}`;
    const err = new Error(message) as ErrorWithDetails;
    err.status = res.status;
    err.details = body?.details;
    throw err;
  }
  return body.projects ?? [];
}

export default async function ProjectsPage() {
  let projects: ApiProject[] = [];
  let apiError: { status?: number; message: string; details?: unknown } | null =
    null;
  try {
    projects = await fetchProjects();
  } catch (err) {
    const e = err as ErrorWithDetails;
    console.error('Error fetching projects', e);
    apiError = {
      status: e.status,
      message: e.message || 'Unknown error',
      details: e.details,
    };
  }

  const detailsString = apiError?.details
    ? String(JSON.stringify(apiError.details, null, 2))
    : null;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <header className="mb-8">
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-neutral-600 mt-2">
            Browse a selection of projects showcasing real work. Click a card to
            view details.
          </p>
        </header>

        {apiError ? (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded">
            <div className="font-semibold">
              API Error{apiError.status ? ` (${apiError.status})` : ''}
            </div>
            <div className="mt-1">{apiError.message}</div>
            {detailsString && (
              <pre className="mt-2 text-xs text-red-700 overflow-auto">
                {detailsString}
              </pre>
            )}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-neutral-600 py-12">
            <p className="mb-4">No projects found.</p>
            <p>
              If your API is running, ensure it has seeded projects or try again
              later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                title={p.title}
                description={p.description}
                stack={p.stack}
                href={`/projects/${p.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
