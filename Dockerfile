FROM uber/web-base-image:1.0.7@sha256:68237a26e7d19669786e4aedfec44903ba0ec75ea0ed3d323405d0fa5c6b9323

WORKDIR /browser-tests

COPY package.json yarn.lock download-selenium.js /browser-tests/

RUN yarn

ENV PATH /browser-tests/node_modules/.bin:$PATH

RUN yarn download-selenium

COPY . .

RUN yarn build
