FROM node:22

WORKDIR /app

COPY package*.json .

RUN yarn install

COPY . .

EXPOSE 8088

CMD ["node", "server.js"]