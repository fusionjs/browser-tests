FROM uber/web-base-image:1.0.9@sha256:98ad970fd8dadc43ecec9909e27dc543a88d096f722d00e07e0b25047e9388bc

WORKDIR /browser-tests

COPY package.json yarn.lock download-selenium.js /browser-tests/

RUN yarn

ENV PATH /browser-tests/node_modules/.bin:$PATH

RUN yarn download-selenium

COPY . .

RUN yarn build
