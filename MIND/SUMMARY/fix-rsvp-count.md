# Summary: Fix RSVP Counting & Logic

Fixed an issue where RSVP counts were not increasing and optimized the guest entry logic.

## Changes

### Database
- **prisma/schema.prisma**: Removed `@unique` constraint from `Guest.slug`. This allows multiple RSVP entries with the same name (useful if someone submits again or if two guests have the same name).

### Backend (ElysiaJS)
- **src/server/index.ts**: 
    - **Guest Creation**: Changed `upsert` to `create` and added a timestamp to the `slug`. This ensures every submission is counted as a new record in the "RSVP Wall".
    - **Robust Summary**: Improved the status filtering by using `.toUpperCase()` and `String()` conversion to ensure database enum values match the JavaScript comparison.
    - **Guest Count Logic**: Automatically sets `guestCount` to `0` if the status is `NOT_ATTENDING` to keep statistics clean.

## Verification Results
- **Multiple Submissions**: Submitting with the same name now correctly adds new entries to the list and increases the total counts.
- **Accurate Stats**: "Hadir" and "Berhalangan" counts now reflect the actual database state reliably.
