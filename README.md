# Aditya Ishan — Portfolio

Tech stack: **Vite + React + Tailwind CSS + Framer Motion** with dark mode and a downloadable resume.

## Quick Start

```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy to Vercel
- Install Vercel CLI: `npm i -g vercel`
- Run: `vercel` (first time) then `vercel --prod`


## EmailJS (optional)
To enable the contact form to send messages directly from the website using EmailJS:
1. Create an account at https://www.emailjs.com and add an email service.
2. Create an email template and note the `service_id`, `template_id`, and `public key`.
3. In Vercel project settings, add the following Environment Variables (prefixed with `VITE_`):
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. Redeploy the site.
