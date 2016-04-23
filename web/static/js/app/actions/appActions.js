const ActionTypes = require('../constants');

export function search(searchQuery) {
  return {
    type: ActionTypes.SEARCH,
    searchQuery
  };
};


