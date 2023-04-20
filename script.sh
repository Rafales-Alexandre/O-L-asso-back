#!/bin/sh
 
###################################################
# My First Bash Shell script to execute those fucking psql command 
###################################################
 
#Execute the commands

sudo -u postgres psql -f init.sql
 echo "drop and recreate table"


 

echo "First half done ! "
exit
 
