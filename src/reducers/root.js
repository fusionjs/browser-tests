/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import count from './count';
import rpcCount from './rpc-count';
import loading from './loading';
import error from './error';

export default (state, action) => {
  return {
    count: count(state.count, action),
    rpcCount: rpcCount(state.rpcCount, action),
    loading: loading(state.loading, action),
    error: error(state.error, action),
  };
};
