FROM node:8.9.0

WORKDIR /browser-tests

COPY package.json yarn.lock /browser-tests/

RUN yarn
