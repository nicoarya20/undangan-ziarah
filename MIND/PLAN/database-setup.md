# Plan: Database Setup with Prisma

Design and implement the data layer for the Online Invitation application using Prisma ORM.

## Data Model (ERD)

### 1. `Invitation`
Stores the core details of an invitation.
- `id`: UUID (Primary Key)
- `slug`: String (Unique, for URL e.g., /wedding-a-and-b)
- `title`: String
- `eventDate`: DateTime
- `locationName`: String
- `locationAddress`: String
- `googleMapsUrl`: String
- `musicUrl`: String
- `theme`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime

### 2. `Guest`
Stores individual guest information.
- `id`: UUID (Primary Key)
- `invitationId`: UUID (Foreign Key -> Invitation.id)
- `name`: String
- `slug`: String (Unique per invitation for custom URLs)
- `createdAt`: DateTime

### 3. `RSVP`
Stores guest responses.
- `id`: UUID (Primary Key)
- `guestId`: UUID (Foreign Key -> Guest.id)
- `status`: Enum (ATTENDING, NOT_ATTENDING, UNCERTAIN)
- `guestCount`: Int
- `createdAt`: DateTime

### 4. `Message`
Stores prayers/messages for the Guest Wall.
- `id`: UUID (Primary Key)
- `invitationId`: UUID (Foreign Key -> Invitation.id)
- `guestId`: UUID (Foreign Key -> Guest.id, optional)
- `name`: String (Fallback if guestId is null)
- `content`: String
- `createdAt`: DateTime

## Proposed Changes

1.  **Install Prisma**: Add `prisma` and `@prisma/client` to the project.
2.  **Initialize Prisma**: Set up the initial `prisma/schema.prisma` file.
3.  **Define Schema**: Translate the ERD into Prisma models.
4.  **Configure Environment**: Set up `.env` for the database connection (SQLite for initial local dev).

## Verification Plan

1.  **Validate Schema**: Run `npx prisma validate`.
2.  **Generate Client**: Run `npx prisma generate`.
