# Project Roadmap & Vision

This document captures the vision, target users, and short-term roadmap for the Fullstack Portfolio project.

## Vision

Create a lightweight, self-hosted portfolio platform that:

- Lets developers showcase projects with rich metadata (screenshots, tech stack, live demos).
- Exposes a documented API so other sites and tools can consume portfolio data.
- Makes it easy for recruiters and potential clients to discover relevant work and contact the developer.

## Primary Personas

- Programmers (portfolio owners): want an easy way to publish and manage projects and show professional proof of work.
- Recruiters / Hiring managers: want to quickly scan, filter, and evaluate candidates by viewing project summaries, tech stack and demos.
- Integrators / Other devs: want a stable API and OpenAPI spec so they can embed or generate clients.

## MVP Features (short-term)

1. Public Project List and Detail pages
   - Title, short/long description, tech stack, screenshots/gifs, live demo & repo links.
2. Admin-protected CRUD for projects (API & simple admin UI or script)
3. Search & filter by tech stack / keywords
4. Contact CTA and resume download
5. OpenAPI spec bundled in `api/docs/openapi.yaml` and Swagger UI at `/docs`

## Next Priorities (post-MVP)

- Improve media handling (image uploads + CDN + resizing)
- Add testimonials/case studies and SEO improvements
- Add shortlists/CSV export for recruiters
- Add analytics and privacy-respecting tracking

## Integrations & Developer Experience

- Provide a typed client generation path from the OpenAPI spec (TypeScript SDK)
- Provide a small CLI for admins to add projects or upload images
- CI checks: tests, lint, and optional OpenAPI validation

## Acceptance Criteria

- All public endpoints documented in the OpenAPI spec with examples
- Admin routes secured with JWT and role checks
- Repo includes README with clear developer onboarding steps (migrations, seed, dev server)

## How to contribute

1. Open an issue describing the feature or bug.
2. Create a branch from `main` with a clear name (e.g., `feat/issue-8`).
3. Add tests and update the OpenAPI spec for any API changes.
4. Open a PR and request review.

---

If you'd like, I can convert items from this roadmap into issues and create a prioritized backlog so we can work through them one-by-one.
