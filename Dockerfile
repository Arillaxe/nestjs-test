FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

COPY .env .env

RUN yarn build

CMD ["yarn", "start:prod"]
