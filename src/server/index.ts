import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .onBeforeHandle(({ request }) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
  })
  .get('/', () => ({ status: 'Online Invitation API is running' }))
  .get('/test', () => ({ message: 'Test route is working' }))
  
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
    console.log(`[RSVP] Fetching for invitationId: ${invitationId}`);
    try {
      const rsvps = await db.rSVP.findMany({
        where: {
          guest: { invitationId }
        },
        include: {
          guest: true
        },
        orderBy: { createdAt: 'desc' }
      });

      const attendingList = rsvps.filter(r => String(r.status).toUpperCase() === 'ATTENDING');
      const notAttendingList = rsvps.filter(r => String(r.status).toUpperCase() === 'NOT_ATTENDING');

      const summary = {
        attending: attendingList.reduce((acc, curr) => acc + curr.guestCount, 0),
        notAttending: notAttendingList.length,
        totalGuests: attendingList.reduce((acc, curr) => acc + curr.guestCount, 0)
      };

      console.log(`[RSVP] Found ${rsvps.length} entries. Summary:`, summary);
      return { summary, list: rsvps };
    } catch (error) {
      console.error('[RSVP] Error fetching data:', error);
      throw error;
    }
  }, {
    query: t.Object({
      invitationId: t.String()
    })
  })
  .post('/rsvp', async ({ body }) => {
    const { invitationId, name, status, guests } = body;
    
    // Create a new guest entry every time to allow multiple entries/wall behavior
    const slug = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    
    const guest = await db.guest.create({
      data: {
        invitationId,
        name,
        slug,
      }
    });
    
    // Create RSVP
    const rsvp = await db.rSVP.create({
      data: {
        guestId: guest.id,
        status: status as any,
        guestCount: status === 'ATTENDING' ? parseInt(guests) : 0,
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
  
  .all('*', ({ path, request }) => {
    console.log(`[404] Unhandled request: ${request.method} ${path}`);
    return { error: 'Not Found', path, method: request.method };
  })
  
  .listen({
    port: 3001,
    hostname: '0.0.0.0'
  });

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
export type App = typeof app;
