FROM node:lts-alpine as builder

# USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm install
RUN npm ci --only=production

COPY . .
RUN npm build

# USER production
FROM node:lts-alpine as builder
WORKDIR /home/node
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /home/node/dist .
RUN npm install pm2 -g
EXPOSE 80
CMD ["node","dist/index.js"]

