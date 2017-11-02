import React from 'react';
import {withRPCRedux} from 'fusion-plugin-rpc-redux-react';
import {prepared} from 'fusion-react-async';
import {connect} from 'react-redux';
import {compose} from 'redux';

function Example({rpcCount, loading, error, rpcRedux}) {
  return (
    <div>
      <p>Count: {rpcCount}</p>
      <p>
        <button onClick={() => rpcRedux.increment()}>Increment</button>
        <button onClick={() => rpcRedux.decrement()}>Decrement</button>
      </p>
      {loading && 'Loading...'}
      {error}
    </div>
  );
}

const hoc = compose(
  withRPCRedux,
  connect(({rpcCount, loading, error}) => ({rpcCount, loading, error})),
  prepared(props => props.rpcCount || props.rpcRedux.getCount())
);
export default hoc(Example);
