webpackHotUpdate(0,{

/***/ 1696:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = reducer;
	
	var _constants = __webpack_require__(265);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _addToThread(roster) {
	    if (typeof roster != 'undefined') {
	        roster.forEach(function (contact) {
	
	            var threadID = contact.jid;
	            var thread = _threads[threadID];
	            if (thread) {
	                return;
	            }
	
	            _threads[threadID] = {
	                id: threadID,
	                name: contact.jid,
	                lastMessage: null
	            };
	        }, this);
	    }
	}
	
	function getThread(message) {
	    var jid = store.getState().xmpp.jid;
	    var threadID = message.from;
	    if (threadID === jid) {
	        threadID = message.to;
	    }
	    return threadID;
	}
	
	function toThreads(messages) {
	    if (typeof messages != 'undefined') {
	
	        var jid = store.getState().xmpp.jid;
	        var _currentID = store.getState().currentChat.id;
	        var _threads = {};
	
	        messages.forEach(function (message) {
	            if (message.type === "chat") {
	
	                var threadID = message.from;
	                if (threadID === jid) {
	
	                    threadID = message.to;
	                }
	
	                var thread = _threads[threadID];
	                if (thread && thread.lastTimestamp > message.created) {
	                    return;
	                }
	                _threads[threadID] = {
	                    id: threadID,
	                    name: threadID,
	                    lastMessage: message
	                };
	            }
	        });
	
	        if (_currentID && _threads[_currentID] && typeof _threads[_currentID].lastMessage != null) {
	            _threads[_currentID].lastMessage.isRead = true;
	        }
	    }
	    return _threads;
	}
	
	function getAllChrono(_threads) {
	    var orderedThreads = [];
	    for (var id in _threads) {
	        var thread = _threads[id];
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
	}
	
	function getCurrentID() {
	    return _currentID;
	}
	
	function getCurrent() {
	    return this.get(this.getCurrentID());
	}
	
	function reducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    switch (action.type) {
	        case _constants2.default.CLICK_THREAD:
	            var thread = state[action.threadID];
	            if (typeof thread != 'undefined') {
	                if (thread.lastMessage) {
	                    thread.lastMessage.isRead = true;
	                }
	            }
	            return _extends({}, state, _defineProperty({}, action.threadID, thread));
	
	        case _constants2.default.LOAD_MESSAGES:
	            var th = toThreads(action.messages);
	
	            return _extends({}, state, th);
	
	        case _constants2.default.RECEIVE_RAW_MESSAGE:
	            var msg = action.msg;
	            var message = msg; //ChatMessageUtils.convertDbMessage(msg,{});
	            thread = _threads[message.from];
	            thread.lastMessage = message;
	            _threads[message.from] = thread;
	
	            return _extends({}, state);
	
	        case _constants2.default.LOAD_CONTACTS:
	            var roster = action.rawContacts;
	            _addToThread(roster);
	            return _extends({}, state);
	        case _constants2.default.CLIENT_ON_CHAT:
	            var msg = action.msg;
	            var id = getThread(msg);
	
	            return _extends({}, state, _defineProperty({}, id, { id: id, name: id, lastMessage: action.msg }));
	
	        case _constants2.default.CLIENT_ON_GROUPCHAT:
	            var msg = action.msg;
	            var id = getThread(msg);
	
	            return _extends({}, state, _defineProperty({}, id, { id: id, name: id, lastMessage: action.msg }));
	
	        case _constants2.default.MESSAGE_SENT:
	            var msg = action.message;
	            var id = getThread(msg);
	
	            return _extends({}, state, _defineProperty({}, id, { id: id, name: id, lastMessage: action.message }));
	
	        default:
	            return state;
	    }
	}

/***/ }

})
//# sourceMappingURL=0.9da8c8c6fbad766fec81.hot-update.js.map