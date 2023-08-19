-- CreateTable
CREATE TABLE "pinned_tasks" (
    "favorite_id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pinned_tasks_pkey" PRIMARY KEY ("favorite_id")
);

-- AddForeignKey
ALTER TABLE "pinned_tasks" ADD CONSTRAINT "pinned_tasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
