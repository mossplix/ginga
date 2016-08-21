webpackHotUpdate(0,{

/***/ 941:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.prevMessageSelector = exports.nextMessageSelector = exports.loadedThreadCountSelector = exports.hasMoreThreadsSelector = exports.lastMessageInEachThreadSelector = exports.chronoThreadsSelector = exports.selectedThreadMessagesSelector = exports.currentThreadMessagesSelector = exports.allThreadsSelector = exports.selectedRoomIDSelector = exports.selectedIDSelector = exports.selectedMessageIDSelector = exports.searchQuerySelector = exports.threadsSelector = exports.labelsSelector = exports.isLoadingSelector = undefined;
	
	var _reselect = __webpack_require__(942);
	
	var _lodash = __webpack_require__(943);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var messageListByQuerySelector = function messageListByQuerySelector(state) {
	  return state.messageListByQuery;
	};
	var threadsByIDSelector = function threadsByIDSelector(state) {
	  return state.threads;
	};
	var roomsByIDSelector = function roomsByIDSelector(state) {
	  return state.rooms;
	};
	var messagesByIDSelector = function messagesByIDSelector(state) {
	  return state.messages;
	};
	
	var isLoadingSelector = exports.isLoadingSelector = function isLoadingSelector(state) {
	  return state.isLoading;
	};
	var labelsSelector = exports.labelsSelector = function labelsSelector(state) {
	  return state.labels;
	};
	var threadsSelector = exports.threadsSelector = function threadsSelector(state) {
	  return state.threads;
	};
	var searchQuerySelector = exports.searchQuerySelector = function searchQuerySelector(state) {
	  return state.app.searchQuery;
	};
	var selectedMessageIDSelector = exports.selectedMessageIDSelector = function selectedMessageIDSelector(state) {
	  return state.currentChat.messageID;
	};
	var selectedIDSelector = exports.selectedIDSelector = function selectedIDSelector(state) {
	  return state.currentChat.id;
	};
	var selectedRoomIDSelector = exports.selectedRoomIDSelector = function selectedRoomIDSelector(state) {
	  return state.currentChat.roomID;
	};
	
	var jidSelector = function jidSelector(state) {
	  return state.xmpp.jid;
	};
	
	var allThreadsSelector = exports.allThreadsSelector = (0, _reselect.createSelector)([searchQuerySelector, messageListByQuerySelector, threadsByIDSelector], function (searchQuery, messageListByQuery, threadsByID) {
	  var threadList = messageListByQuery[searchQuery];
	  return threadList ? threadList.threadIDs.map(function (threadID) {
	    return threadsByID[threadID];
	  }) : [];
	});
	
	var currentThreadMessagesSelector = exports.currentThreadMessagesSelector = (0, _reselect.createSelector)([messagesByIDSelector, selectedIDSelector, jidSelector], function (messages, id, jid) {
	  var from_messages = _lodash2.default.filter(messages, { from: id, to: jid });
	  var my_messages = _lodash2.default.filter(messages, { from: jid, to: id });
	  var toret = _lodash2.default.uniqBy(from_messages.concat(my_messages), function (elem) {
	    return [elem.from, elem.to, elem.created, elem.text].join();
	  });
	  return _lodash2.default.orderBy(toret, ["created"], ['desc']);
	});
	
	var selectedThreadMessagesSelector = exports.selectedThreadMessagesSelector = (0, _reselect.createSelector)([threadsByIDSelector, selectedIDSelector, messagesByIDSelector], function (threadsByID, selectedThreadID, messagesByID) {
	  var selectedThread = threadsByID[selectedThreadID];
	  return selectedThread && selectedThread.messageIDs.map(function (messageID) {
	    return messagesByID[messageID];
	  });
	});
	
	var chronoThreadsSelector = exports.chronoThreadsSelector = (0, _reselect.createSelector)([threadsSelector], function (threads) {
	  var orderedThreads = [];
	  for (var id in threads) {
	    var thread = threads[id];
	    orderedThreads.push(thread);
	  }
	  orderedThreads.sort(function (a, b) {
	    if (!a.lastMessage === null) {
	
	      if (a.lastMessage._created < b.lastMessage._created) {
	        return -1;
	      } else if (a.lastMessage._created > b.lastMessage._created) {
	        return 1;
	      }
	    } else {
	      return -1;
	    }
	    return 0;
	  });
	  return orderedThreads;
	});
	
	var lastMessageInEachThreadSelector = exports.lastMessageInEachThreadSelector = (0, _reselect.createSelector)([messagesByIDSelector, threadsSelector], function (messagesByID, threads) {
	  return threads && _lodash2.default.toArray(threads).map(function (thread) {
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
//# sourceMappingURL=0.0073e9ccbb63c81df77b.hot-update.js.map