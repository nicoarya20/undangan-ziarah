# Summary: Refactor to Component-Based Single Page Architecture

Refactored the application to use a single-page architecture where all sections are visible on one page (scrollable), but each section is maintained in its own file for clean code.

## Changes

- **src/app/App.tsx**: Combined all page components (`Home`, `Event`, `Location`, `RSVP`, `Messages`) into a single view inside the `Layout`.
- **src/app/components/Layout.tsx**: 
    - Updated to accept `children`.
    - Integrated navigation logic with `scrollToSection` using IDs.
    - Simplified navigation to work on a single page without URL changes.
- **Cleanup**: Removed `src/app/components/Navigation.tsx` as it was merged into `Layout`.
- **API Integration**: Maintained the ElysiaJS backend connectivity for RSVP and Messages.
- **Version**: Updated to `0.0.8`.

## Verification Results
- **Navigation**: All menu items correctly scroll to their respective sections.
- **Structure**: Code remains modular with separate files in `src/app/pages/`.
- **Functionality**: Forms (RSVP/Messages) still work with the backend.
