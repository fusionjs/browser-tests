export default (state, action) => {
  switch (action.type) {
    case 'GET_COUNT_SUCCESS': //rpc-redux-example action
    case 'INCREMENT_SUCCESS':
    case 'DECREMENT_SUCCESS':
      return action.payload.rpcCount;
    default:
      return state || 0;
  }
};
