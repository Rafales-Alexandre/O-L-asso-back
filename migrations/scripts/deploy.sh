#!/bin/sh

echo "Deployment"

./deploy/init.sql
./deploy/init_tables.sql
../../data/seeding.js

echo "Deployement done"
