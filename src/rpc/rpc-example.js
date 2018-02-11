/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow
export default (/* some provisioned db/micro-service */) => {
  let rpcCount = 0; // we're storing things in memory for this example
  return {
    echo(arg) {
      return arg;
    },
    getCount() {
      return {rpcCount}; // normally we'd call some data store or microservice API here
    },
    increment() {
      if (rpcCount > 5) throw new Error('Test error');
      rpcCount++;
      return {rpcCount};
    },
    decrement() {
      rpcCount--;
      return {rpcCount};
    },
  };
};
