FROM php:8.4-fpm-bullseye


# Install additional PHP extensions (if needed)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libxml2-dev \
    libssl-dev \
    curl \
    bash \
    unzip \
    git \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install sockets gd pdo pdo_mysql opcache bcmath simplexml xml xmlreader xmlwriter\
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory
WORKDIR /var/www/html

#RUN set -x	&& adduser -u 82 -D -S -G www-data www-data
#COPY ../../apiserver/ /var/www/html/

# Expose the PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]