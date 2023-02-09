/*
  Warnings:

  - The primary key for the `like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `quotes_id` on the `like` table. All the data in the column will be lost.
  - You are about to drop the `quotes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quote_id` to the `like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_quotes_id_fkey";

-- DropForeignKey
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_user_id_fkey";

-- AlterTable
ALTER TABLE "like" DROP CONSTRAINT "like_pkey",
DROP COLUMN "quotes_id",
ADD COLUMN     "quote_id" TEXT NOT NULL,
ADD CONSTRAINT "like_pkey" PRIMARY KEY ("user_id", "quote_id");

-- DropTable
DROP TABLE "quotes";

-- CreateTable
CREATE TABLE "quote" (
    "quote_id" TEXT NOT NULL,
    "text" VARCHAR(300) NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quote_pkey" PRIMARY KEY ("quote_id")
);

-- AddForeignKey
ALTER TABLE "quote" ADD CONSTRAINT "quote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote"("quote_id") ON DELETE RESTRICT ON UPDATE CASCADE;
