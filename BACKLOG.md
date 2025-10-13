# Backlog (prioritized)

This backlog maps roadmap items into prioritized, actionable tasks we can work on. Each item includes a suggested issue title and acceptance criteria.

## How to use
- We'll work top-to-bottom. Create a branch per issue (e.g., `feat/issue-8`) and reference the issue number in commits/PRs.
- Update this file as priorities change.

---

## Priority: P0 (MVP - high impact)

1. Add project screenshots and live demo links (Issue: `feat/projects-media`)
   - Description: Add `screenshots: string[]` and `demoUrl` fields to the Project model, update API and frontend to show images and demo links on project list/detail pages.
   - Acceptance criteria:
     - Projects API responses include `screenshots` and `demoUrl`.
     - Frontend displays a hero image on project details and thumbnails on the list.
     - If no screenshots, a placeholder is shown.

2. Contact CTA and resume download (Issue: `feat/contact-resume`)
   - Description: Add a persistent Contact button that opens a contact form (sends email or mailto) and a prominent resume/CV download link.
   - Acceptance criteria:
     - Contact button visible on all pages.
     - Resume download works and `resume.pdf` is present in `web/public`.

3. Search & filter by tech stack (Issue: `feat/search-filter`)
   - Description: Add API support for filtering projects by stack and keywords; add UI controls for filters and search.
   - Acceptance criteria:
     - `GET /projects?stack=Node.js&query=auth` returns matching results.
     - UI has a filter dropdown and search box; results update accordingly.

---

## Priority: P1 (Important)

4. Minimal Admin UI for project CRUD (Issue: `feat/admin-ui`)
   - Description: A simple admin interface protected by admin auth to create/update/delete projects, upload screenshot URLs, toggle publish state.
   - Acceptance criteria:
     - Admin routes require `requireAdmin` middleware.
     - Projects created in Admin UI appear on the public site after publishing.

5. Image handling and CDN integration (Issue: `chore/media-cdn`)
   - Description: Allow image uploads, add resizing (optional) and configure a CDN or static hosting for media.
   - Acceptance criteria:
     - Images uploaded are stored under `web/public/uploads` or an external CDN URL.
     - Frontend serves optimized images.

6. Generate TypeScript client from OpenAPI (Issue: `chore/generate-client`)
   - Description: Add a script to generate a typed client from `api/docs/openapi.yaml` for use in the frontend or external consumers.
   - Acceptance criteria:
     - `npm run generate-client` produces a client in `web/src/api-client` or `api-client` folder.

---

## Priority: P2 (Nice-to-have)

7. Shortlist export for recruiters (CSV/PDF) (Issue: `feat/shortlist-export`)
8. Add testimonials/case studies (Issue: `feat/testimonials`)
9. Add analytics (privacy-aware) (Issue: `chore/analytics`)
10. CI: Add OpenAPI validation (Spectral) (Issue: `chore/spectral-ci`)

---

If you'd like, I can create GitHub issues for the top 3 items and scaffold branches for them. Which ones should I open first? (My recommendation: start with `feat/projects-media`, then `feat/contact-resume`, then `feat/search-filter`.)
