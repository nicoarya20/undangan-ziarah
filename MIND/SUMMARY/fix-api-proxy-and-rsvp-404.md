# Summary: Fix API Proxy and RSVP 404

The `SyntaxError: Unexpected token '<'` reported by the user was caused by Vite's development server failing to proxy API requests to the backend server. As a result, requests to `/api/*` were falling back to serving `index.html`, which is not valid JSON.

## Key Changes
1.  **Vite Configuration**: Added a `server.proxy` configuration to `vite.config.ts` to forward all requests starting with `/api` to the Hono backend server running on `http://localhost:3001`.
2.  **Database Seeding**: Initialized and seeded the database using Prisma to ensure that the `default-invitation-id` referenced in the frontend exists.
3.  **Verification**: Confirmed that both the Hono server (port 3001) and the proxied Vite server (port 5173) correctly return JSON data for the `/api/test` and `/api/invitation` endpoints.

## Impact
- Frontend can now successfully fetch invitation, RSVP, and message data.
- The "RSVP 404" issue reported previously is also resolved by the proxy fix.
