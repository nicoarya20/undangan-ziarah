# Task: Fix API Proxy and RSVP 404

## Status
- [x] Investigate the `SyntaxError` and `404` issues.
- [x] Update `vite.config.ts` with proxy settings.
- [x] Seed the database with default data.
- [x] Verify that `/api/invitation` and `/api/rsvp` return JSON.

## Notes
- The Hono server in `api/index.ts` handles the API requests.
- The proxy correctly forwards requests from Vite (port 5173) to Hono (port 3001).
