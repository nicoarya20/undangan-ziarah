# Project Structure: Undangan Online

This document provides a detailed overview of the directory structure and the purpose of each major component in the Online Invitation project.

## Root Directory

- `.gitignore`: Specifies files and directories to be ignored by Git.
- `bun.lock`: Bun lockfile for ensuring consistent dependency installation.
- `package.json`: Project metadata, scripts, and dependency list.
- `prisma.config.ts`: Configuration for Prisma ORM.
- `postcss.config.mjs`: PostCSS configuration for Tailwind CSS.
- `vite.config.ts`: Vite configuration for the frontend build and development server.
- `GEMINI.md`: Main project overview and coordination document.
- `README.md`: Basic project introduction.

## `/prisma` - Database Layer

- `schema.prisma`: Defines the PostgreSQL database models (Invitation, Guest, RSVP, Message).
- `seed.ts`: Script to populate the database with initial invitation data and test guests.

## `/src` - Source Code

### `/src/app` - Frontend Application

- `main.tsx`: React application entry point.
- `App.tsx`: The core component that manages global state (opening the invitation, music playback, data fetching) and handles the main layout transitions.

#### `/src/app/pages` - Section Components
This project follows a single-page scrolling architecture. Each "page" is a full-height section:
- `Cover.tsx`: The initial landing page with the "Buka Undangan" (Open Invitation) button and reveal animation.
- `Home.tsx`: Hero section with the main title and countdown timer.
- `Event.tsx`: Details about the ceremony, including time, date, and family information.
- `Location.tsx`: Venue information with integrated Google Maps and "Get Directions" links.
- `RSVP.tsx`: Interactive form for attendance confirmation and a live guest wall showing recent confirmations.
- `Messages.tsx`: A dedicated section for guests to leave public prayers, messages, and well-wishes.

#### `/src/app/components` - Reusable Logic & UI
- `Layout.tsx`: The wrapper component that provides the sticky bottom navigation menu and background music controls.
- `/ui/`: Contains low-level UI components (Buttons, Inputs, Dialogs, etc.) powered by **Shadcn UI** and **Radix UI**.
- `/figma/`: specialized components like `ImageWithFallback.tsx` for handling design assets.

### `/src/server` - Backend API

- `index.ts`: The **ElysiaJS** server implementation. It provides RESTful endpoints for fetching invitation data, submitting RSVPs, and managing messages.

### `/src/styles` - Styling & Theme

- `tailwind.css`: Entry point for **Tailwind CSS v4**.
- `theme.css`: Custom theme variables and global overrides (colors, spacing).
- `fonts.css`: Typography definitions (Playfair Display, Poppins).
- `index.css`: Basic global resets and scrolling behavior.

## `/MIND` - AI & Project Coordination

- `/PLAN/`: Detailed development plans and task-specific checklists.
- `/SUMMARY/`: Post-implementation summaries documenting changes, verification results, and version updates.

## `/guidelines` - Standards

- `Guidelines.md`: Contains coding standards, UI/UX principles, and architectural best practices for the project.
