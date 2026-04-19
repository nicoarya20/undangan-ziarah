# Plan: Refactor Backend to Hono for Vercel Deployment

Refactor the existing ElysiaJS backend to Hono to enable seamless deployment on Vercel as Serverless Functions.

## Steps
1. **Research & Prep**:
    - Install `hono` and related dependencies.
    - Review the current `src/server/index.ts` for migration.
2. **Implementation**:
    - Create `api/[[...route]].ts` for Vercel.
    - Migrate all endpoints: `GET /invitation`, `GET /rsvp`, `POST /rsvp`, `GET /messages`, `POST /messages`.
    - Setup CORS and middleware in Hono.
    - Configure `vercel.json` to route API requests.
3. **Frontend Update**:
    - Update API URLs in `RSVP.tsx`, `Messages.tsx`, and `App.tsx` to use relative paths or `/api`.
4. **Verification**:
    - Test the Hono server locally.
    - Run build to ensure no regressions.

## Task
- [ ] Install dependencies.
- [ ] Implement Hono backend in `api/index.ts`.
- [ ] Configure Vercel settings.
- [ ] Update frontend API calls.
- [ ] Verify functionality.
