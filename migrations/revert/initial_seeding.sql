-- Revert batala:initial_seeding from pg

BEGIN;

TRUNCATE "user_has_suit" CASCADE; 
TRUNCATE "user" CASCADE;
TRUNCATE "suit";
TRUNCATE "instrument";

COMMIT;
