-- Revert batala:init_db from pg

BEGIN;

/* DROP DATABASE IF EXISTS batala;
DROP ROLE IF EXISTS spedata; */

COMMIT;
