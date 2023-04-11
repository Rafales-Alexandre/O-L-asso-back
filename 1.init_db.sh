export PGUSER=spedata

dropdb batala
echo "BDD supprimée"
createdb batala -O spedata
echo "BDD créée"

# Je supprime sqitch.conf et sqitch.plan
rm sqitch.conf
rm sqitch.plan

# J'initiase Sqitch
sqitch init batala --target db:pg:batala --top-dir migrations
echo "Sqitch initialisé"

# J'ajoute la version 1 (création des tables)
sqitch add init -n "création des tables"