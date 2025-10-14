import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';
import ProjectsPage from './page';

describe('ProjectsPage', () => {
  beforeEach(() => {
    // ensure fetch is defined and reset for each test
    // we'll replace it with a mock implementation per-test
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders projects when API returns projects', async () => {
    const projectsBody = {
      projects: [
        { id: 1, title: 'Project One', description: 'desc', stack: ['React'] },
      ],
    };

    (globalThis as unknown as { fetch: unknown }).fetch = vi.fn(() =>
      Promise.resolve({ ok: true, status: 200, json: async () => projectsBody })
    );

    const el = (await ProjectsPage()) as Promise<ReactElement> | ReactElement;
    const { getByText } = render((await el) as ReactElement);

    expect(getByText('Project One')).toBeInTheDocument();
    expect(getByText('desc')).toBeInTheDocument();
    expect(getByText('React')).toBeInTheDocument();
  });

  it('shows empty state when API returns 404', async () => {
    (globalThis as unknown as { fetch: unknown }).fetch = vi.fn(() =>
      Promise.resolve({ status: 404, ok: false })
    );

    const el404 = (await ProjectsPage()) as
      | Promise<ReactElement>
      | ReactElement;
    const { getByText } = render((await el404) as ReactElement);

    expect(getByText('No projects found.')).toBeInTheDocument();
  });

  it('shows API error when API returns an error payload', async () => {
    (globalThis as unknown as { fetch: unknown }).fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: async () => ({
          error: 'DB down',
          details: { reason: 'connection' },
        }),
      })
    );

    const elErr = (await ProjectsPage()) as
      | Promise<ReactElement>
      | ReactElement;
    const { getByText } = render((await elErr) as ReactElement);

    expect(getByText('API Error (500)')).toBeInTheDocument();
    expect(getByText('DB down')).toBeInTheDocument();
  });
});
