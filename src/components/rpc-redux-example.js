/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow
import React from 'react';
import {withRPCRedux} from 'fusion-plugin-rpc-redux-react';
import {prepared} from 'fusion-react-async';
import {connect} from 'react-redux';
import {compose} from 'redux';

function Example({rpcCount, loading, error, increment, decrement}) {
  return (
    <div>
      <p>Count: {rpcCount}</p>
      <p>
        <button onClick={() => increment()}>Increment</button>
        <button onClick={() => decrement()}>Decrement</button>
      </p>
      {loading && 'Loading...'}
      {error}
    </div>
  );
}

const withIncrement = withRPCRedux('increment');
const withDecrement = withRPCRedux('decrement');
const withGetCount = withRPCRedux('getCount');

const hoc = compose(
  withIncrement,
  withDecrement,
  withGetCount,
  connect(({rpcCount, loading, error}) => ({rpcCount, loading, error})),
  prepared(props => props.rpcCount || props.getCount())
);
export default hoc(Example);
