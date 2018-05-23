/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export default (state: number, action: Object) => {
  switch (action.type) {
    case 'GET_COUNT_SUCCESS': //rpc-redux-example action
    case 'INCREMENT_SUCCESS':
    case 'DECREMENT_SUCCESS':
      return action.payload.rpcCount;
    default:
      return state || 0;
  }
};
