import { Hono } from 'hono';
import { handle } from '@hono/node-server/vercel';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const app = new Hono().basePath('/api');

app.use('*', logger());
app.use('*', cors());

app.get('/', (c) => c.json({ status: 'Online Invitation API (Hono) is running' }));
app.get('/test', (c) => c.json({ message: 'Test route is working' }));

// Invitation Data Route
app.get('/invitation', async (c) => {
  const id = c.req.query('id');
  if (!id) return c.json({ error: 'Missing id' }, 400);

  const invitation = await db.invitation.findUnique({
    where: { id }
  });
  return c.json(invitation);
});

// RSVP Routes
app.get('/rsvp', async (c) => {
  const invitationId = c.req.query('invitationId');
  if (!invitationId) return c.json({ error: 'Missing invitationId' }, 400);

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

    return c.json({ summary, list: rsvps });
  } catch (error) {
    console.error('[RSVP] Error fetching data:', error);
    return c.json({ error: 'Failed to fetch RSVP data' }, 500);
  }
});

app.post('/rsvp', async (c) => {
  const body = await c.req.json();
  const { invitationId, name, status, guests } = body;
  
  const slug = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
  
  try {
    const guest = await db.guest.create({
      data: {
        invitationId,
        name,
        slug,
      }
    });
    
    const rsvp = await db.rSVP.create({
      data: {
        guestId: guest.id,
        status: status as any,
        guestCount: status === 'ATTENDING' ? parseInt(guests) : 0,
      }
    });
    
    return c.json({ success: true, guest, rsvp });
  } catch (error) {
    console.error('[RSVP] Error creating entry:', error);
    return c.json({ error: 'Failed to create RSVP' }, 500);
  }
});

// Message Routes
app.get('/messages', async (c) => {
  const invitationId = c.req.query('invitationId');
  if (!invitationId) return c.json({ error: 'Missing invitationId' }, 400);

  const messages = await db.message.findMany({
    where: { invitationId },
    orderBy: { createdAt: 'desc' },
    include: { guest: true }
  });
  return c.json(messages);
});

app.post('/messages', async (c) => {
  const body = await c.req.json();
  const { invitationId, name, message } = body;
  
  const entry = await db.message.create({
    data: {
      invitationId,
      name,
      content: message,
    }
  });
  return c.json(entry);
});

// Fallback
app.notFound((c) => {
  return c.json({ error: 'Not Found', path: c.req.path }, 404);
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const OPTIONS = handle(app);

if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  const { serve } = await import('@hono/node-server');
  const port = 3001;
  console.log(`Server is running on port ${port}`);
  serve({
    fetch: app.fetch,
    port
  });
}

export default handle(app);
