webpackHotUpdate(0,{

/***/ 991:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.clickChannel = clickChannel;
	exports.clickThread = clickThread;
	exports.createMessage = createMessage;
	exports.receiveRawMessage = receiveRawMessage;
	exports.receiveAll = receiveAll;
	exports.receiveCreatedMessage = receiveCreatedMessage;
	exports.suggestionPretextChanged = suggestionPretextChanged;
	exports.selectNextSuggestion = selectNextSuggestion;
	exports.selectPreviousSuggestion = selectPreviousSuggestion;
	exports.completeWordSuggestion = completeWordSuggestion;
	exports.clearSuggestions = clearSuggestions;
	
	var _constants = __webpack_require__(265);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _reactRouterRedux = __webpack_require__(268);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function clickChannel(channelID) {
	
	    return function (dispatch) {
	        dispatch({
	            type: _constants2.default.CLICK_CHANNEL,
	            channelID: channelID
	        });
	
	        dispatch((0, _reactRouterRedux.push)('/chat/channels/' + channelID));
	    };
	}
	
	function clickThread(threadID) {
	    return function (dispatch) {
	        dispatch({
	            type: _constants2.default.CLICK_THREAD,
	            threadID: threadID
	        });
	
	        dispatch((0, _reactRouterRedux.push)('/chat/threads/' + threadID));
	    };
	}
	
	function createMessage(text, chat) {
	    dispatch({
	        type: _constants2.default.CREATE_MESSAGE,
	        message: message,
	        chat: chat
	
	    });
	}
	
	function receiveRawMessage(msg) {
	    dispatch({
	        type: _constants2.default.RECEIVE_RAW_MESSAGE,
	        msg: msg
	
	    });
	}
	
	function receiveAll(rawMessages) {
	    dispatch({
	        type: _constants2.default.RECEIVE_RAW_MESSAGES,
	        rawMessages: rawMessages
	    });
	}
	
	function receiveCreatedMessage(createdMessage) {
	    dispatch({
	        type: _constants2.default.RECEIVE_RAW_CREATED_MESSAGE,
	        rawMessage: createdMessage
	    });
	}
	
	function suggestionPretextChanged(suggestionId, pretext) {
	    dispatch({
	        type: _constants2.default.SUGGESTION_PRETEXT_CHANGED,
	        id: suggestionId,
	        pretext: pretext
	    });
	}
	
	function selectNextSuggestion(suggestionId) {
	    dispatch({
	        type: _constants2.default.SUGGESTION_SELECT_NEXT,
	        id: suggestionId
	    });
	}
	
	function selectPreviousSuggestion(suggestionId) {
	    dispatch({
	        type: _constants2.default.SUGGESTION_SELECT_PREVIOUS,
	        id: suggestionId
	    });
	}
	
	function completeWordSuggestion(suggestionId) {
	    var term = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	    dispatch({
	        type: Constants.ActionTypes.SUGGESTION_COMPLETE_WORD,
	        id: suggestionId,
	        term: term
	    });
	}
	
	function clearSuggestions(suggestionId) {
	    dispatch({
	        type: Constants.ActionTypes.SUGGESTION_CLEAR_SUGGESTIONS,
	        id: suggestionId
	    });
	}

/***/ }

})
//# sourceMappingURL=0.4ef1b7493e825eb70101.hot-update.js.map