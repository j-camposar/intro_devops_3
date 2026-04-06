FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY index.html .
COPY index.js .
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80