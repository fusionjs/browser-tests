/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default (state, action) => {
  switch (action.type) {
    case 'INCREMENT': // redux-example action
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state || 0;
  }
};
