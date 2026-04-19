# Plan: Fix API Proxy and RSVP 404

The user reported a `SyntaxError: Unexpected token '<', "<!DOCTYPE "...` which indicates that the frontend is receiving HTML instead of JSON from an API request. This is usually caused by Vite's dev server failing to proxy requests to the backend, resulting in it serving `index.html` as a fallback.

## Steps
1. **Research & Diagnostics**:
    - Checked `App.tsx` and found fetch calls to `/api/invitation`.
    - Checked `vite.config.ts` and confirmed the absence of a proxy configuration.
    - Verified that the backend (Hono) runs on port 3001.
2. **Implementation**:
    - Add proxy configuration to `vite.config.ts` to forward `/api` requests to `http://localhost:3001`.
    - Initialize and seed the database to ensure `default-invitation-id` exists.
3. **Verification**:
    - Start the Hono server.
    - Start the Vite server.
    - Test the proxied API endpoint through Vite.
    - Verify that the frontend can successfully fetch invitation, RSVP, and message data.

## Task
- [x] Add proxy to `vite.config.ts`.
- [x] Seed the database.
- [x] Verify API connectivity.
