import React from 'react';
import {withRPCRedux} from 'fusion-plugin-rpc-redux-react';
import {prepared} from 'fusion-react-async';
import {compose} from 'redux';
import {connect} from 'react-redux';

function TestError(props) {
  const {loading, error} = props;
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>Received error: {error}</div>;
}
export default compose(
  connect(s => s.error),
  withRPCRedux('testError'),
  prepared(props => {
    return props.loading || props.error || props.testError();
  })
)(TestError);
