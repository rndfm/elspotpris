FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm ci

EXPOSE 3000

CMD node app.js