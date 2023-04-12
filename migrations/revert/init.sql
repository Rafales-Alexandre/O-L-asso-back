-- Revert batala:init from pg

BEGIN;

DROP TABLE "user-has-suit";
DROP TABLE "suit";
DROP TABLE "instrument";
DROP TABLE "user";
DROP TYPE "role";
DROP TYPE "pupitre";
DROP TYPE "size";
DROP TYPE "gender";

COMMIT;
