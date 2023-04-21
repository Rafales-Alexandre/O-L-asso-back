-- Revert init.sql from pg 

DROP DATABASE batala;
DROP USER batala;
CREATE USER batala WITH PASSWORD 'batala';
CREATE DATABASE batala OWNER batala;