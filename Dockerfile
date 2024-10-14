FROM node:21

WORKDIR /usr/src/app

RUN apt-get update

COPY . .

RUN yarn

EXPOSE 3000
