-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "voters" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
