FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app
RUN npm install
RUN npm install --save bell hapi-auth-cookie

# Bundle app source
COPY server.js /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]