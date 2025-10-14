This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploying to Vercel (recommended)

1. Visit https://vercel.com/new and import the repository `andreisas/devstacker`.
2. For the project path, select the `web/` folder.
3. Set environment variables (Project Settings → Environment Variables):
   - `NEXT_PUBLIC_API_URL` → e.g. `https://api.example.com`
   - Any additional variables (analytics, SMTP) as needed.
4. Deploy. Vercel will build with Node 18/22 depending on the platform; the `vercel.json` file helps configure the build.
5. After deploy, your preview URL will be available in the Vercel dashboard.

Notes:

- If your API is not publicly available, point `NEXT_PUBLIC_API_URL` at a staging API or use Vercel environment variables to provide a test backend.
- For production, configure a production `NEXT_PUBLIC_API_URL` value in Vercel settings.

<!-- Vercel badge (replace PROJECT_ID with your Vercel project id when available) -->

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new)
