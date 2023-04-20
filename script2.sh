echo 'Here we Go !'

chmod +x script.sh
echo 'God Mod '

./script.sh

touch .env
echo 'env created'

echo '
PGHOST=localhost
PGPORT=5432
PGDATABASE=batala
PGUSER=batala
PGPASSWORD=batala
PORT=3000' 
>>./projet-01-o-lasso-back/.env

npm i
echo 'npm done'

psql -U batala -d batala -h localhost -f migrations/deploy/init_tables.sql
echo 'tables created !'

node ./data/seeding.js
echo 'seeding.done'

node server.js