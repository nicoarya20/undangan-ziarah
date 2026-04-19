# Summary: Dynamic RSVP Wall & Summary Cards

Transformed the RSVP section into a dynamic guest wall that displays a real-time summary of attendees and a list of all confirmations.

## Changes

### Backend (ElysiaJS)
- **src/server/index.ts**: Added `GET /rsvp` endpoint to fetch:
    - **Summary**: Total counts for attending guests (sum of `guestCount`) and berhalangan guests.
    - **List**: Detailed list of all RSVP entries with guest names and timestamps.

### Frontend (React)
- **src/app/pages/RSVP.tsx**:
    - **Summary Cards**: Added visual cards showing "Hadir", "Berhalangan", and "Total Tamu".
    - **Confirmation Wall**: Implemented a scrollable list next to the form that displays recent guest confirmations (similar to the Messages section).
    - **Auto-Refresh**: The list and summary now automatically update whenever a new RSVP is submitted.
    - **Enhanced Form**: Optimized the layout for split-view (Form on left, List on right).

## Verification Results
- **Form Submission**: Submitting an RSVP immediately updates the summary cards and adds the entry to the "Konfirmasi Terbaru" list.
- **Data Integrity**: Counts correctly differentiate between "attending" (sum of people) and "berhalangan" (count of entries).
- **Version**: Updated to `0.1.3`.
