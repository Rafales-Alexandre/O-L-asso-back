# projet-01-o-lasso-back

## Initialisation !

To begin the project ,type   ``` bash init_esLint.sh```
 and run ``` esLint --init ```

Then run  ```bash sqitch_script.sh```

Run deploy > all

Then, run Node data/seeding.js

If it doesn't work :
Take a break, breath. Don't burn your keyboard.

*Can't run esLint_sh*; are you in the good directory ? You should be at the root.
*Cant't run sqitch_script*
Comment the init_db file. Run the following command :

sudo -i -u postgres psql
CREATE ROLE "spedata" WITH PASSWORD 'batala'
CREATE DATABASE "batala" WITH OWNER "spedata"

And re-run sqitch_script, deploy > All 

Can't deploy a specific versions ? where working on it. It's a well know issue.

 If you need value to work with a very specific files or version, follow the method ;
sudo -U -i psql;
#-> CREATE USER batala WITH PASSWORD batala ;
#-> CREATE DATABASE batala WITH Owner batala ;
\q
psql -U batala -d batala -f script/init.sql
\q
psql -U batala -d batala -f script/batala.sql
node data/seeding.js
