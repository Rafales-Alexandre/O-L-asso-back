# Je prends l'identité de spedata :
export PGUSER=spedata

# Je supprime la BDD ocolis et l'utilisateur admin_ocolis
sudo -i -u postgres psql

CREATE ROLE "spedata" WITH PASSWORD 'batala'
CREATE DATABASE "batala" WITH OWNER "spedata"