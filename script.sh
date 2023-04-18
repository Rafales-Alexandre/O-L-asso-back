#!/bin/bash
 
###################################################
# My First Bash Shell script to execute those fucking psql command 
###################################################
 
#Set the value of variable
database=<database> 
 
#Execute few psql commands: 
#Note: you can also add -h hostname -U username in the below commands. 
 
DROP IF EXISTS DATABASE batala;
DROP IF EXISTS USER batala;
CREATE USER batala WITH PASSWORD 'batala';
CREATE DATABASE batala OWNER batala;
exit
 
#Print the value of variable
echo "First half done ! "