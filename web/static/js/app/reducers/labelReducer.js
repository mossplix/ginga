const ActionTypes = require('../constants');

module.exports = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.LOAD_LABELS:
      return action.labels;
  }
  return state;
};
