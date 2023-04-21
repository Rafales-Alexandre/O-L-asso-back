#!/bin/sh

echo 'Here we Go !'

sudo -u postgres psql -f init.sql
 echo "drop and recreate table"


touch .env
echo 'env created'

echo "
PGHOST=localhost
PGPORT=5432
PGDATABASE=batala
PGUSER=batala
PGPASSWORD=batala
PORT=3000" >>.env

echo ".env effective !"
npm i
echo 'npm init done'

psql -U batala -d batala -h localhost -f migrations/deploy/init_tables.sql

echo 'tables created !'

node ./data/seeding.js
echo 'seeding.done'

nodemon server.js