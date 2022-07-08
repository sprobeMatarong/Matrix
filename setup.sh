#!/bin/bash

SUCCESS_COLOR='\033[1;32m'
ORANGE_COLOR='\033[0;33m'
NO_COLOR='\033[0m'
BOLD_TEXT='\033[1m'

if ! docker info > /dev/null 2>&1; then
  echo -e "${ORANGE_COLOR}[WARNING]${NO_COLOR} This script requires ${BOLD_TEXT}Docker Desktop${NO_COLOR} and it isn't running. Please start ${BOLD_TEXT}Docker Desktop${NO_COLOR} and try again!"
  exit 1
fi

# Docker Build Variables
ENVIRONMENT=
PROJECT_NAME=
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
APP_DOMAIN=

echo "Environment:"
PS3="Select your Environment [Choose a number]: "
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

# TODO: Validate Domain no special character and spaces except underscore
while [[ $PROJECT_NAME = "" && $PROJECT_NAME != ^\(?![0-9._]\)\(?!.*[0-9._]$\)\(?!.*\d_\)\(?!.*_\d\)[a-zA-Z0-9_]+$ ]]; do
    read -p 'Project Name: ' PROJECT_NAME
done

# remove special characters and spaces and convert string to lowercase
PROJECT_NAME=$(echo ${PROJECT_NAME//[^a-zA-Z ]/""})
PROJECT_NAME=$(echo ${PROJECT_NAME//[ ]/"_"})
PROJECT_NAME=$(echo ${PROJECT_NAME,,})

# Generate MySQL Credentials
MYSQL_DATABASE="${PROJECT_NAME,,}"
MYSQL_USER="${PROJECT_NAME,,}"
MYSQL_PASSWORD=$(< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-16})

while [[ $APP_DOMAIN = "" ]]; do
   read -p 'Application Domain Name(e.g domain.com): ' APP_DOMAIN
   echo "(For development environment, make sure to add the Domain Name in your machine host file.)"
done

read -p "Proceed to Build? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    # Update Docker .env
    echo -n "Setting up Docker environment variables ... "
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

    echo -e "${SUCCESS_COLOR}done${NO_COLOR}"

    # Update Laravel .env
    echo -n "Setting up Laravel environment variables ... "
    cp src/backend/.env.example src/backend/.env
    sed -i "s/APP_NAME=Laravel/APP_NAME=$PROJECT_NAME/g" src/backend/.env
    sed -i "s/APP_ENV=local/APP_ENV=$ENVIRONMENT/g" src/backend/.env

    if [[ $ENVIRONMENT != "development" ]]; then
        sed -i "s/APP_DEBUG=true/APP_DEBUG=false/g" src/backend/.env
    fi

    echo -e "${SUCCESS_COLOR}done${NO_COLOR}"

    sed -i "s/APP_URL=http:\/\/localhost/APP_URL=http:\/\/$APP_DOMAIN/g" src/backend/.env
    sed -i "s/DB_DATABASE=/DB_DATABASE=$MYSQL_DATABASE/g" src/backend/.env
    sed -i "s/DB_USERNAME=/DB_USERNAME=$MYSQL_USER/g" src/backend/.env
    sed -i "s/DB_PASSWORD=/DB_PASSWORD=$MYSQL_PASSWORD/g" src/backend/.env
    sed -i "s/CACHE_DRIVER=file/CACHE_DRIVER=redis/g" src/backend/.env
    sed -i "s/QUEUE_CONNECTION=sync/QUEUE_CONNECTION=redis/g" src/backend/.env
    sed -i "s/API_URL=/API_URL=http:\/\/$APP_DOMAIN\/api\/v1/g" src/backend/.env
    sed -i "s/STORAGE_DISK_URL=/STORAGE_DISK_URL=http:\/\/$APP_DOMAIN\/api\/storage/g" src/backend/.env

    # Update React .env
    echo -n "Setting up React environment variables ... "
    cp src/frontend/.env.example src/frontend/.env
    sed -i "s/REACT_APP_SITE_TITLE=\"Sprobe Base Template\"/REACT_APP_SITE_TITLE=$PROJECT_NAME/g" src/frontend/.env
    sed -i "s/REACT_APP_API_URL=/REACT_APP_API_URL=http:\/\/$APP_DOMAIN\/api\/v1/g" src/frontend/.env
    echo -e "${SUCCESS_COLOR}done${NO_COLOR}"

    # Build Docker Containers
    docker-compose build --no-cache

    # Install PHP Laravel Packages and migrate database with seeders
    docker-compose run --rm php bash -c "composer install && php artisan key:generate && php artisan migrate:fresh --seed"

    # Setup Laravel Passport
    docker-compose run --rm php php artisan passport:install --force >> output.txt

    # Update Laravel & React environment variables
    CLIENT_ID=$(grep 'Client ID\:' output.txt | tail -n 1)
    CLIENT_SECRET=$(grep 'Client secret\:' output.txt | tail -n 1)
    rm output.txt
    CLIENT_ID="$(echo ${CLIENT_ID/Client ID:/""} | tr -d '[:space:]' | sed -r "s/\x1B\[([0-9]{1,3}(;[0-9]{1,2})?)?[mGK]//g")"
    CLIENT_SECRET="$(echo ${CLIENT_SECRET/Client secret:/""} | tr -d '[:space:]' | sed -r "s/\x1B\[([0-9]{1,3}(;[0-9]{1,2})?)?[mGK]//g")"
    sed -i "s/API_CLIENT_ID=/API_CLIENT_ID=$CLIENT_ID/g" src/backend/.env
    sed -i "s/API_CLIENT_SECRET=/API_CLIENT_SECRET=$CLIENT_SECRET/g" src/backend/.env
    sed -i "s/REACT_APP_CLIENT_ID=/REACT_APP_CLIENT_ID=$CLIENT_ID/g" src/frontend/.env
    sed -i "s/REACT_APP_CLIENT_SECRET=/REACT_APP_CLIENT_SECRET=$CLIENT_SECRET/g" src/frontend/.env

    # Start the containers
    docker-compose up -d

    # Display the results
    echo -e "\n\n${SUCCESS_COLOR}Project Setup Completed${NO_COLOR}"
    echo -e "You can now access the app by clicking this link ${SUCCESS_COLOR}\e]8;;http://$APP_DOMAIN\ahttp://$APP_DOMAIN\e]8;;\a${NO_COLOR}"
fi
