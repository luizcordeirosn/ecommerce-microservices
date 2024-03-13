-- CreateTable
CREATE TABLE "costumers" (
    "id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "costumers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "costumers_email_key" ON "costumers"("email");
