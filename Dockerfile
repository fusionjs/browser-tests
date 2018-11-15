ARG BASE_IMAGE=uber/web-base-image:2.0.0
FROM $BASE_IMAGE

WORKDIR /browser-tests

COPY package.json yarn.lock download-selenium.js /browser-tests/

RUN yarn

ENV PATH /browser-tests/node_modules/.bin:$PATH

RUN yarn download-selenium

COPY . .

RUN yarn build --production
