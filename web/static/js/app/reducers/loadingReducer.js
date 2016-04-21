const ActionTypes = require('../constants');

module.exports = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_STARTED:
      return true;
    case ActionTypes.REQUEST_ALL_STOPPED:
      return false;
  }
  return state;
};
