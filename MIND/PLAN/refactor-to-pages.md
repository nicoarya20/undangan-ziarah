# Plan: Refactor to Page-Based Architecture with API Integration

Refactor the single-page application into a multi-page architecture using React Router and integrate with the Prisma/Supabase backend.

## Architectural Changes

1.  **Routing**: Implement `react-router` for navigation.
2.  **Pages**:
    - `src/app/pages/Home.tsx`: Welcome section and "Buka Undangan".
    - `src/app/pages/Event.tsx`: Event details and Countdown.
    - `src/app/pages/Location.tsx`: Google Maps and address.
    - `src/app/pages/RSVP.tsx`: Confirmation form.
    - `src/app/pages/Messages.tsx`: Guest wall (Messages/Prayers).
3.  **Layout**: `src/app/components/Layout.tsx` for shared Music Control and Navigation Menu.
4.  **API/Server Actions**:
    - Since this is a client-side Vite app, we'll create a `src/app/lib/api.ts` to handle database operations via a backend or direct Prisma (if using a framework that supports it, but for pure Vite/React we might need a small backend or use Supabase client directly).
    - *Decision*: We will use a dedicated backend or mock the actions for now if no backend is provided, OR we can use Prisma if the user wants a full-stack setup (likely with something like Express or ElysiaJS).
    - *User Hint*: "Buat API Routes / Server Actions". This implies a backend is expected.

## Proposed Changes

1.  **Install React Router**: `npm install react-router-dom`.
2.  **Create Page Components**: Extract logic from `App.tsx` into separate files.
3.  **Create Layout**: Move Navigation and Music Toggle to a Layout component.
4.  **Setup Router**: Update `main.tsx` or `App.tsx` to define routes.
5.  **API Integration**:
    - Create `src/app/actions/rsvp.ts` and `src/app/actions/messages.ts`.
    - Note: Vite doesn't support "Server Actions" natively like Next.js. We'll implement them as async functions that would typically call an API.

## Verification Plan

1.  **Build**: Run `bun run build`.
2.  **Navigation**: Test that each menu item navigates to the correct URL and page.
3.  **Functionality**: Ensure RSVP and Messages still work and persist to the database.
