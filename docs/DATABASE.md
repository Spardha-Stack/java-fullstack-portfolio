# Database

**Engine:** MySQL 8+
**Default local database name:** `portfolio_db`

## Setup

1. Create the database:
   ```sql
   CREATE DATABASE portfolio_db CHARACTER SET utf8mb4;
   ```
2. Point the backend at it via env vars (see root `README.md`): `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`.
3. Start the backend. With `spring.jpa.hibernate.ddl-auto=update` (the default in
   `application.properties`), Hibernate creates every table automatically from the
   JPA entities in `entity/` — you don't need to run anything by hand.

If you'd rather provision the schema manually (e.g. locking it down before the app
first connects, or just to review it), `docs/schema.sql` has the equivalent DDL.
It is a reference only — the app does not execute it automatically.

## Seeding

`config/DataSeeder.java` runs on every startup and populates `projects`, `skills`,
`experience`, `education`, and `certificates` with Spardha's real resume content —
but only if each table is currently empty, so it's safe to leave running indefinitely;
it will never duplicate rows or clobber edits made later through an admin panel.

To disable seeding entirely (e.g. once an admin panel is managing the data directly):
```
SEED_DATABASE=false
```

## Tables

| Table              | Purpose                                                        |
|--------------------|------------------------------------------------------------------|
| `projects`          | Portfolio projects                                              |
| `project_features`  | Feature bullet points per project (`@ElementCollection`)        |
| `project_tech`      | Tech stack tags per project (`@ElementCollection`)               |
| `skills`            | Skill name, proficiency level, category                         |
| `experience`        | Work experience / internship timeline entries                   |
| `education`         | Academic history                                                 |
| `certificates`      | Certifications                                                   |
| `messages`          | Contact form submissions (name, email, subject, message, timestamp) |
| `users`             | Reserved for a future admin login — not wired to auth yet        |

## Not yet implemented

- Admin CRUD endpoints for editing projects/skills/etc. (the `User` entity and
  `/api/admin/**` route reservation in `SecurityConfig` are ready for this)
- Message read/unread management endpoints
