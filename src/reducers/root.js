import count from './count';
import rpcCount from './rpc-count';
import loading from './loading';
import error from './error';

export default (state, action) => ({
  count: count(state.count, action),
  rpcCount: rpcCount(state.rpcCount, action),
  loading: loading(state.loading, action),
  error: error(state.error, action),
});
