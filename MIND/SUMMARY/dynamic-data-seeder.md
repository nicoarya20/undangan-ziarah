# Summary: Dynamic Data & Seeder Implementation

Refactored the application to remove hardcoded data from the UI and replace it with dynamic data fetched from the Supabase database via the ElysiaJS API.

## Changes

### Database & Schema
- **prisma/schema.prisma**: Updated `Invitation` model with `deceased` and `organizer` fields.
- **prisma/seed.ts**: Created a seeder script to populate the initial invitation data (title, deceased, dates, location, etc.).
- **package.json**: Added `"seed": "bun run prisma/seed.ts"` script.

### Backend (ElysiaJS)
- **src/server/index.ts**: Added a new endpoint `GET /invitation` to fetch invitation details by ID.

### Frontend (React)
- **src/app/App.tsx**: Implemented fetching `invitationData` on mount and passing it as props to all sections.
- **Pages**: Updated `Cover`, `Home`, `Event`, and `Location` pages to use dynamic data from props instead of hardcoded objects.
- **Location Page**: Improved Google Maps integration to use the dynamic address.

## Verification Results
- **Seeding**: Successfully ran `bun run seed` to populate Supabase.
- **Dynamic Content**: Verified that changing data in the database (via seeder or manually) correctly reflects in the UI across all components.
- **Reliability**: Added loading and error states for the initial data fetch.
