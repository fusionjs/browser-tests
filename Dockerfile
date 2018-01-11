FROM uber/web-base-image:1.0.0

WORKDIR /browser-tests

COPY package.json yarn.lock download-selenium.js /browser-tests/

RUN yarn

ENV PATH /browser-tests/node_modules/.bin:$PATH

RUN yarn download-selenium

COPY . .

RUN yarn build
