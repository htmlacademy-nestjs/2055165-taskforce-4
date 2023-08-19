-- CreateEnum
CREATE TYPE "City" AS ENUM ('Moscow', 'SaintPetersburg', 'Vladivostok');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('New', 'Cancelled', 'InProgress', 'Completed', 'Failed');

-- CreateTable
CREATE TABLE "tasks" (
    "task_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category_id" INTEGER,
    "price" INTEGER NOT NULL,
    "expiration_date" TIMESTAMP(3),
    "image" TEXT,
    "address" TEXT,
    "tags" TEXT[],
    "city" "City" NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "comments_count" INTEGER NOT NULL,
    "replies_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3) NOT NULL,
    "employer_id" TEXT,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id")
);
