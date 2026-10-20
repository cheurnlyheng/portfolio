-- CreateEnum
CREATE TYPE "ProjectDisplayMode" AS ENUM ('BANNER', 'SPLIT');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "displayMode" "ProjectDisplayMode" NOT NULL DEFAULT 'BANNER';
