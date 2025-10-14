import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

type ApiProject = {
  id: number;
  title: string;
  description: string;
  stack: string[];
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: { id: number; name: string; email: string };
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type ErrorWithDetails = Error & { status?: number; details?: unknown };

async function fetchProject(id: string): Promise<ApiProject | null> {
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      cache: 'no-store',
    });
    const body = await res.json();
    if (!res.ok) {
      // For non-ok responses, signal failure by returning null; caller will fetch the body for display
      return null as unknown as ApiProject;
    }
    return body as ApiProject;
  } catch (err) {
    console.error('Error fetching project', err);
    return null as unknown as ApiProject;
  }
}

export default async function ProjectDetail({ params }: Props) {
  const { id } = params;

  let project: ApiProject | null = null;
  let apiError: { status?: number; message: string; details?: unknown } | null =
    null;
  try {
    project = await fetchProject(id);
  } catch (err) {
    const e = err as ErrorWithDetails;
    apiError = {
      status: e.status,
      message: e.message || 'Unknown error',
      details: e.details,
    };
  }

  // If project is null (fetchProject returned null), attempt to read the API error JSON
  if (!project) {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        cache: 'no-store',
      });
      const body = await res.json().catch(() => ({}));
      apiError = {
        status: res.status,
        message: body?.error || `Failed to fetch project: ${res.status}`,
        details: body?.details,
      };
    } catch {
      // If the secondary fetch fails, fall back to notFound
      return notFound();
    }
  }

  const detailsString = apiError?.details
    ? String(JSON.stringify(apiError.details, null, 2))
    : null;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/projects"
          className="text-sm text-neutral-600 hover:underline"
        >
          ← Back to projects
        </Link>

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
        ) : (
          <>
            <h1 className="text-3xl font-bold mt-4">{project!.title}</h1>

            <div className="mt-6 rounded-lg overflow-hidden border border-neutral-100">
              <div className="relative h-60 w-full bg-neutral-100">
                <Image
                  src="/globe.svg"
                  alt="project screenshot"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <p className="text-neutral-700 whitespace-pre-line">
                  {project!.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project!.stack?.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-neutral-100 text-neutral-800 px-2 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    className="inline-block bg-black text-white px-4 py-2 rounded-md"
                    href="#"
                  >
                    View demo
                  </a>

                  <a
                    className="inline-block border border-neutral-200 px-4 py-2 rounded-md"
                    href="#"
                  >
                    View repo
                  </a>
                </div>

                <div className="mt-6 text-sm text-neutral-500">
                  <div>Posted by: {project!.user?.name || 'Unknown'}</div>
                  <div>
                    Created: {new Date(project!.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
