FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 4000

ENV PORT=4000

CMD node build/index.js