FROM alpine:latest

RUN apk --no-cache add nginx nodejs tini nodejs-npm

COPY devops/nginx.conf /etc/nginx/nginx.conf
WORKDIR /opt/cici

COPY package.json .
RUN npm install
COPY . .

EXPOSE 80

CMD ["/sbin/tini", "--", "/opt/cici/devops/run.sh"]
