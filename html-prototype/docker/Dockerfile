FROM alpine

RUN apk update && \
    apk add nginx

COPY docker/default.conf /etc/nginx/http.d/default.conf

WORKDIR /var/www/html

CMD ["sh", "-c", "nginx -g 'daemon off;'"]
