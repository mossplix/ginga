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
	exports.sendMessage = sendMessage;
	exports.joinRoom = joinRoom;
	exports.publishAvatar = publishAvatar;
	exports.removeContact = removeContact;
	exports.addContact = addContact;
	exports.updateIdlePresence = updateIdlePresence;
	exports.sendPresence = sendPresence;
	exports.approveContactRequest = approveContactRequest;
	exports.denyContactRequest = denyContactRequest;
	exports.leaveRoom = leaveRoom;
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
	
	var _simpleAssign = __webpack_require__(266);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _constants = __webpack_require__(265);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _reactRouterRedux = __webpack_require__(288);
	
	var _suggestionsReducer = __webpack_require__(991);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var StanzaIO = __webpack_require__(353);
	var htmlify = __webpack_require__(992);
	var messageSchema = __webpack_require__(351);
	
	var Message = new messageSchema();
	
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
	
	function sendMessage(text, chat_type, to) {
	    var edit = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	    return function (dispatch, getState) {
	        var client = getState().xmpp.client;
	        var links = _.map(htmlify.collectLinks(text), function (link) {
	            return { url: link };
	        });
	        var message = {
	            id: client.nextId(),
	            to: new StanzaIO.JID(to),
	            type: chat_type,
	            body: text,
	            requestReceipt: true,
	            oobURIs: links,
	            chatState: 'active'
	        };
	
	        if (edit) {
	            message.replace = getState().currentChat.lastSentMessage.id;
	        }
	
	        client.sendMessage(message);
	        message.from = getState().xmpp.jid;
	        message.text = message.body;
	
	        var ts = Date.now();
	
	        var t_message = (0, _simpleAssign2.default)(Message, message, {
	            from: getState().xmpp.jid,
	            created: ts
	        });
	        dispatch({
	            type: _constants2.default.MESSAGE_SENT,
	            message: t_message,
	            to: to,
	            chat_type: chat_type
	
	        });
	    };
	}
	
	function joinRoom(room, nick) {
	    return function (dispatch, getState) {
	        var client = getState().xmpp.client;
	
	        client.joinRoom(room, nick, {
	            joinMuc: {
	                history: {
	                    maxstanzas: 50
	                }
	            }
	        });
	        dispatch({
	            type: _constants2.default.JOIN_ROOM,
	            room: room,
	            nick: nick
	
	        });
	    };
	}
	
	function publishAvatar(data) {
	    if (!data || data.indexOf('https://') != -1) return;
	    return function (dispatch, getState) {
	        var client = getState().xmpp.client;
	
	        var resampler = new Resample(data, 80, 80, function (data) {
	            var b64Data = data.split(',')[1];
	            var id = crypto.createHash('sha1').update(atob(b64Data)).digest('hex');
	            client.publishAvatar(id, b64Data, function (err, res) {
	                if (err) return;
	                client.useAvatars([{
	                    id: id,
	                    width: 80,
	                    height: 80,
	                    type: 'image/png',
	                    bytes: b64Data.length
	                }]);
	            });
	        });
	
	        dispatch({
	            type: _constants2.default.PUBLISH_AVATAR,
	            data: data
	
	        });
	    };
	}
	
	function removeContact(jid) {
	    return function (dispatch, getState) {
	        var client = getState().xmpp.client;
	
	        client.removeRosterItem(jid, function (err, res) {
	            dispatch({
	                type: _constants2.default.CONTACT_REMOVED,
	                jid: jid
	
	            });
	        });
	    };
	}
	
	function addContact(jid) {
	    return function (dispatch, getState) {
	        var client = getState().xmpp.client;
	
	        client.sendPresence({ to: jid, type: 'subscribe' });
	
	        dispatch({
	            type: _constants2.default.CONTACT_ADDED,
	            jid: jid
	
	        });
	    };
	}
	
	function updateIdlePresence(state) {
	    return function (dispatch, getState) {
	        var client = getState().xmpp.client;
	
	        var update = {
	            status: state,
	            caps: client.disco.caps
	        };
	
	        if (!getState().appState.active) {
	            update.idle = { since: getState().appState.idleSince };
	        }
	
	        client.sendPresence(update);
	        dispatch({
	            type: _constants2.default.SEND_PRESENCE,
	            state: state
	
	        });
	    };
	}
	
	function sendPresence(state) {
	    return function (dispatch, getState) {
	        var client = getState().xmpp.client;
	
	        client.sendPresence(state);
	        dispatch({
	            type: _constants2.default.SEND_PRESENCE,
	            state: state
	
	        });
	    };
	}
	
	/*
	call: function () {
	        if (this.jingleResources.length) {
	            var peer = this.jingleResources[0];
	            this.callState = 'starting';
	            app.api.call(peer.id);
	        } else {
	            logger.error('no jingle resources for this user');
	        }
	    }
	
	
	
	
	
	
	handleAcceptClick: function (e) {
	        e.preventDefault();
	        var self = this;
	
	        this.$('button.accept').prop('disabled', true);
	        if (this.model.jingleCall.jingleSession.state == 'pending') {
	            if (!client.jingle.localStream) {
	                client.jingle.startLocalMedia(null, function (err) {
	                    if (err) {
	                        self.model.jingleCall.end({
	                            condition: 'decline'
	                        });
	                    } else {
	                        client.sendPresence({ to: new StanzaIo.JID(self.model.jingleCall.jingleSession.peer) });
	                        self.model.jingleCall.jingleSession.accept();
	                    }
	                });
	            } else {
	                client.sendPresence({ to: new StanzaIo.JID(this.model.jingleCall.jingleSession.peer) });
	                this.model.jingleCall.jingleSession.accept();
	            }
	        }
	        return false;
	    }
	
	      handleEndClick: function (e) {
	        e.preventDefault();
	        var condition = 'success';
	        if (this.model.jingleCall) {
	            if (this.model.jingleCall.jingleSession && this.model.jingleCall.jingleSession.state == 'pending') {
	                condition = 'decline';
	            }
	            this.model.jingleCall.end({
	                condition: condition
	            });
	        }
	        return false;
	    },
	
	    handleCallStateChange: function (model, callState) {
	        var state = callState || this.model.state;
	        // hide all
	        this.$buttons.hide();
	
	        var map = {
	            incoming: '.ignore, .answer',
	            outgoing: '.cancel',
	            accepted: '.end, .mute',
	            terminated: '',
	            ringing: '.cancel',
	            mute: '.end, .unmute',
	            unmute: '.end, .mute',
	            //hold: '',
	            //resumed: ''
	        };
	
	        console.log('map[state]', map[state]);
	
	        this.$(map[state]).show();
	    }
	});
	
	    */
	
	// contact requests
	
	function approveContactRequest(jid) {
	    return function (dispatch, getState) {
	        var client = getState().xmpp.client;
	
	        client.sendPresence({
	            to: jid,
	            type: 'subscribed'
	        });
	        client.sendPresence({
	            to: jid,
	            type: 'subscribe'
	        });
	
	        dispatch({
	            type: _constants2.default.CONTACT_REQUEST_APPROVED,
	            jid: jid
	
	        });
	    };
	}
	
	function denyContactRequest(jid) {
	    return function (dispatch, getState) {
	        var client = getState().xmpp.client;
	
	        client.sendPresence({
	            to: jid,
	            type: 'unsubscribed'
	        });
	
	        dispatch({
	            type: _constants2.default.CONTACT_REQUEST_DENIED,
	            jid: jid
	
	        });
	    };
	}
	
	function leaveRoom(room_jid, nick) {
	    return function (dispatch, getState) {
	        var client = getState().xmpp.client;
	        client.leaveRoom(room_jid, nick);
	        dispatch({
	            type: _constants2.default.LEAVE_ROOM,
	            room_jid: room_jid,
	            nick: nick
	
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
//# sourceMappingURL=0.da30113d1753bf3f4500.hot-update.js.map