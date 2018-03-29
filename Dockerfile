FROM uber/web-base-image:1.0.3@sha256:735b4972c0b7fe67813edd67eeba11cca79209140a81a9387b42ac8b4c570f88

WORKDIR /browser-tests

COPY package.json yarn.lock download-selenium.js /browser-tests/

RUN yarn

ENV PATH /browser-tests/node_modules/.bin:$PATH

RUN yarn download-selenium

COPY . .

RUN yarn build
