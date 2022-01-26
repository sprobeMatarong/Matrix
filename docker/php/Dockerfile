FROM php:fpm-alpine
RUN apk update
RUN apk add --no-cache git bash libzip-dev vim pcre-dev ${PHPIZE_DEPS}
RUN docker-php-ext-install zip mysqli pdo_mysql
RUN pecl install redis && docker-php-ext-enable redis
RUN printf '[PHP]\ndate.timezone = "Asia/Tokyo"\n' > /usr/local/etc/php/conf.d/tzone.ini
COPY ./docker/php/uploads.ini /usr/local/etc/php/conf.d/uploads.ini

# Setup xDebug
ARG ENABLE_XDEBUG
COPY ./docker/php/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini
ADD ./docker/php/scripts/configure-xdebug.sh /configure-xdebug.sh
RUN ["chmod", "+x", "/configure-xdebug.sh"]
RUN /configure-xdebug.sh
RUN apk del pcre-dev ${PHPIZE_DEPS}

# Setup Opcache
ARG OPCACHE_VALIDATE_TIMESTAMPS
COPY ./docker/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
ADD ./docker/php/scripts/configure-opcache.sh /configure-opcache.sh
RUN ["chmod", "+x", "/configure-opcache.sh"]
RUN /configure-opcache.sh

# Add Composer to container
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer
