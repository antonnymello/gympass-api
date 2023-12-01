/*
  Warnings:

  - Added the required column `id_gym` to the `check_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check_ins" ADD COLUMN     "id_gym" TEXT NOT NULL,
ADD COLUMN     "id_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_id_gym_fkey" FOREIGN KEY ("id_gym") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
