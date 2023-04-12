# Je prends l'identité de spedata :
export PGUSER=spedata

# Je supprime la BDD ocolis et l'utilisateur admin_ocolis
sudo -i -u postgres psql

CREATE USER spedata WITH PASSWORD 'spedata';
CREATE DATABASE batala WITH OWNER spedata;

