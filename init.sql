-- Initialisation of the database, for a server use  

DROP DATABASE batala;
DROP USER batala;
CREATE USER batala WITH PASSWORD 'batala';
CREATE DATABASE batala OWNER batala;