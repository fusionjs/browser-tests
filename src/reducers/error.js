export default (state, action) => {
  if (action.type.endsWith('_SUCCESS')) return '';
  return action.type.endsWith('_FAILURE') ? action.payload : state;
};
