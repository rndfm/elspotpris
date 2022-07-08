FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm ci
WORKDIR /usr/src/app/client
RUN npm ci
RUN npm run build

WORKDIR /usr/src/app
EXPOSE 3000
CMD [ "node", "app.js" ]