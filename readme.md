# projet-01-o-lasso-back

## Initialisation !


To begin the project ,type   ``` bash init_esLint.sh```
 and run ``` esLint --init ```
e
Then run  ```bash sqitch_script.sh```

Run init > The admin requested is the super user of your specific installation of postgresql

This will create the database called "batala" and the owner "spedata" with password 'batala' and the directories and files in the "migrations" directory.

Then run again ```bash sqitch_script.sh```



Then, run node data/seeding.js

If it doesn't work :
Take a break, breath. Don't burn your keyboard.

*Can't run esLint_sh*; are you in the good directory ? You should be at the root.
*Cant't run sqitch_script*
Comment the init_db file. Run the following command :

sudo -i -u postgres psql
CREATE USER spedata WITH PASSWORD 'batala';
CREATE DATABASE batala WITH OWNER spedata;

And re-run sqitch_script, deploy > All 



Can't deploy a specific versions ? where working on it. It's a well know issue.

 If you need value to work with a very specific files or version, follow the method ;
sudo -U -i psql;
#-> CREATE USER batala WITH PASSWORD 'batala' ;
#-> CREATE DATABASE batala WITH Owner batala ;
\q
psql -U batala -d batala -f script/init.sql
\q
psql -U batala -d batala -f script/batala.sql
node data/seeding.js
