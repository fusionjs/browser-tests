/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import tape from 'tape';
// import runServer from 'fusion-cli/entries/server-entry';

tape('The server can run', t => {
  t.end();
  // TODO: Fix this test
  // runServer({port: 3001})
  //   .then(server => {
  //     t.equal(server.listening, true);
  //     return new Promise(resolve => server.close(resolve));
  //   })
  //   .then(t.end)
  //   .catch(t.fail);
});
