webpackHotUpdate(0,{

/***/ 1200:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = reducer;
	
	var _constants = __webpack_require__(243);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _xmppActions = __webpack_require__(275);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = {
	    fetching: true
	};
	
	var local = {
	    initialized: !1,
	    user_state: "active",
	    active_type: "",
	    profile_jids: [],
	    sent_msg_ids: [],
	    participants: [],
	    received_mids: [],
	    history_fetch_id: 0,
	    chat_states: ["active", "inactive", "composing", "gone"]
	};
	
	var defaults = {
	    room: {
	        admins: [],
	        participants: {
	            members: [],
	            guests: []
	        },
	        files: [],
	        links: [],
	        is_archived: "0",
	        history_fetch_ids: [],
	        show_join_messages: !1,
	        guest_mention_regex: null,
	        presence: {
	            show: "",
	            status: "",
	            seconds: "",
	            idleTime: ""
	        }
	    },
	    roster: {
	        presence: {
	            show: "unknown",
	            status: "",
	            seconds: "",
	            idleTime: ""
	        }
	    }
	};
	
	function addMessage(id, message, notify) {
	    muc = _mucs[id];
	    message.owner = app.me;
	
	    var mine = message.from.resource === muc.nick;
	
	    if (mine) {
	        message._mucMine = true;
	    }
	    if (!mine && message.body.toLowerCase().indexOf(muc.nick.toLowerCase()) >= 0) {
	        message.mentions = this.nick;
	    }
	
	    if (notify && (!this.activeContact || this.activeContact && !app.state.focused) && !mine) {
	        muc.unreadCount++;
	        if (message.mentions) {
	            app.notifications.create(muc.displayName, {
	                body: message.body,
	                icon: muc.avatar,
	                tag: muc.id
	                //onclick: _.bind(app.navigate, app, '/groupchat/' + this.jid)
	            });
	        }
	    }
	
	    message.acked = true;
	    message.save();
	
	    if (mine) {
	        muc.lastSentMessage = message;
	    }
	
	    //this.messages.add(message);
	
	    var newInteraction = new Date(message.created);
	    if (!muc.lastInteraction || this.lastInteraction < newInteraction) {
	        muc.lastInteraction = newInteraction;
	    }
	}
	
	function joinAndBookmark(rooms) {
	    var upRooms = [];
	    var _store$getState$xmpp = store.getState().xmpp;
	    var client = _store$getState$xmpp.client;
	    var user = _store$getState$xmpp.user;
	
	
	    if (user) {
	
	        var nick = user.first_name;
	    } else {
	
	        var nick = "";
	    }
	
	    _.toArray(rooms).forEach(function (room) {
	        upRooms.push({
	            name: room.name,
	            jid: room.jid,
	            nick: room.name,
	            autoJoin: true
	        });
	        client.joinRoom(room.jid, nick, {
	            history: {
	                maxstanzas: 200
	                //since: this.lastInteraction
	            }
	        });
	    });
	    client.setBookmarks({ conferences: upRooms });
	    store.dipatch((0, _xmppActions.fetchHistory)());
	}
	
	function reducer() {
	    var rooms = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    switch (action.type) {
	        case _constants2.default.CLIENT_SESSION_STARTED:
	
	            return _extends({}, rooms);
	
	        case _constants2.default.LOAD_ROOMS:
	
	            var allRooms = action.rooms.reduce(function (newRooms, room) {
	                newRooms[room.jid] = room;
	                return newRooms;
	            }, rooms);
	            joinAndBookmark(allRooms);
	            return allRooms;
	
	        case _constants2.default.CLICK_CHANNEL:
	            var _currentID = action.channelID;
	
	            return _extends({}, rooms);
	
	        case _constants2.default.CHANNEL_RECEIVE_RAW_MESSAGES:
	            //MucStore.init(action.rawMessages);
	
	            return _extends({}, rooms);
	        case _constants2.default.RECEIVE_RAW_MUCS:
	            _addChannels(action.rawMucs);
	
	            return _extends({}, rooms);
	
	        default:
	            return rooms;
	    }
	}

/***/ }

})
//# sourceMappingURL=0.a0197c25a7c1f38f38f4.hot-update.js.map