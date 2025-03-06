/*
  Warnings:

  - Added the required column `updatedAt` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Made the column `location` on table `Incident` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'reported',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "location" SET NOT NULL;
