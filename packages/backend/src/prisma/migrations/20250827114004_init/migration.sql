-- CreateTable
CREATE TABLE "public"."Registry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "Registry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dog" (
    "id" SERIAL NOT NULL,
    "microchipId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "ownerPhone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "registryId" INTEGER NOT NULL,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dog_microchipId_key" ON "public"."Dog"("microchipId");

-- AddForeignKey
ALTER TABLE "public"."Dog" ADD CONSTRAINT "Dog_registryId_fkey" FOREIGN KEY ("registryId") REFERENCES "public"."Registry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
