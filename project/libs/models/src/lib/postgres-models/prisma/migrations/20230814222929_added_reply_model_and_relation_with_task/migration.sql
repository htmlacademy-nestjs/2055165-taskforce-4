-- CreateTable
CREATE TABLE "replies" (
    "reply_id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "executor_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("reply_id")
);

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
