FROM php:8.4-cli
ENV NODE_VERSION=22.14.0

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
    && pecl install redis  \
    && pecl install swoole \
    && docker-php-ext-enable redis swoole\
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install sockets gd pdo pdo_mysql opcache bcmath simplexml xml xmlreader xmlwriter pcntl\
    && apt-get clean && rm -rf /var/lib/apt/lists/*


# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"


COPY apiserver/ /var/www/html/

# Set the working directory
WORKDIR /var/www/html

#RUN set -x	&& adduser -u 82 -D -S -G www-data www-data


#RUN composer install && npm install 
# Expose the PORT 8000 for swoole
EXPOSE 8000

# Start PHP-FPM
#CMD ["php", "artisan", "octane:start", "--server=swoole", "--host=0.0.0.0", "--port=8000" ,"--watch"]