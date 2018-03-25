FROM node:alpine

RUN apk add --update bash && rm -rf /var/cache/apk/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY server.js /usr/src/app

COPY createDb.sql /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]