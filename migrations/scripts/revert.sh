#!/bin/sh

echo "Revert mode on "

 ./revert/init_tables.sql
 ./revert/init.sql
 
 echo "Revert done"