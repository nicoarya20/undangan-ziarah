# Summary: Add Cover Page (Buka Undangan)

Implemented a dedicated cover screen that appears before the main invitation content.

## Changes

- **src/app/pages/Cover.tsx**: Created a new component for the "Buka Undangan" screen.
- **src/app/pages/Home.tsx**: Removed the cover logic to focus on the welcome message.
- **src/app/App.tsx**: 
    - Added state management for the cover (`isOpen`).
    - Implemented session persistence so the cover only shows once per session.
    - Added CSS logic to hide/lock scroll for the main content while the cover is active.
- **Version**: Updated to `0.0.9`.

## Verification Results
- **User Flow**: When first arriving, the user sees the "Buka Undangan" screen. Clicking the button hides the cover and reveals the single-page content.
- **Persistence**: Refreshing the page doesn't show the cover again unless the browser session is closed.
