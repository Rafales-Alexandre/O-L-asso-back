#!/bin/sh




#   _____           _       _         _            _            _       _                           _    
#  /  ___|         (_)     | |       | |          | |          | |     (_)                         | |   
#  \ `--.  ___ _ __ _ _ __ | |_    __| | ___    __| | ___ _ __ | | ___  _  ___ _ __ ___   ___ _ __ | |_  
#   `--. \/ __| '__| | '_ \| __|  / _` |/ _ \  / _` |/ _ \ '_ \| |/ _ \| |/ _ \ '_ ` _ \ / _ \ '_ \| __| 
#  /\__/ / (__| |  | | |_) | |_  | (_| |  __/ | (_| |  __/ |_) | | (_) | |  __/ | | | | |  __/ | | | |_  
#  \____/ \___|_|  |_| .__/ \__|  \__,_|\___|  \__,_|\___| .__/|_|\___/|_|\___|_| |_| |_|\___|_| |_|\__| 
#                    | |                                 | |                                             
#                    |_|                                 |_|                                             

echo "Deployment"

./deploy/init.sql
./deploy/init_tables.sql
../../data/seeding.js

echo "Deployement done"
