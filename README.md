# Sprobe Laravel ReactJS Boilerplate
A base template for `ReactJS (16.9.0)` with backend API implementation using `Laravel (6.18.35)` preconfigured `laravel/passport` authentication.

## Specifications / Infrastructure Information
* Nginx
* PHP-FPM
* MySQL
* Postfix
* CS-Fixer
* Data Volume
* Composer
* Cron
* Node/NPM
* Redis

## Prerequisites
* GIT
* Docker / Docker Toolbox with a running Docker Machine OR Docker for Windows

# Getting Started
Setup the `.env` file for Docker in the root directory  
```
cp .env.example .env
```
Make sure to fillup the following variables
```
ENVIRONMENT=development                 # development/staging/production
PROJECT_NAME=YOUR_PROJECT_NAME_HERE     # Prefix for the Docker Containers to be created
MYSQL_ROOT_PASSWORD=p@ss1234!           # root password of the root mysql user
MYSQL_DATABASE=YOUR_DATABASE_NAME       # use this value in src/backend/.env
MYSQL_USER=YOUR_DATABASE_USER           # use this value in src/backend/.env
MYSQL_PASSWORD=YOUR_DATABASE_USER       # use this value in src/backend/.env
....
....
....
API_DOMAIN=api.tcg.local // for local development
APP_DOMAIN=tcg.local // for local development
```
For Local Development in windows, add the following lines to `C:\Windows\System32\drivers\etc\hosts` or `/etc/hosts` for ubuntu  
```
192.168.99.100    tcg.local api.tcg.local
```
Note: Replace `192.168.99.100` with your Docker Machine IP.  
  
## Build the all containers  
```
docker-compose build
```
To build/rebuild a specific container, run the following command, CONTAINER_NAME is from the `docker-compose.yml`  
```
docker-compose build CONTAINER_NAME
```
Start the containers  
```
docker-compose up -d
```
Run the following command to login to any Docker Container  
```
docker exec -it CONTAINER_NAME bash
```
## Setting up Laravel
Install the composer packages  
```
docker-compose run composer install
```
Create the `.env` file and run the following to generate key for Laravel  
```
docker-compose run php cp .env.example .env
docker-compose run php php artisan key:generate
```
Update the `.env` values especially the database credentials then refresh the config  
```
docker-compose run php php artisan config:clear
```
Run the migration
```
docker-compose run php php artisan migrate:fresh
```
If you have seeders, you can run it by using the following command
```
docker-compose run php php artisan db:seed
```

---
Run the Laravel Passport installation
```
docker-compose run php php artisan passport:install --force
```
Copy the generated password grant Client ID & Secret in the `.env` file
```
API_CLIENT_ID={COPY FROM TERMINAL}
API_CLIENT_SECRET={COPY FROM TERMINAL}
API_VERSION=v1
```
After setting up all the values in the `.env` file, run the following command to make sure the environment variables are updated successfully.  
```
docker-compose run php php artisan config:clear
```
---

## PSR2 Coding Style
Running the Coding Standards Fixer Container  
  
To check without applying any fixes, run the following command:
```
docker-compose run fixer fix --dry-run -v
```
To fix all your PHP code to adhere the PSR2 Coding style, run:
```
docker-compose run fixer fix
```
To Apply fix only to a specific file
```
docker-compose run fixer fix <<file_name>>
```

## Unit Testing
### PHPUnit
Running a Test Case
```
docker-compose run php ./phpunit tests/<<test_file>>
```
Running the whole Test Suite
```
docker-compose run php ./phpunit
```
The code coverage result will be available at  
<https://API_DOMAIN/report>
  
The code coverage logs will be available at  
<https://API_DOMAIN/report/logs>
  

## BACKEND
To access the frontend site just type in the **API_DOMAIN** you set in the `.env` file
```
APP_DOMAIN=api.tcg.local // for local development
```
in this case: https://api.tcg.local/v1  

We are using **`v1`** as base suffix for our api routes following the rest standards. All routes should be declared in the **`src/backend/routes/api.php`** file.

---

## FRONTEND
This package uses ReactJS as frontend framework. This docker setup will automatically serve the ReactJS via node container.  

All the source code for frontend development is in `src/frontend` directory.  

### Development
The node container runs with hot-reloading, so any changes you did on the `src/frontend` directory will reflect automatically in the browser.  

This being proxied by the nginx container so you can directly access the frontend site in the `APP_DOMAIN` you set in the `.env` file.  

Set the `.env` file for docker to:
```
ENVIRONMENT=development
```
Also update the `src/frontend/.env` file into
```
REACT_APP_API_URL=https://api.tcg.local/v1/       // THE API DOMAIN SET ON DOCKER ENV FILE
REACT_APP_CLIENT_ID=2                             // GENERATED FROM php artisan passport:install
REACT_APP_CLIENT_SECRET=dFbXkkUZriUySS3dXB4       // GENERATED FROM php artisan passport:install
```
Build all containers by running
```
docker-compose stop && docker-compose build
```
To start all containers and view the site. Run
```
docker-compose up -d
```
To access the frontend site just type in the **APP_DOMAIN** you set in the `.env` file
```
APP_DOMAIN=tcg.local // for local development
```
in this case: https://tcg.local

### Production/Staging Build
Set the `.env` file to
```
ENVIRONMENT=staging
# or
ENVIRONMENT=production
```
Also update the `src/frontend/.env` file into
```
REACT_APP_API_URL=https://api.tcg.com/v1/         // THE API DOMAIN SET ON DOCKER ENV FILE
REACT_APP_CLIENT_ID=2                             // GENERATED FROM php artisan passport:install
REACT_APP_CLIENT_SECRET=dFbXkkUZriUySS3dXB4       // GENERATED FROM php artisan passport:install
```
Build all containers by running
```
docker-compose stop && docker-compose build
```
Run this command after to generate the build files that will be served by nginx:
```
docker-compose run node npm run build
```  
This will generate the files that will be used by nginx for server side rendering `src/frontend/build`. This is mapped to `/var/www/frontend/build` directory of the data container.  

To start all containers and view the site. Run
```
docker-compose up -d
```
To access the frontend site just type in the **APP_DOMAIN** you set in the `.env` file
```
APP_DOMAIN=tcg.com
```
in this case: https://tcg.com
