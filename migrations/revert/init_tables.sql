-- Revert batala: init_tables.sql from pg 

BEGIN;

DROP TABLE "user_has_suit";

DROP TABLE "suit";

DROP TABLE "instrument";

DROP TABLE "user";

DROP TYPE "role" ;

DROP TYPE "pupitre" ;

DROP TYPE "size" ;

DROP TYPE "gender" ;

DROP DOMAIN "email";

DROP DOMAIN "postal_code_fr";

COMMIT;