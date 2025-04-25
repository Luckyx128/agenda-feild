-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "agent" TEXT,
    "date" TIMESTAMP(3),
    "hora" TEXT,
    "empressa" TEXT,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
