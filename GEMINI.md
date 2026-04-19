# Project: Undangan Online (Online Invitation)

This is a full-stack React and ElysiaJS web application for creating digital invitations, specifically tailored for traditional ceremonies like "Co Kong Tik" (a Chinese Buddhist/Taoist ritual) and other events like weddings or funerals.

## Project Overview

- **Purpose**: A mobile-first, responsive digital invitation platform with real-time RSVP and Guest Wall features.
- **Key Features**:
  - **Hero Section**: Reveal animation with "Buka Undangan".
  - **Dynamic Personalization**: Guest names via URL query strings (e.g., `?tamu=NamaTamu`).
  - **Countdown Timer**: Real-time countdown to the event date.
  - **Event & Location**: Integrated Google Maps and event details.
  - **RSVP System**: Dynamic submission with real-time summary statistics and a "Confirmation Wall".
  - **Guest Wall**: Real-time messages and prayers from guests.
  - **Navigation**: Sticky bottom menu for quick access to sections.
  - **Multimedia**: Background music control.
  - **Social**: WhatsApp sharing and link copying.

## Tech Stack

- **Frontend**: [React](https://react.dev/) (v18), [Vite](https://vitejs.dev/) (v6)
- **Backend**: [ElysiaJS](https://elysiajs.com/) (running on [Bun](https://bun.sh/))
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **UI Components**: Shadcn UI / Radix UI / Lucide React
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

## Directory Structure

- `src/main.tsx`: Frontend entry point.
- `src/app/App.tsx`: Main application component and routing logic.
- `src/app/pages/`: Individual section components (Home, Event, Location, RSVP, Messages, Cover).
- `src/app/components/`: Reusable components and layout wrappers.
- `src/server/index.ts`: ElysiaJS API server implementation.
- `prisma/`:
  - `schema.prisma`: Database models and configuration.
  - `seed.ts`: Seeder for initial invitation and guest data.
- `src/styles/`: Global styles, Tailwind configuration, and themes.
- `MIND/`: Project documentation, plans, and task progress.
- `guidelines/`: Development and design system guidelines.

## Backend API

The backend runs on port `3001` by default.

- **GET `/invitation?id={id}`**: Fetches detailed invitation data.
- **GET `/rsvp?invitationId={id}`**: Returns RSVP summary (counts) and the full guest list.
- **POST `/rsvp`**: Submits a new RSVP entry.
- **GET `/messages?invitationId={id}`**: Fetches all messages for an invitation.
- **POST `/messages`**: Submits a new message/prayer.
- **GET `/test`**: Health check endpoint.

## Database Schema

- **Invitation**: Core event data (title, deceased names, date, location, maps URL).
- **Guest**: Guest entries linked to an invitation.
- **RSVP**: Status (Attending/Not) and guest counts, linked to a Guest.
- **Message**: Public messages linked to an invitation and optionally a Guest.

## Building and Running

### Development
```bash
# Install dependencies
bun install

# Run both server and frontend
bun run dev

# Run only the server
bun run server

# Run only the frontend
bun run vite
```

### Database Management
```bash
# Push schema changes to database
bun x prisma db push

# Run seeder
bun run seed

# Open Prisma Studio
bun x prisma studio
```

### Production Build
```bash
bun run build
```

## Development Conventions

- **Mobile-First**: Prioritize responsive design for mobile devices (min-width: 320px).
- **Design Theme**: Traditional Chinese-Balinese aesthetic (Red, Gold, Black).
- **Typography**: `Playfair Display` for headings, `Poppins` for body text.
- **State Management**: Use React hooks; components are split by concern into the `pages/` directory.

## Git & Deployment Workflow

### Workflow for Code Changes
1.  **Commit** existing changes before starting new work.
2.  **Create plan** at `MIND/PLAN/[plan-name].md`.
3.  **Create task** at `MIND/PLAN/[task-name].md`.
4.  **Execute the task** and update task progress.
5.  **Create summary** at `MIND/SUMMARY/[summary-name].md` when done.
6.  **Run build** (`bun run build`) to ensure no compile errors.
7.  **Increment version** in `package.json` for every change.
8.  **Commit** all changes AFTER successful build.
9.  **Push** to new branch: `tasks/[task-name]/[description]/[timestamp]`.
10. **Merge** to `main` branch after completion.

### GitHub Workflows
- **publish.yml**: Triggered on `main` branch. Builds and pushes docker image using version from `package.json`.
- **re-pull.yml**: Triggered after successful publish. Deploys the new image to the environment.
