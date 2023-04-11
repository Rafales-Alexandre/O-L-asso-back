-- Revert batala:init from pg

BEGIN;

DROP TABLE user CASCADE;

COMMIT;
