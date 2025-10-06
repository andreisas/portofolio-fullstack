# Fullstack Portfolio

A personal fullstack portfolio project built with:

- **Frontend:** React + Next.js + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL (with Prisma ORM)
- **API:** REST endpoints for projects, blog posts, and contact form

This project is intended to demonstrate fullstack development skills, including API design, database integration, authentication, and deployment.

## Project Structure

```
portfolio-fullstack/
├── api/ # Backend (Express + TypeScript)
├── web/ # Frontend (Next.js + TypeScript)
├── docs/ # Architecture diagrams, design notes
├── .gitignore
├── README.md
└── LICENSE
```

## Setup Instructions

1. **Clone the repository**

```bash
git clone git@github.com:andreisas/portofolio-fullstack.git
cd portofolio-fullstack
```

2.  **Install dependencies**

- Frontend:
```
  cd web
  npm install
```

- Backend:
```
  cd ../api
  npm install
```

3.  **Run the apps locally**

- Frontend:
```
  cd web
  npm run dev
```

- Backend:
```
  cd api
  npm run dev
```

Check http://localhost:4000/health

4.  **Run PostgreSQL with Docker**

docker run --name pg -e POSTGRES_USER=me -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=mydb -p 5432:5432 -d postgres:15

## Notes

- ESLint, Prettier, and Husky are set up for consistent code formatting.

- Architecture diagram is in the docs/ folder.

- Environment variables should be added to .env. See .env.example for reference.

## License

This project is licensed under the MIT License. See LICENSE for details.
