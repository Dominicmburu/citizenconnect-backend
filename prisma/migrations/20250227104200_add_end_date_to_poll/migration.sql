/*
  Warnings:

  - Added the required column `endDate` to the `Poll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'radio',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
