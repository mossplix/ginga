const ActionTypes = require('../constants');



export function postFocus(postID) {

       return dispatch => {
    dispatch({
      type: ActionTypes.POST_FOCUSED,
      postID: postID
    });


  }}






export function search(searchQuery) {
  return {
    type: ActionTypes.SEARCH,
    searchQuery
  };
};


