import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const invitationId = "default-invitation-id";
  
  const invitation = await prisma.invitation.upsert({
    where: { id: invitationId },
    update: {
      title: "Co Kong Tik",
      deceased: "TJIOE YOE MOI (Alm), THE LIAN KIM (Alm)",
      eventDate: new Date("2026-05-15T09:00:00"),
      locationName: "Jl. Raya Kuta No. 88, Kuta, Bali",
      locationAddress: "Jl. Raya Kuta No. 88, Kuta, Bali",
      googleMapsUrl: "https://maps.google.com/?q=-8.718,115.167",
      organizer: "Keluarga Besar Tjioe",
      slug: "co-kong-tik-tjioe",
    },
    create: {
      id: invitationId,
      title: "Co Kong Tik",
      deceased: "TJIOE YOE MOI (Alm), THE LIAN KIM (Alm)",
      eventDate: new Date("2026-05-15T09:00:00"),
      locationName: "Jl. Raya Kuta No. 88, Kuta, Bali",
      locationAddress: "Jl. Raya Kuta No. 88, Kuta, Bali",
      googleMapsUrl: "https://maps.google.com/?q=-8.718,115.167",
      organizer: "Keluarga Besar Tjioe",
      slug: "co-kong-tik-tjioe",
    },
  });

  console.log({ invitation });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
