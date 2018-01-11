FROM uber/web-base-image:1.0.0@sha256:ae4686cb70626cfa94bc06825deea7d23ef904214d82b06d5a7e5365e60a3311

WORKDIR /browser-tests

COPY package.json yarn.lock download-selenium.js /browser-tests/

RUN yarn

ENV PATH /browser-tests/node_modules/.bin:$PATH

RUN yarn download-selenium

COPY . .

RUN yarn build
