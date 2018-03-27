FROM node:alpine

RUN apk add --update bash && rm -rf /var/cache/apk/*

RUN mkdir -p /code/hapi
WORKDIR /code/hapi

COPY package.json /code/hapi
RUN npm install

COPY server.js /code/hapi

EXPOSE 8000
CMD ["npm", "start"]