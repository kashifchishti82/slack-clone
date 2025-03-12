FROM httpd:2.4-alpine

# Install necessary dependencies
RUN apk update && apk add --no-cache bash 

RUN mkdir -p /var/www/html && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# Copy custom Apache configuration files
COPY config/apache2.conf /usr/local/apache2/conf/
COPY virtualhosts/ /usr/local/apache2/conf/extra/vhosts/


# Adjust directory 
RUN sed -i 's|/usr/local/apache2/htdocs|/var/www/html|g' /usr/local/apache2/conf/httpd.conf

# Adjust permissions 

RUN sed -i 's/User daemon/User www-data/g' /usr/local/apache2/conf/httpd.conf && \
    sed -i 's/Group daemon/Group www-data/g' /usr/local/apache2/conf/httpd.conf

# Enable the virtual host configuration
RUN echo "Include /usr/local/apache2/conf/extra/vhosts/*.conf" >> /usr/local/apache2/conf/httpd.conf
RUN echo "LoadModule rewrite_module modules/mod_rewrite.so" >> /usr/local/apache2/conf/httpd.conf
RUN echo "LoadModule proxy_module modules/mod_proxy.so" >> /usr/local/apache2/conf/httpd.conf
RUN echo "LoadModule proxy_fcgi_module modules/mod_proxy_fcgi.so" >> /usr/local/apache2/conf/httpd.conf

# Expose Apache ports
EXPOSE 80
# Start Apache
CMD ["httpd-foreground"]