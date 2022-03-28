#!/bin/bash

# Docker Build Variables
ENVIRONMENT=
PROJECT_NAME=
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
APP_DOMAIN=

echo "Environment:"
PS3="Select your Environment: "
options=("Development" "Staging" "Production")
select opt in "${options[@]}" "Quit"; do 
    case "$REPLY" in
        1) ENVIRONMENT=development; break;;
        2) ENVIRONMENT=staging; break;;
        3) ENVIRONMENT=production; break;;
        $((${#options[@]}+1))) echo "Goodbye!"; break;;
        *) echo "Invalid option. Try another one.";continue;;
    esac
done

# TODO: Validate Domain no special character and spaces exept underscore
while [[ $PROJECT_NAME = "" && $PROJECT_NAME != ^\(?![0-9._]\)\(?!.*[0-9._]$\)\(?!.*\d_\)\(?!.*_\d\)[a-zA-Z0-9_]+$ ]]; do
    read -p 'Project Name: ' PROJECT_NAME
done

while [[ $MYSQL_DATABASE = "" ]]; do
    read -p 'MySQL Database: ' MYSQL_DATABASE
done

while [[ $MYSQL_USER = "" ]]; do
   read -p 'MySQL Username: ' MYSQL_USER
done

while [[ $MYSQL_PASSWORD = "" ]]; do
   read -p 'MySQL Password: ' MYSQL_PASSWORD
done

# TODO: Validate Domain
while [[ $APP_DOMAIN = "" ]]; do
   read -p 'Application Domain Name: ' APP_DOMAIN
   echo "(For development environment, make sure to add the Domain Name in your machine host file.)"
done

read -p "Proceed to Build? (Yes/No): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    cp .env.example .env
    sed -i "s/ENVIRONMENT=/ENVIRONMENT=$ENVIRONMENT/g" .env
    sed -i "s/PROJECT_NAME=/PROJECT_NAME=$PROJECT_NAME/g" .env
    sed -i "s/MYSQL_ROOT_PASSWORD=/MYSQL_ROOT_PASSWORD=$(< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-16})/g" .env
    sed -i "s/MYSQL_DATABASE=/MYSQL_DATABASE=$MYSQL_DATABASE/g" .env
    sed -i "s/MYSQL_USER=/MYSQL_USER=$MYSQL_USER/g" .env
    sed -i "s/MYSQL_PASSWORD=/MYSQL_PASSWORD=$MYSQL_PASSWORD/g" .env

    sed -i "s/API_DOMAIN=/API_DOMAIN=api.$APP_DOMAIN/g" .env
    sed -i "s/APP_DOMAIN=/APP_DOMAIN=$APP_DOMAIN/g" .env

    if [[ $ENVIRONMENT == "development" ]]; then
        sed -i "s/ENABLE_XDEBUG=0/ENABLE_XDEBUG=1/g" .env
    fi
fi

# Build Docker Containers
docker-compose build --no-cache

# Install PHP Laravel Packages
docker-compose run --rm composer install

