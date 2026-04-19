# Plan: Relocate Music Control Button

Move the music control button from the top-right corner to the bottom-right corner, positioned slightly above the navigation menu.

## Proposed Changes

1.  **Modify `src/app/App.tsx`**: Update the `className` of the music control button.
    -   From: `fixed top-6 right-6`
    -   To: `fixed bottom-28 right-6` (or similar to clear the navigation menu which is at `bottom-6`).
2.  **Verify**: Ensure the button doesn't overlap with the navigation menu on different screen sizes.

## Verification Plan

1.  **Build**: Run `bun run build` to ensure no compile errors.
2.  **Manual Check**: Verify the visual positioning.
