# Summary: Remove Animations & Simplify Transitions

Removed all animations and simplified the transition between the cover page and the main content to provide a static, direct experience.

## Changes

- **src/app/App.tsx**: Removed `AnimatePresence` and `motion` components. Simplified the transition to a direct conditional rendering.
- **src/app/pages/Cover.tsx**: Removed `animate-fade-in` class and simplified the structure.
- **src/app/pages/Home.tsx**: Removed `animate-fade-in` class.
- **src/app/components/Layout.tsx**: Replaced `motion.div` with a standard `div` for the navigation menu and removed related imports.
- **Version**: Updated to `0.1.1`.

## Verification Results
- **User Flow**: The cover appears instantly. Clicking "Buka Undangan" immediately switches to the main content without any delay or fading effects.
- **Static UI**: Removed all CSS-based fade-in animations for a more direct visual feel.
