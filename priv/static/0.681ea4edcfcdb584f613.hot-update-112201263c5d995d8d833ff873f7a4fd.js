webpackHotUpdate(0,{

/***/ 1144:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.prevMessageSelector = exports.nextMessageSelector = exports.loadedThreadCountSelector = exports.hasMoreThreadsSelector = exports.lastMessageInEachThreadSelector = exports.selectedThreadMessagesSelector = exports.threadsSelector = exports.selectedRoomIDSelector = exports.selectedThreadIDSelector = exports.selectedMessageIDSelector = exports.searchQuerySelector = exports.labelsSelector = exports.isLoadingSelector = undefined;
	
	var _reselect = __webpack_require__(1145);
	
	var _lodash = __webpack_require__(1143);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var messageListByQuerySelector = function messageListByQuerySelector(state) {
	  return state.messageListByQuery;
	};
	var threadsByIDSelector = function threadsByIDSelector(state) {
	  return state.threadsByID;
	};
	var roomsByIDSelector = function roomsByIDSelector(state) {
	  return state.roomsByID;
	};
	var messagesByIDSelector = function messagesByIDSelector(state) {
	  return state.messagesByID;
	};
	
	var isLoadingSelector = exports.isLoadingSelector = function isLoadingSelector(state) {
	  return state.isLoading;
	};
	var labelsSelector = exports.labelsSelector = function labelsSelector(state) {
	  return state.labels;
	};
	var searchQuerySelector = exports.searchQuerySelector = function searchQuerySelector(state) {
	  return state.app.searchQuery;
	};
	var selectedMessageIDSelector = exports.selectedMessageIDSelector = function selectedMessageIDSelector(state) {
	  return state.routing.params.messageID;
	};
	var selectedThreadIDSelector = exports.selectedThreadIDSelector = function selectedThreadIDSelector(state) {
	  return state.routing.params.threadID;
	};
	var selectedRoomIDSelector = exports.selectedRoomIDSelector = function selectedRoomIDSelector(state) {
	  return state.routing.params.roomID;
	};
	
	var threadsSelector = exports.threadsSelector = (0, _reselect.createSelector)([searchQuerySelector, messageListByQuerySelector, threadsByIDSelector], function (searchQuery, messageListByQuery, threadsByID) {
	  var threadList = messageListByQuery[searchQuery];
	  return threadList ? threadList.threadIDs.map(function (threadID) {
	    return threadsByID[threadID];
	  }) : [];
	});
	
	var selectedThreadMessagesSelector = exports.selectedThreadMessagesSelector = (0, _reselect.createSelector)([threadsByIDSelector, selectedThreadIDSelector, messagesByIDSelector], function (threadsByID, selectedThreadID, messagesByID) {
	  var selectedThread = threadsByID[selectedThreadID];
	  return selectedThread && selectedThread.messageIDs.map(function (messageID) {
	    return messagesByID[messageID];
	  });
	});
	
	var lastMessageInEachThreadSelector = exports.lastMessageInEachThreadSelector = (0, _reselect.createSelector)([messagesByIDSelector, threadsSelector], function (messagesByID, threads) {
	  return threads && threads.map(function (thread) {
	    return messagesByID[_lodash2.default.last(thread.messageIDs)];
	  });
	});
	
	var hasMoreThreadsSelector = exports.hasMoreThreadsSelector = (0, _reselect.createSelector)([searchQuerySelector, messageListByQuerySelector], function (searchQuery, messageListByQuery) {
	  var threadList = messageListByQuery[searchQuery];
	  return !threadList || !!threadList.nextPageToken;
	});
	
	var loadedThreadCountSelector = exports.loadedThreadCountSelector = (0, _reselect.createSelector)([searchQuerySelector, messageListByQuerySelector], function (searchQuery, messageListByQuery) {
	  var threadList = messageListByQuery[searchQuery];
	  return threadList ? threadList.threadIDs.length : 0;
	});
	
	var nextMessageSelector = exports.nextMessageSelector = (0, _reselect.createSelector)([lastMessageInEachThreadSelector, selectedMessageIDSelector], function (messages, selectedMessageID) {
	  if (!messages) {
	    return null;
	  }
	
	  var selectedMessageIndex = selectedMessageID && messages.findIndex(function (msg) {
	    return msg.id === selectedMessageID;
	  });
	
	  if (!selectedMessageID) {
	    return messages[0];
	  } else if (selectedMessageIndex < 0 || selectedMessageIndex === messages.length) {
	    return null;
	  } else {
	    return messages[selectedMessageIndex + 1];
	  }
	});
	
	var prevMessageSelector = exports.prevMessageSelector = (0, _reselect.createSelector)([lastMessageInEachThreadSelector, selectedMessageIDSelector], function (messages, selectedMessageID) {
	  if (!messages) {
	    return null;
	  }
	
	  var selectedMessageIndex = selectedMessageID && messages.findIndex(function (msg) {
	    return msg.id === selectedMessageID;
	  });
	
	  if (!selectedMessageID) {
	    return messages[0];
	  } else if (selectedMessageIndex < 0 || selectedMessageIndex === 0) {
	    return null;
	  } else {
	    return messages[selectedMessageIndex - 1];
	  }
	});

/***/ }

})
//# sourceMappingURL=0.681ea4edcfcdb584f613.hot-update.js.map