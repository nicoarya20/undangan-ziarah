import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get('/', () => ({ status: 'Online Invitation API is running' }))
  
  // Invitation Data Route
  .get('/invitation', async ({ query }) => {
    const { id } = query;
    const invitation = await db.invitation.findUnique({
      where: { id }
    });
    return invitation;
  }, {
    query: t.Object({
      id: t.String()
    })
  })
  
  // RSVP Routes
  .get('/rsvp', async ({ query }) => {
    const { invitationId } = query;
    const rsvps = await db.rSVP.findMany({
      where: {
        guest: { invitationId }
      },
      include: {
        guest: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const summary = {
      attending: rsvps.filter(r => r.status === 'ATTENDING').reduce((acc, curr) => acc + curr.guestCount, 0),
      notAttending: rsvps.filter(r => r.status === 'NOT_ATTENDING').length,
      totalGuests: rsvps.reduce((acc, curr) => acc + curr.guestCount, 0)
    };

    return { summary, list: rsvps };
  }, {
    query: t.Object({
      invitationId: t.String()
    })
  })
  .post('/rsvp', async ({ body }) => {
    const { invitationId, name, status, guests } = body;
    
    // Create or find guest
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    let guest = await db.guest.findUnique({
      where: { slug }
    });
    
    if (!guest) {
      guest = await db.guest.create({
        data: {
          invitationId,
          name,
          slug,
        }
      });
    }
    
    // Create or update RSVP
    const rsvp = await db.rSVP.upsert({
      where: { guestId: guest.id },
      update: {
        status: status as any,
        guestCount: parseInt(guests),
      },
      create: {
        guestId: guest.id,
        status: status as any,
        guestCount: parseInt(guests),
      }
    });
    
    return { success: true, guest, rsvp };
  }, {
    body: t.Object({
      invitationId: t.String(),
      name: t.String(),
      status: t.String(),
      guests: t.String(),
    })
  })
  
  // Message Routes
  .get('/messages', async ({ query }) => {
    return await db.message.findMany({
      where: { invitationId: query.invitationId },
      orderBy: { createdAt: 'desc' },
      include: { guest: true }
    });
  }, {
    query: t.Object({
      invitationId: t.String()
    })
  })
  .post('/messages', async ({ body }) => {
    const { invitationId, name, message } = body;
    
    return await db.message.create({
      data: {
        invitationId,
        name,
        content: message,
      }
    });
  }, {
    body: t.Object({
      invitationId: t.String(),
      name: t.String(),
      message: t.String(),
    })
  })
  
  .listen(3001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
export type App = typeof app;
