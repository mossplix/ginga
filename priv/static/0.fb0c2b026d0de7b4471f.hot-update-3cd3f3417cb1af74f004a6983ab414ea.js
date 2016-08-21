webpackHotUpdate(0,{

/***/ 990:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.clickChannel = clickChannel;
	exports.clickThread = clickThread;
	exports.createMessage = createMessage;
	exports.sendChat = sendChat;
	exports.receiveRawMessage = receiveRawMessage;
	exports.receiveAll = receiveAll;
	exports.receiveCreatedMessage = receiveCreatedMessage;
	exports.selectNextSuggestion = selectNextSuggestion;
	exports.selectPreviousSuggestion = selectPreviousSuggestion;
	exports.suggestionChanged = suggestionChanged;
	exports.completeWordSuggestion = completeWordSuggestion;
	exports.registerSuggestions = registerSuggestions;
	exports.unregisterSuggestions = unregisterSuggestions;
	exports.clearSuggestions = clearSuggestions;
	exports.suggestionPretextChanged = suggestionPretextChanged;
	exports.handlePretextChanged = handlePretextChanged;
	exports.setMatchedPretext = setMatchedPretext;
	exports.addSuggestions = addSuggestions;
	exports.clearSelection = clearSelection;
	
	var _constants = __webpack_require__(265);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _reactRouterRedux = __webpack_require__(288);
	
	var _suggestionsReducer = __webpack_require__(991);
	
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
	
	function promise(callback) {
	    return function (dispatch) {
	        console.log(dispatch);
	        dispatch(callback);
	        return Promise.resolve();
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
	    return function (dispatch, getState) {
	        dispatch({
	            type: _constants2.default.CREATE_MESSAGE,
	            message: message,
	            chat: chat
	
	        });
	    };
	}
	
	function sendChat(text, chat, chat_type) {
	    return function (dispatch, getState) {
	        client = getState().dispatch({
	            type: _constants2.default.MESSAGE_SENT,
	            message: message,
	            chat: chat,
	            chat_type: chat_type
	
	        });
	    };
	}
	
	function receiveRawMessage(msg) {
	    return function (dispatch, getState) {
	        dispatch({
	            type: _constants2.default.RECEIVE_RAW_MESSAGE,
	            msg: msg
	
	        });
	    };
	}
	
	function receiveAll(rawMessages) {
	    return function (dispatch, getState) {
	        dispatch({
	            type: _constants2.default.RECEIVE_RAW_MESSAGES,
	            rawMessages: rawMessages
	        });
	    };
	}
	
	function receiveCreatedMessage(createdMessage) {
	    return function (dispatch, getState) {
	        dispatch({
	            type: _constants2.default.RECEIVE_RAW_CREATED_MESSAGE,
	            rawMessage: createdMessage
	        });
	    };
	}
	
	function selectNextSuggestion(suggestionId) {
	    return function (dispatch, getState) {
	        return new Promise(function (resolve) {
	            dispatch({
	                type: _constants2.default.SUGGESTION_SELECT_NEXT,
	                id: suggestionId
	            });resolve(false);
	        }).then(function () {
	            return dispatch({
	                type: _constants2.default.SUGGESTIONS_CHANGED,
	                id: suggestionId
	
	            });
	        });
	    };
	}
	
	function selectPreviousSuggestion(suggestionId) {
	    return function (dispatch, getState) {
	        return new Promise(function (resolve) {
	            dispatch({
	                type: _constants2.default.SUGGESTION_SELECT_PREVIOUS,
	                id: suggestionId
	            });resolve(false);
	        }).then(function () {
	            return dispatch({
	                type: _constants2.default.SUGGESTIONS_CHANGED,
	                id: suggestionId
	
	            });
	        });
	    };
	}
	
	function suggestionChanged(suggestionId) {
	    return function (dispatch, getState) {
	
	        return dispatch({
	            type: _constants2.default.SUGGESTIONS_CHANGED,
	            id: suggestionId
	
	        });
	    };
	}
	
	function emitCompleteWordSuggestion(suggestionId) {
	    var term = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	
	    return function (dispatch, getState) {
	        var suggestions = getState().suggestions;
	        var suggestion = suggestions[suggestionId];
	        return dispatch({
	            type: _constants2.default.SUGGESTION_COMPLETE_WORD,
	            id: suggestionId,
	            term: term
	        });
	    };
	}
	
	function completeWord(suggestionId) {
	    var term = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	    return function (dispatch, getState) {
	        return dispatch({
	            type: _constants2.default.COMPLETE_WORD,
	            id: suggestionId,
	            term: term
	
	        });
	    };
	}
	
	function completeWordSuggestion(suggestionId) {
	    var term = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	    return function (dispatch, getState) {
	        var suggestions = getState().suggestions;
	        var suggestion = suggestions[suggestionId];
	        var term_t = term;
	        return new Promise(function (resolve) {
	            dispatch({
	                type: _constants2.default.SUGGESTION_COMPLETE_WORD,
	                id: suggestionId,
	                term: term
	            });resolve(false);
	        }).then(function () {
	            return dispatch({
	                type: _constants2.default.COMPLETE_WORD,
	                id: suggestionId,
	                term: term_t
	
	            });
	        }).then(function () {
	            return dispatch({
	                type: _constants2.default.SUGGESTIONS_CHANGED,
	                id: suggestionId
	
	            });
	        });
	    };
	}
	
	function registerSuggestions(suggestionId) {
	    return { type: _constants2.default.REGISTER_SUGGESTION_BOX, id: suggestionId };
	}
	
	function unregisterSuggestions(suggestionId) {
	    return function (dispatch, getState) {
	        dispatch({ type: _constants2.default.UNREGISTER_SUGGESTION_BOX, id: suggestionId });
	    };
	}
	
	function clearSuggestions(suggestionId) {
	    return function (dispatch, getState) {
	        return new Promise(function (resolve) {
	            dispatch({ type: _constants2.default.SUGGESTION_CLEAR_SUGGESTIONS, id: suggestionId });resolve(false);
	        }).then(function () {
	            return dispatch({
	                type: _constants2.default.SUGGESTIONS_CHANGED,
	                id: suggestionId
	
	            });
	        });
	    };
	}
	
	function suggestionPretextChanged(suggestionId, pretext) {
	    return function (dispatch, getState) {
	        return new Promise(function (resolve) {
	            dispatch({ type: _constants2.default.SUGGESTION_PRETEXT_CHANGED,
	                id: suggestionId,
	                pretext: pretext });
	
	            resolve(false);
	        }).then(function () {
	            return dispatch({
	                type: _constants2.default.PRETEXT_CHANGED,
	                id: suggestionId,
	                pretext: pretext
	
	            });
	        }).then(function () {
	            return dispatch({
	                type: _constants2.default.SUGGESTIONS_CHANGED,
	                id: suggestionId
	
	            });
	        });
	    };
	}
	
	function handlePretextChanged(suggestionId, pretext) {
	
	    return function (dispatch, getState) {
	        if (pretext.startsWith('/')) {
	
	            httpGet('/api/v1/commands/' + CommandSuggestion + '/').then(function (data) {
	
	                var matches = [];
	                data.forEach(function (cmd) {
	                    if (('/' + cmd.trigger).indexOf(command) === 0) {
	                        var s = '/' + cmd.trigger;
	                        var hint = '';
	                        if (cmd.auto_complete_hint && cmd.auto_complete_hint.length !== 0) {
	                            hint = cmd.auto_complete_hint;
	                        }
	                        matches.push({
	                            suggestion: s,
	                            hint: hint,
	                            description: cmd.auto_complete_desc
	                        });
	                    }
	                });
	
	                matches = matches.sort(function (a, b) {
	                    return a.suggestion.localeCompare(b.suggestion);
	                });
	
	                // pull out the suggested commands from the returned data
	                var terms = matches.map(function (suggestion) {
	                    return suggestion.suggestion;
	                });
	
	                if (terms.length > 0) {
	                    return dispatch({
	                        type: _constants2.default.SUGGESTION_RECEIVED_SUGGESTIONS,
	                        id: suggestionId,
	                        matchedPretext: command,
	                        terms: terms,
	                        items: matches,
	                        component: component
	                    }).then(function () {
	
	                        dispatch({
	                            type: _constants2.default.SUGGESTIONS_CHANGED,
	                            id: suggestionId
	
	                        });
	                    });
	                }
	            });
	        }
	    };
	}
	
	function setMatchedPretext(suggestionId, text) {
	
	    return function (dispatch, getState) {
	        dispatch({ type: _constants2.default.SET_MATCHED_PRETEXT, id: suggestionId, text: text });
	    };
	}
	
	function addSuggestions(suggestionId, terms, items, component) {
	
	    return function (dispatch, getState) {
	        dispatch({ type: _constants2.default.ADD_SUGGESTIONS, id: suggestionId, terms: terms, items: items, component: component });
	    };
	}
	
	function clearSelection(suggestionId) {
	
	    return function (dispatch, getState) {
	        dispatch({ type: _constants2.default.CLEAR_SELECTION, id: suggestionId });
	    };
	}

/***/ }

})
//# sourceMappingURL=0.fb0c2b026d0de7b4471f.hot-update.js.map