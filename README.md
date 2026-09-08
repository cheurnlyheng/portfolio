# Cheurn Lyheng Portfolio

Next.js portfolio site ready for Vercel deployment.

## Local Development

```bash
npm install
npm run dev
```

## Contact Form

The contact form sends email through Resend from the server route at `app/api/contact/route.ts`.

Create `.env.local` from `.env.example`:

```bash
RESEND_API_KEY=re_your_api_key_here
CONTACT_TO_EMAIL=yourgmail@gmail.com
CONTACT_FROM_EMAIL=Portfolio <contact@yourdomain.com>
```

For production, verify your sending domain in Resend, then add the same environment variables in Vercel.

## Projects Showcase + Admin

Projects shown in the "Selected work" section are stored in a Postgres database and managed from a password-protected `/admin` page — no code edits needed to add a project.

1. Create a free Postgres database (e.g. [Neon](https://neon.tech) or [Vercel Postgres](https://vercel.com/storage/postgres)) and copy its connection string.
2. Add to `.env.local`:

   ```bash
   DATABASE_URL="postgresql://..."
   ADMIN_PASSWORD=choose-a-strong-password
   ADMIN_SESSION_SECRET=some-long-random-string
   ```

   Generate a random secret with `node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"`.

3. Create the `Project` table:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Set up image uploads (screenshots shown on each project's detail page):
   - In the Vercel dashboard: **Storage** → **Create Database** → **Blob** → create a store and link it to this project.
   - Copy the generated token into `.env.local` as `BLOB_READ_WRITE_TOKEN`.

5. Visit `/admin`, sign in with `ADMIN_PASSWORD`, and add projects — title, description, date, GitHub link, screenshots, and an optional live site link (leave it blank for projects that aren't deployed yet). Clicking a project on the site opens its own detail page at `/projects/<slug>` with the full description, screenshots, and "View code" / "Visit site" buttons.

Add the same four environment variables (`DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `BLOB_READ_WRITE_TOKEN`) in Vercel's project settings for production, and run `npx prisma migrate deploy` (or let it run once against the production database) before the first deploy.
