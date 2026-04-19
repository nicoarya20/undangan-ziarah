# Summary: Refactor Backend to Hono for Vercel

Migrated the backend from ElysiaJS to Hono to support deployment as Serverless Functions on Vercel.

## Changes

### Backend (Hono)
- **api/index.ts**: Created a new Hono-based entry point that mirrors the ElysiaJS API.
    - Implemented `GET /api/invitation`, `GET /api/rsvp`, `POST /api/rsvp`, `GET /api/messages`, `POST /api/messages`.
    - Integrated Hono's `logger` and `cors` middleware.
    - Added a Vercel-compatible export using `@hono/node-server/vercel`.
    - Included a local development server fallback using `@hono/node-server`.

### Configuration
- **vercel.json**: Added a configuration file to route all `/api/*` requests to the Serverless Function at `api/index.ts`.
- **package.json**: 
    - Added `hono` and `@hono/node-server` dependencies.
    - Added `dev:hono` script for local testing of the new backend.
    - Incremented version to `0.1.6`.

### Frontend
- Updated `App.tsx`, `RSVP.tsx`, and `Messages.tsx` to use a configurable `API_URL` (defaulting to `/api`). This allows the frontend to work seamlessly in both local development and production.

## Verification Results
- **Local Hono Server**: Verified that the Hono server starts and responds correctly to API calls on port 3001.
- **API Integrity**: Confirmed that all endpoints return data in the same format as the previous ElysiaJS implementation.
- **Frontend Compatibility**: Verified that the frontend successfully fetches data from the new `/api` routes.
- **Build**: Successfully ran `bun run build`.

## Next Steps
- Push changes to the repository and connect to Vercel for deployment.
- Ensure `DATABASE_URL` environment variable is configured in the Vercel dashboard.
