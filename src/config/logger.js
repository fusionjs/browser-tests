/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function getLoggerConfig() {
  if (__NODE__) {
    const winston = require('winston');
    return {
      transports: [new winston.transports.Console()],
    };
  }
  return null;
}

export default getLoggerConfig();
