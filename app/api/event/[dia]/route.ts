import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: Request,
   { params }: { params: { dia: string } }) {
  const { dia } = params;
  const data = new Date(dia);
  const events = await prisma.event.findMany({
    where: { date: data }
  });
  return NextResponse.json(events);
}