# Plecta — waitlist landing page

Waitlist-only landing page. No app functionality — just a high-converting page that
collects signups into Supabase.

## Structure

```
frontend/   React + Vite + Tailwind
backend/    Node + Express API (talks to Supabase with the service role key)
supabase/   schema.sql — run this once in the Supabase SQL editor
```

## Setup

1. **Supabase**: create a project at supabase.com, then open the SQL editor and run
   `supabase/schema.sql`. Grab the Project URL and the **service role** key
   (Settings → API).

2. **Backend**
   ```
   cd backend
   cp .env.example .env   # fill in SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
   npm install
   npm run dev             # http://localhost:3001
   ```

3. **Frontend**
   ```
   cd frontend
   cp .env.example .env    # VITE_API_URL=http://localhost:3001 (or leave blank; Vite proxies /api in dev)
   npm install
   npm run dev              # http://localhost:5173
   ```

## Deploying to Render

Two services:

- **Backend** — Web Service, root `backend/`, build `npm install`, start `npm start`.
  Env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NODE_ENV=production`,
  `FRONTEND_ORIGIN=<your frontend URL>`.
- **Frontend** — Static Site, root `frontend/`, build `npm install && npm run build`,
  publish dir `dist`. Env var: `VITE_API_URL=<your backend URL>`.

The service role key only ever lives on the backend — never in frontend env vars.
