# Fullstack Portfolio

This repository contains a fullstack portfolio example. It includes:

- Frontend: Next.js (TypeScript)
- Backend: Node.js + Express (TypeScript) with Prisma (Postgres)

This README focuses on local setup, testing, and using the API docs.

## Quick start (dev)

1. Clone the repo

```powershell
git clone git@github.com:andreisas/portofolio-fullstack.git
cd portofolio-fullstack
```

2. Start the backend (API)

```powershell
cd api
npm install
npm run dev
```

API health: http://localhost:4000/health
API docs (Swagger UI): http://localhost:4000/docs

3. Start the frontend

```powershell
cd ../web
npm install
npm run dev
```

## Environment

Copy or create environment files for each workspace. Example files are stored near their package folders.

- `api/.env` — backend environment (DATABASE_URL, JWT_SECRET, etc.)

Example `.env` values (do not commit secrets):

```env
DATABASE_URL=postgresql://me:secret@localhost:5432/portfolio
JWT_SECRET=some-strong-secret
```

## Database migrations & seed

Uses Prisma. From `api/`:

```powershell
npx prisma migrate deploy   # apply migrations (use in CI/production)
npx prisma migrate dev      # run and create migrations in dev
node ./prisma/seed.ts       # seed the DB (dev/test)
```

## Tests

Backend tests are in `api/tests` (Jest + Supertest). Run from `api/`:

```powershell
cd api
npm test -- --runInBand
```

Tip: `--runInBand` avoids worker-related race conditions while debugging locally.

## API Documentation

We maintain an OpenAPI spec at `docs/openapi.yaml` and serve Swagger UI in development at `/docs`.

- View docs locally after starting the API: http://localhost:4000/docs
- The spec contains request/response examples and schemas for `User` and `Project`.

## Roadmap & Vision

See `ROADMAP.md` for the project vision, target personas, MVP features and prioritized next steps.

## CI and Linting

CI runs tests and checks. Consider adding OpenAPI validation to CI (Spectral) if you rely on contract guarantees.

## Contributing

PRs are welcome. Follow the repo coding standards and include tests for API changes.

## License

MIT — see the `LICENSE` file for details.
