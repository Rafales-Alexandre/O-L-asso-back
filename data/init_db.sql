-- Deploy batala:init_db to pg

BEGIN;
 
CREATE ROLE "spedata" WITH LOGIN PASSWORD 'batala';

 CREATE DATABASE "batala" WITH OWNER = "batala";

COMMIT;
