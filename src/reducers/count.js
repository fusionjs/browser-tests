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
