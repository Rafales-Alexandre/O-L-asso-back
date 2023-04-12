# projet-01-o-lasso-back

## It's ALIVE !

To begin,  ``` bash init_esLint.sh```

Then ``` bash init_db.sh ```

and ```bash sqitch_script.sh```

Run deploy > all

IF it doesn't work :
Take a break, breath. Don't burn your keyboard.

Can't run esLint_sh ; are you in the good directory ? You should be at the root.
Cant't run sqitch_script ? Verify the value you enter in it; batala, batala, batala.
Can't deploy a specific versions ? where working on it. It's a well know issue. If you need value to work with, follow the method ;
sudo -U -i psql;
#-> CREATE USER batala WITH PASSWORD batala ;
#-> CREATE DATABASE batala WITH Owner batala ;
\q
psql -U batala -d batala -f script/init.sql
\q
psql -U batala -d batala -f script/batala.sql

