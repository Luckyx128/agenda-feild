import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const currentDate = new Date();
  const nextEvents =  await prisma.event.findMany({
    where: {
      date: {
        gt: currentDate,
      },
    },
  });
  return NextResponse.json(
   nextEvents)
}
