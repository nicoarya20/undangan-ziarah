# Plan: Implement Navigation Menu

Add a sticky bottom navigation menu to the "Undangan Online" application to improve user experience and navigation between sections.

## Proposed Changes

1.  **Define Sections**: Identify the IDs for each section in `src/app/App.tsx`.
2.  **Add IDs to Sections**: Update `src/app/App.tsx` to include `id` attributes for "Hero/Sambutan", "Detail Acara", "Lokasi", "RSVP", and "Ucapan".
3.  **Create Navigation Component**: Create a `Navigation` component that will be displayed when the invitation is open.
    -   Use a sticky bottom position.
    -   Style it with the project's theme (Red/Gold).
    -   Include icons (Home, Info, Map, Check, Message).
4.  **Integrate Component**: Add the `Navigation` component to the main `App` return statement.
5.  **Smooth Scrolling**: Ensure smooth scrolling when clicking navigation items.

## Verification Plan

1.  **Manual Testing**: Open the invitation and verify that the navigation menu appears at the bottom.
2.  **Click Testing**: Click each menu item and ensure it scrolls to the correct section.
3.  **Build**: Run `bun run build` to ensure no compile errors.
