-- Revert batala:batala from pg

BEGIN;

DROP TABLE instrument, suit, user_has_suit CASCADE;

COMMIT;
