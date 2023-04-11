-- Revert batala:batala from pg

BEGIN;

TRUNCATE "suit";
TRUNCATE "instrument";

COMMIT;
