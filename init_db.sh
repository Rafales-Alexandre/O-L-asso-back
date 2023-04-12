# Je prends l'identité de spedata :
export PGUSER=spedata

# Je supprime la BDD ocolis et l'utilisateur admin_ocolis
dropdb batala
echo "BDD supprimée"
dropuser batala
echo "admin batala supprimé"

# Je crèe la BDD ocolis et l'utilisateur admin_ocolis
createuser batala -P
echo "admin batala créé"
createdb batala -O batala
echo "BDD créée"
