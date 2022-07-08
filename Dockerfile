FROM node:16

# Create app directory
WORKDIR /var/elspotpris.dk

COPY . .

RUN npm ci
WORKDIR /var/elspotpris.dk/client
RUN npm ci
RUN npm run build

WORKDIR /usr/src/app
EXPOSE 3000
CMD [ "node", "app.js" ]