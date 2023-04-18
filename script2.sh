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
PORT=3000' >>/var/www/html/00-Apotheose/projet-01-o-lasso-back/.env

npm i
echo 'npm done'

node ./data/seeding.js
echo 'seeding.done'
