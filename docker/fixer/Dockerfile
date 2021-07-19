FROM php:7.3-cli-alpine
ADD ./docker/fixer/php-cs-fixer-v2.phar /usr/local/bin/php-cs-fixer
RUN ["chmod", "+x", "/usr/local/bin/php-cs-fixer"]
WORKDIR /var/www/backend
ENTRYPOINT ["php-cs-fixer"]
CMD ["--version"]
