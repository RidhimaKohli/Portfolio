# Product Experiments

A Vercel-ready portfolio for product-management case studies and prototypes. Each company gets a memorable URL, starting with [District](http://localhost:3000/district).

## Routes

- `/` - portfolio index and list of company experiments
- `/district` - District by Zomato product experiment

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the portfolio.

Company pages are currently static, which keeps them fast, portable, and easy to review in Git. A database can be added later if the portfolio needs editable content, submissions, or analytics-backed features.

## Deploy on Vercel

Import this repository into [Vercel](https://vercel.com/new), keep the detected Next.js settings, and deploy. No environment variables are required for the current version.
