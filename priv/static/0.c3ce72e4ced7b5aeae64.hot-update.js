webpackHotUpdate(0,{

/***/ 1168:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.postFocus = postFocus;
	exports.search = search;
	var ActionTypes = __webpack_require__(243);
	
	function postFocus(postID) {
	
	  return function (dispatch) {
	    dispatch({
	      type: ActionTypes.POST_FOCUSED,
	      postID: postID
	    });
	  };
	}
	
	function search(searchQuery) {
	  return {
	    type: ActionTypes.SEARCH,
	    searchQuery: searchQuery
	  };
	};

/***/ }

})
//# sourceMappingURL=0.c3ce72e4ced7b5aeae64.hot-update.js.map