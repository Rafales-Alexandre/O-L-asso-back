psql -i -u postgres psql

DROP IF EXISTS DATABASE batala;
DROP IF EXISTS USER batala;
CREATE USER batala WITH PASSWORD 'batala';
CREATE DATABASE batala OWNER batala;
exit
psql -U batala -d batala -h localhost -f migrations/deploy/init_tables.sql
nano .env
        ``` 
        PGHOST=localhost
        PGPORT=5432
        PGDATABASE=batala
        PGUSER=batala
        PGPASSWORD=batala
        PORT=3000
        ```

npm i

node ./data/seeding.js


```bash
psql -i -u postgres psql

