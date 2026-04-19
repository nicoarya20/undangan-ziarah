# Project: Undangan Online (Online Invitation)

This is a React-based web application for creating digital invitations, specifically tailored for traditional ceremonies like "Co Kong Tik" (a Chinese Buddhist/Taoist ritual) and potentially other events like weddings or funerals.

## Project Overview

- **Purpose**: A mobile-first, responsive digital invitation platform.
- **Key Features**:
  - Hero Section with "Buka Undangan" reveal animation.
  - Dynamic Guest Names via URL query strings (e.g., `?tamu=NamaTamu`).
  - Real-time Countdown Timer to the event date.
  - Event details and integrated Google Maps.
  - RSVP system and public Guest Wall (Messages/Prayers).
  - Background music control.
  - Social sharing (WhatsApp, Copy Link).
- **Tech Stack**:
  - **Framework**: [React](https://react.dev/) (v18)
  - **Build Tool**: [Vite](https://vitejs.dev/) (v6)
  - **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
  - **Icons**: [Lucide React](https://lucide.dev/)
  - **UI Components**: Shadcn UI / Radix UI / MUI (Emotion)
  - **Animation**: [Framer Motion](https://www.framer.com/motion/)

## Directory Structure

- `src/main.tsx`: Application entry point.
- `src/app/App.tsx`: Main application component containing core logic and sections.
- `src/app/components/ui/`: Reusable UI components (Shadcn/Radix).
- `src/styles/`: Global styles including Tailwind, fonts, and themes.
- `src/imports/`: Reference documents and prompts (e.g., `prompt-undangan-online.md`).
- `guidelines/`: Development and design system guidelines.

## Technical Details

- **Path Alias**: `@` is aliased to the `src/` directory.
- **Figma Asset Resolver**: A custom plugin handles `figma:asset/` imports, resolving them to `src/assets/`.
- **Assets**: SVG and CSV files are included as assets.

## Building and Running

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

## Development Conventions

- **Mobile-First**: Prioritize responsive design for mobile devices (min-width: 320px).
- **Design Theme**: Traditional Chinese-Balinese aesthetic (Red, Gold, Black).
- **Typography**: 
  - `Playfair Display` or `Noto Serif` for headings.
  - `Poppins` for body text.
- **State Management**: React `useState` and `useEffect` for current functionality; consider more robust solutions if scaling.
- **Components**: Follow the existing pattern of using Shadcn UI components for consistency.

## Git & Deployment Workflow

*Note: This project is not yet initialized as a Git repository.*

### Workflow for Code Changes
1.  **Commit** existing changes before starting new work
2.  **Create plan** at `MIND/PLAN/[plan-name].md`
3.  **Create task** at `MIND/PLAN/[task-name].md`
4.  **Execute the task** and update task progress
5.  **Create summary** at `MIND/SUMMARY/[summary-name].md` when done
6.  **Run build** (`bun run build`) to ensure no compile errors
7.  **Fix any build errors** if they occur
8.  **Commit** all changes AFTER successful build
9.  **Update version** in `package.json` for every change
10. **Push** to new branch with format: `tasks/[task-name]/[what-is-being-done]/[date-time]`
11. **Merge** to `main` branch after completion
