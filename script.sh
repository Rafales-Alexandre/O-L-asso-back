#!/bin/sh

echo '.oO0    Bienvenue sur votre nouveau script    0Oo.'

sudo -u postgres psql -f init.sql
 echo ".oO0    Suppression et création de la base de données    0Oo."


touch .env
echo '.oO0    Fichier .env créer    0Oo.'

echo "
PGHOST=localhost
PGPORT=5432
PGDATABASE=batala
PGUSER=batala
PGPASSWORD=batala
PORT=3000
SECRET=batala
APIADDRESS=http://localhost:3000/graphql
NODE_ENV=developpement
EMAIL=jc.batala.lr@gmail.com
EMAILPASSWORD=Bata-test" >>.env

echo ".oO0    Fichier .env écrit    0Oo."
npm i
echo '.oO0    Npm init et install éffectué    0Oo.'

psql -U batala -d batala -h localhost -f migrations/deploy/init_tables.sql

echo '.oO0    Tables de la Base de données crées    0Oo.'

node ./data/seeding.js
echo '.oO0    Injections des données réalisées    0Oo.'

node server.js
