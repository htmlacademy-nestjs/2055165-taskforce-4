/*
  Warnings:

  - You are about to drop the column `published_at` on the `replies` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "replies" DROP COLUMN "published_at",
ALTER COLUMN "text" DROP NOT NULL;
