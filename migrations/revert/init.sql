
-- Deploy batala:init to pg
BEGIN;

DROP TABLE "user_has_suit";
DROP TABLE "suit";
DROP TABLE "instrument";
DROP TABLE "user";
DROP TYPE role ;
DROP TYPE pupitre;
DROP TYPE size ;
DROP TYPE gender ;
DROP TYPE IF EXISTS gender, size, pupitre, role;
DROP DOMAIN "email";
DROP DOMAIN "postal_code_fr";
DROP DOMAIN IF EXISTS email;
DROP DOMAIN IF EXISTS postal_code_fr;

COMMIT;