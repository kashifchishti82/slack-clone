FROM php:8.4-fpm-alpine


# Install additional PHP extensions (if needed)
RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libpng-dev libjpeg-turbo-dev freetype-dev libc-dev make autoconf \
    && apk add --no-cache libxml2-dev openssl curl bash \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo pdo_mysql \
    && apk del .build-deps

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
    
# Set the working directory
WORKDIR /var/www/html

#RUN set -x	&& adduser -u 82 -D -S -G www-data www-data


# Expose the PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]