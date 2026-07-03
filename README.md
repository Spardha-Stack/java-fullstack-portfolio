# Spardha Shukla — Java Full Stack Portfolio

A production-structured portfolio application: React + Vite frontend, Spring Boot + MySQL backend.

## Status

This is being built in phases:

- [x] **Phase 1 — Project setup**: folder structure, configs, base app shell, Hero section with photo
- [x] **Phase 2 — Frontend sections**: About, Skills, Experience, Projects, Certifications, Contact
- [x] **Phase 3 — 3D scenes**: React Three Fiber hero background, floating objects, interactions
- [x] **Phase 4 — Backend**: entities, DTOs, repositories, services, controllers, exception handling
- [x] **Phase 5 — Database**: MySQL schema + seed data from resume
- [x] **Phase 6 — Deployment**: env config, Vercel (frontend) + Render/Railway (backend)
- [x] **Phase 7 — Multi-page routing & Achievements**: dedicated routes per section, loading screen, custom cursor, route-based code splitting

All seven phases are complete. See `docs/DEPLOYMENT.md` for the full deploy walkthrough.

## Routes

| Path | Page |
|---|---|
| `/` | Home (hero + teasers) |
| `/about` | About |
| `/skills` | Skills |
| `/experience` | Experience |
| `/education` | Education |
| `/projects` | Projects |
| `/achievements` | Achievements |
| `/certificates` | Certificates |
| `/contact` | Contact |
| `*` | 404 Not Found |

Every page is a separate lazy-loaded chunk (`React.lazy` + `Suspense`), so the
initial bundle only loads what the current route needs. A `LoadingScreen`
covers both the initial app boot and any in-flight chunk load; a `CustomCursor`
(desktop only) and `ScrollToTop` (resets scroll on route change) are mounted
once in `Layout.jsx`, which wraps every route via React Router's `<Outlet />`.

## API surface (Phase 4)

| Method | Endpoint             | Description                        |
|--------|-----------------------|-------------------------------------|
| GET    | `/api/profile`         | Name, title, contact info, summary  |
| GET    | `/api/projects`        | All projects                        |
| GET    | `/api/projects/{id}`   | Single project                      |
| GET    | `/api/skills`          | All skills                          |
| GET    | `/api/experience`      | Work experience                     |
| GET    | `/api/education`       | Education history                   |
| GET    | `/api/certificates`    | Certifications                      |
| GET    | `/api/achievements`    | Achievements                        |
| POST   | `/api/contact`         | Submit contact form (validated)     |

All GET endpoints are public. `/api/admin/**` is reserved (requires auth) for a future
admin panel — the `User` entity/repository already exist for that, just not wired to a
login flow yet. Full request/response schemas are auto-documented at `/swagger-ui.html`
once the backend is running.

## Structure

```
portfolio/
├── frontend/               React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      Navbar, Footer
│   │   │   ├── ui/          Buttons, cards, inputs
│   │   │   ├── sections/    Hero, About, Skills, Projects...
│   │   │   └── three/       R3F scenes
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/         ProfileContext (static fallback data)
│   │   ├── services/        Axios API layer
│   │   ├── data/            Static content mirroring API response shapes
│   │   ├── animations/
│   │   └── assets/
│   ├── vercel.json          SPA rewrite rules for Vercel
│   └── ...
├── backend/                 Spring Boot (Java 21)
│   ├── Dockerfile            Multi-stage build for Render/Railway
│   ├── .dockerignore
│   └── src/main/java/com/spardha/portfolio/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── entity/
│       ├── dto/
│       ├── mapper/
│       ├── exception/
│       ├── config/           CORS, OpenAPI, DataSeeder
│       └── security/
├── docs/                    DATABASE.md, DEPLOYMENT.md, schema.sql
└── render.yaml               Optional Render Blueprint
```

## Running locally

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`. Requests to `/api/*` are proxied to the backend.

### Backend
Requires Java 21, Maven, and a local MySQL instance.
```bash
cd backend
# create a database named portfolio_db, then:
mvn spring-boot:run
```
Runs at `http://localhost:8080`. Swagger UI at `/swagger-ui.html`.

### Environment variables
Copy `frontend/.env.example` to `frontend/.env` and adjust as needed.
Backend config (`application.properties`) reads from env vars — no secrets are hardcoded:
`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `FRONTEND_URL`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `SEED_DATABASE`.

See `docs/DATABASE.md` for schema details and seeding behavior.

## Deployment (Phase 6)
- Frontend → Vercel
- Backend → Render or Railway
- MySQL → managed instance on either platform

Full instructions will land in `docs/DEPLOYMENT.md` once Phase 6 is built.
