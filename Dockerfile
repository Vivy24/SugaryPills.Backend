FROM node:lts-alpine as builder

# USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm install
RUN npm ci --only=production

COPY . .
EXPOSE 8080
RUN npm build
CMD [ "node", "dist/index.js" ]