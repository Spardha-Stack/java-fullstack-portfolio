# Deployment

Frontend → **Vercel**. Backend → **Render** or **Railway**. MySQL → a managed instance
on whichever backend platform you pick (or PlanetScale as a third option).

No secrets are hardcoded anywhere in this repo — everything below is an environment
variable set in the hosting dashboard.

---

## 1. Backend first (Render or Railway)

The backend needs to be live before the frontend build, since the frontend's
`VITE_API_BASE_URL` points at it.

### Option A — Render

1. Push this repo to GitHub.
2. In the Render dashboard: **New → Web Service** → connect the repo.
3. Render will detect `backend/Dockerfile` (or use the included `render.yaml`
   blueprint via **New → Blueprint** for a slightly faster setup).
   - Root directory: `backend`
   - Dockerfile path: `backend/Dockerfile`
4. Add environment variables (**Settings → Environment**):

   | Key | Value |
   |---|---|
   | `DB_URL` | `jdbc:mysql://<host>:3306/portfolio_db` |
   | `DB_USERNAME` | your MySQL username |
   | `DB_PASSWORD` | your MySQL password |
   | `FRONTEND_URL` | your Vercel URL, e.g. `https://spardha-portfolio.vercel.app` |
   | `MAIL_USERNAME` | (optional) Gmail/SMTP address for contact notifications |
   | `MAIL_PASSWORD` | (optional) app password for that account |
   | `NOTIFY_EMAIL` | (optional) where contact form emails should land |
   | `SEED_DATABASE` | `true` on first deploy, `false` afterward if you don't want re-checks on every boot |

5. For MySQL: Render's managed MySQL availability varies by plan/region. If it's
   not offered on your account, provision MySQL on **Railway** (below) or
   **PlanetScale**, then just point `DB_URL` at that external host — the backend
   doesn't care where MySQL physically lives.
6. Deploy. Render builds the Docker image and starts the service. Confirm it's
   up by visiting `https://<your-render-url>/swagger-ui.html`.

### Option B — Railway

1. Push this repo to GitHub.
2. In Railway: **New Project → Deploy from GitHub repo**.
3. Add a service for `backend/` — Railway auto-detects the `Dockerfile`.
4. **New → Database → MySQL** in the same project. Railway exposes connection
   details as `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`
   — map these into the backend service's variables:
   - `DB_URL` = `jdbc:mysql://${{MYSQLHOST}}:${{MYSQLPORT}}/${{MYSQLDATABASE}}`
   - `DB_USERNAME` = `${{MYSQLUSER}}`
   - `DB_PASSWORD` = `${{MYSQLPASSWORD}}`
5. Add the same `FRONTEND_URL`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `NOTIFY_EMAIL`,
   `SEED_DATABASE` variables as above.
6. Railway assigns a public domain automatically (or generate one under
   **Settings → Networking**). Note this URL — the frontend needs it next.

---

## 2. Frontend (Vercel)

1. In Vercel: **New Project** → import the same GitHub repo.
2. Set **Root Directory** to `frontend`.
3. Framework preset: Vite (auto-detected; `frontend/vercel.json` is included
   for SPA rewrite rules so React Router routes don't 404 on refresh).
4. Add an environment variable:

   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `https://<your-backend-url>/api` |

5. Deploy. Once live, copy the Vercel URL and set it as `FRONTEND_URL` back on
   the backend service (step 1.4/1.5 above) so CORS allows requests from it —
   then redeploy the backend so the new env var takes effect.

---

## 3. Verify end to end

- `https://<backend>/swagger-ui.html` — API docs load, `GET /api/projects` returns your seeded projects.
- `https://<frontend>` — the site loads, About/Skills/Projects/Certifications show real data (not the static `ProfileContext` fallback), and the contact form successfully POSTs to `/api/contact` (check the `messages` table).

## 4. Custom domain (optional)

Both Vercel and Render/Railway support attaching a custom domain under their
respective **Settings → Domains** pages. If you do this, update `FRONTEND_URL`
on the backend to match the new domain so CORS keeps working.
