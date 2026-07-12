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
