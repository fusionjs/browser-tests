/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow
export default (state, action) => {
  if (action.type.endsWith('_SUCCESS') || action.type.endsWith('_FAILURE')) {
    return false;
  }
  return action.type.endsWith('_START') || state;
};
