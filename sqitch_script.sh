#!/bin/bash

# -------------------------------------------------
# Big Up to Kevin Hesse https://github.com/Kevin-HESSE for his amazing script ! 
#Important variable
# -------------------------------------------------
#migration_path represents the directory where deploy, revert and verify directory are located
migration_folder=migrations
#script_path represents the directory where all other script are located
script_folder=script

# -------------------------------------------------
# File name
# -------------------------------------------------
#Don't specify the extension! All scripts run with .sh extension by default.
# The script name for versioning
version_file_name=db_version

#Use this variable for development environment to avoid the prompt or comment them if you don't need them
# Design the user of the sql server who own the database of the project
dbuser=spedata
# Represent the database of the project
database=batala
# The password of the sql user
dbpassword=spedata

# -------------------------------------------------
# Database engine
# -------------------------------------------------

#Allow you to configure which database engine you want to use for your project.
#Uncomment the one needed
engine=pg
#engine=mysql

# -------------------------------------------------
# Path (Do not modify)
# Script which verify the existence
# -------------------------------------------------

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

if [[ -d "$SCRIPT_DIR/$migration_folder"
        && -d "$SCRIPT_DIR/$script_folder" ]];
  then
    migration_path="$SCRIPT_DIR/$migration_folder"
    script_path="$SCRIPT_DIR/$script_folder"
    optionlist=(init add deploy revert verify)
else
  echo "WARNING : The directory $migration_folder and $script_folder doesn't exist"
  optionlist=(init)
fi

# -------------------------------------------------
# Script link to sqitch automatisation (Do not modify)
# Execute different instruction based on the user choice
# -------------------------------------------------


PS3='Action to execute > '

printf "Select an action to execute: \n" >&2
select item in "${optionlist[@]}"; do
  if [ "$item" == 'init' ];
  then

    read -rp "The admin to connect >> " admin

    if [ -z ${dbuser+x} ];
    then
      read -rp 'Database user >> ' dbuser
    fi

    if [ -z ${database+x} ];
    then
      read -rp 'Database password >> ' database
    fi

    dropdb "$database" --if-exists -U "$admin"
    echo "Database $database deleted !"
    # dropuser "$dbuser" --if-exists -U "$admin"
    # echo "User $dbuser deleted !"

    # createuser "$dbuser" -P -U "$admin"
    # echo "User $dbuser created !"
    createdb "$database" -O "$dbuser" -U "$admin"
    echo "Database $database created !"

    rm sqitch.conf
    rm migrations/sqitch.plan
    echo "File from sqitch deleted !"

    sqitch init --engine "$engine" --top-dir "$migration_folder" "$database" --target db:"$engine":"$database"
    echo "Sqitch initialized !"

    if [ ! -d "$script_path" ]; then
        mkdir "$SCRIPT_DIR/$script_folder"
    fi

    if [ -f "$script_path"/"$version_file_name".sh ]; then
      bash "$SCRIPT_DIR"/"$script_folder"/"$version_file_name".sh
    else
      touch "$SCRIPT_DIR"/"$script_folder"/"$version_file_name".sh
      echo "$version_file_name.sh has been created"
    fi

    break

  elif [ "$item" == 'add' ];
  then
    read -rp 'File name >> ' userfile
    read -rp 'Comment add version >> ' usercomment

    if [ -f "$script_path"/"$version_file_name".sh ]; then
      sqitch add "$userfile" -n "$usercomment"
      echo sqitch add "$userfile" -n "\"$usercomment\"" >> "$script_path"/"$version_file_name".sh
      echo "The version $userfile has been inserted into $script_path/$version_file_name"
    else
      echo "$script_path/$version_file_name.sh doesn't exist. Have you run the init option before ?"
    fi
    break
  elif [ "$item" ];
  then
    file_list="All $(for s in "$migration_path"/"$item"/*.sql; do [ -f "$s" ] && basename "$s" | cut -d . -f1-2 ; done)"

    printf "%b" "\a\nSelect a stage to process:\n" >&2
    select file in $file_list;
    do
      if [ -z ${dbuser+x} ];
      then
        read -rp 'Database user : ' dbuser
      fi
      if [ -z ${dbpassword+x} ];
      then
        read -rsp 'Database password : ' dbpassword
        echo "Password registered"
      fi

      export PGUSER=$dbuser
      export PGPASSWORD=$dbpassword

      if [ "$file" == 'All' ];
      then
        sqitch "$item"
      elif [ "$file" ];
      then
        sqitch "$item" "$file"
      fi
      break
    done
    exit 1
  fi

done