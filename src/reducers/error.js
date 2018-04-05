/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createRPCReducer} from 'fusion-plugin-rpc-redux-react';

export default createRPCReducer('testError', {
  start: state => ({...state, loading: true, error: ''}),
  success: (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    error: '',
  }),
  failure: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }),
});
