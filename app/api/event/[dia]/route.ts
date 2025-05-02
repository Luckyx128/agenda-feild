import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();

export async function GET(request: Request,
   { params }: { params: Promise<{ dia: string }> }) {
  const { dia } = await params;
  const data = new Date(dia);
  const events = await prisma.event.findMany({
    where: { date: data }
  });
  return Response.json(events);
  
}