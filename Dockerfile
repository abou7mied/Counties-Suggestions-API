FROM node:14.15.4-alpine AS base

RUN adduser -D admin
ENV HOME=/home/admin
ENV APP_DIR=/home/admin/app
RUN mkdir /home/admin/app
RUN chown -R admin:admin /home/admin/app

USER admin
WORKDIR $APP_DIR

COPY package*.json ./
RUN npm cache verify
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
