#!/bin/bash

# -------------------------------------------------
# Big Up to Kevin Hesse https://github.com/Kevin-HESSE for his amazing script ! 
#Important variable
# -------------------------------------------------------------------------------#
# License                                                                        #
# -------------------------------------------------------------------------------#
#MIT License
#
#Copyright (c) 2023 Kévin HESSE
#
#Permission is hereby granted, free of charge, to any person obtaining a copy
#of this software and associated documentation files (the "Software"), to deal
#in the Software without restriction, including without limitation the rights
#to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#copies of the Software, and to permit persons to whom the Software is
#furnished to do so, subject to the following conditions:
#
#The above copyright notice and this permission notice shall be included in all
#copies or substantial portions of the Software.
#
#THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
#SOFTWARE.
# -------------------------------------------------------------------------------#
# License                                                                        #
# -------------------------------------------------------------------------------#

# -------------------------------------------------------------------------------#
# Variable to modify                                                             #
# -------------------------------------------------------------------------------#
# migration_folder represents the directory where deploy, revert and verify directory are located
migration_folder=migrations

# Don't specify the extension! All scripts run with .sh extension by default.
# The script name for versioning
version_file_name=db_version

# Use this variable for development environment to avoid the prompt or comment them if you don't need them
# Design the user of the sql server who own the database of the project
db_user=batala
# Represent the database of the project
database=<dbbase>
# The password of the sql user
db_password=<dbpassword>

#Allow you to configure which database engine you want to use for your project.
#Uncomment the one needed
engine=pg
#engine=mysql
# -------------------------------------------------------------------------------#
# Variable to modify                                                             #
# -------------------------------------------------------------------------------#


# -------------------------------------------------------------------------------#
# Script                                                                         #
# -------------------------------------------------------------------------------#
# -------------------------------------------------
# Path (Do not modify)
# Script which verify the existence
# -------------------------------------------------

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

if [[ -d "$SCRIPT_DIR/$migration_folder" ]]; then
    migration_path="$SCRIPT_DIR/$migration_folder"
    option_list=(init add deploy revert verify)
    init_setup=true
else
    option_list=(init)
fi

# -------------------------------------------------------------------------------#
# Function                                                                        #
# -------------------------------------------------------------------------------#
#Function for displaying help message when the flag -h is opted
function help_message {
    printf "This script will help you to execute sqitch command automatically. \n\n"
    printf "Command : %s [-a|d|v|r] \n" "${0##*/}"
    printf "Options : \n"
    printf "%5s | %s \n" "-a" "Add a new version" "-d" "Deploy a specified version or all" "-v" "Verify a specified version or all" "-r" "Revert a specified version or all"
}

# Function which has several actions :
# - drop (if exist) the database and the user provided at the beginning of the script before creating them.
# - create a versioning script mandatory for the use of this script or execute it if it exist
# - delete sqitch.conf and sqitch.plan if exist and create them with new setup
function command_sqitch_init {
    read -rp "The admin to connect >> " admin

    if [ -z ${db_user+x} ]; then
        read -rp 'Database user >> ' db_user
    fi

    if [ -z ${database+x} ]; then
        read -rp 'Database password >> ' database
    fi

    dropdb "$database" --if-exists -U "$admin"
    echo "Database $database deleted !"
    dropuser "$db_user" --if-exists -U "$admin"
    echo "User $db_user deleted !"

    createuser "$db_user" -P -U "$admin"
    echo "User $db_user created !"
    createdb "$database" -O "$db_user" -U "$admin"
    echo "Database $database created !"

    if [ -f sqitch.conf ]; then rm sqitch.conf; fi
    if [ -f migrations/sqitch.plan ]; then rm migrations/sqitch.plan; fi
    echo "File from sqitch deleted !"

    sqitch init --engine "$engine" --top-dir "$migration_folder" "$database" --target db:"$engine":"$database"
    echo "Sqitch initialized !"

    if [ -f "$migration_folder"/"$version_file_name".sh ]; then
        bash "$SCRIPT_DIR"/"$migration_folder"/"$version_file_name".sh
    else
        touch "$SCRIPT_DIR"/"$migration_folder"/"$version_file_name".sh
        echo "$version_file_name.sh has been created"
    fi
}

# Execute the command sqitch add with an autocompletion of the versionning script
function command_sqitch_add {
    while [ -z "$userfile" ]; do read -rp 'Name the new file to create >> ' userfile; done
    while [ -z "$usercomment" ]; do read -rp 'Comment the new version to add >> ' usercomment; done

    if [ -f "$migration_folder"/"$version_file_name".sh ]; then
        sqitch add "$userfile" -n "$usercomment"
        echo sqitch add "$userfile" -n "\"$usercomment\"" >>"$migration_folder"/"$version_file_name".sh
        echo "The version $userfile has been inserted into $migration_folder/$version_file_name"
    else
        echo "$migration_folder/$version_file_name.sh doesn't exist. Have you run the init option before ?"
        exit 1
    fi
}

# Execute one of the following action depending of the argument passed in the function
# - deploy : execute sqitch deploy
# - revert : execute sqitch revert
# - verify : execute sqitch verify
function command_sqitch_action {
    file_list="All $(for s in "$migration_path"/"$1"/*.sql; do [ -f "$s" ] && basename "$s" | cut -d . -f1-2; done)"

    printf "%b" "\a\nSelect a stage to process:\n" >&2
    select file in $file_list; do
        if [ -z ${db_user+x} ]; then
            read -rp 'Database user : ' db_user
        fi
        if [ -z ${db_password+x} ]; then
            read -rsp 'Database password : ' db_password
            echo "Password registered"
        fi

        export PGUSER=$db_user
        export PGPASSWORD=$db_password

        if [ "$file" == 'All' ]; then
            sqitch "$1"
        elif [ "$file" ]; then
            sqitch "$1" "$file"
        fi
        break
    done
}
# -------------------------------------------------------------------------------#
# Function                                                                         #
# -------------------------------------------------------------------------------#

# -------------------------------------------------------------------------------#
# Main Script                                                                         #
# -------------------------------------------------------------------------------#
if [ $# -gt 1 ]; then
    echo 'Too many arguments'
    exit 1
elif [ $# -eq 1 ] && [ "$init_setup" ]; then
    case $1 in
    -a)
        command_sqitch_add
        ;;
    -d)
        command_sqitch_action "deploy"
        ;;
    -v)
        command_sqitch_action "verify"
        ;;
    -r)
        command_sqitch_action "revert"
        ;;
    -h)
        help_message
        exit 0
        ;;
    *)
        printf "Error: Argument invalid !\n"
        exit 1
        ;;
    esac
fi

PS3='Action to execute > '

printf "Select an action to execute: \n" >&2

select item in "${option_list[@]}"; do
    case $item in
    'init')
        command_sqitch_init
        ;;
    'add')
        command_sqitch_add
        ;;
    'verify' | 'revert' | 'deploy')
        command_sqitch_action "$item"
        ;;
    *)
        echo "Error: Invalid answer"
        exit 1
        ;;
    esac
    exit 0
done

# -------------------------------------------------------------------------------#
# Main Script                                                                         #
# -------------------------------------------------------------------------------#
