-- Revert batala:batala from pg
-- need to find a way to properly truncate user-has-suit 

BEGIN;

BEGIN;

TRUNCATE "suit" CASCADE;

TRUNCATE "instrument" ;


COMMIT;
