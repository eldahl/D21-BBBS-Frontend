FROM nginx:alpine

WORKDIR /usr/share/nginx/html
# Clear default content in www root
RUN rm -rf ./*
# Put production build into nginx root folder
COPY /dist .

WORKDIR /etc/nginx/conf.d
# Clear default nginx config
RUN rm default.conf
# Copy over the our custom nginx config
COPY /dockerfiles/default.conf .

EXPOSE 80
EXPOSE 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
