export default (state, action) => {
  if (action.type.endsWith('_SUCCESS') || action.type.endsWith('_FAILURE')) {
    return false;
  }
  return action.type.endsWith('_START') || state;
};
