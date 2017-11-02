import React from 'react';
import {connect} from 'react-redux';

function Counter({count, increment, decrement}) {
  return (
    <div>
      <div>The count is {count}</div>
      <button onClick={() => increment()}>Increment Counter</button>
      <button onClick={() => decrement()}>Decrement Counter</button>
    </div>
  );
}

export default connect(
  state => ({
    count: state.count,
  }),
  dispatch => ({
    increment: () => dispatch({type: 'INCREMENT'}),
    decrement: () => dispatch({type: 'DECREMENT'}),
  })
)(Counter);
