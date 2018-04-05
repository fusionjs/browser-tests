/* eslint-env node */

/**
 * A proxy server for proxying to the Fusion.js server.
 * This allows us to control loading times when desired.
 */
const http = require('http');

http.createServer(onRequest).listen(3001);

function onRequest(clientReq, clientRes) {
  // eslint-disable-next-line no-console
  console.log('serve: ' + clientReq.url);

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: clientReq.url,
    headers: clientReq.headers,
    method: 'GET',
  };

  function isDelayed() {
    return clientReq.url.includes('client-vendor');
  }

  const proxy = http.request(options, function(res) {
    const pipeRequest = () => {
      res.pipe(clientRes, {
        end: true,
      });
    };
    if (isDelayed()) {
      setTimeout(pipeRequest, 3000);
    } else {
      pipeRequest();
    }
  });

  clientReq.pipe(proxy, {
    end: true,
  });
}
