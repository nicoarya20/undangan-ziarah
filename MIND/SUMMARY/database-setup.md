# Summary: Database Setup with Prisma

Implemented the data layer using Prisma ORM with a SQLite database provider.

## Changes

- **ERD Design**: Defined core entities: `Invitation`, `Guest`, `RSVP`, and `Message`.
- **Dependencies**: Added `prisma` (dev) and `@prisma/client`.
- **Initialization**: Initialized Prisma and configured SQLite as the data source.
- **Schema**: Created `prisma/schema.prisma` with relationships between Invitation, Guest, RSVP, and Message.
- **Generation**: Validated the schema and generated the Prisma Client.
- **Version**: Incremented package.json to `0.0.4`.

## Verification Results

- `npx prisma validate`: Passed.
- `npx prisma generate`: Success.
