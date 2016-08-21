webpackHotUpdate(0,{

/***/ 297:
/***/ function(module, exports, __webpack_require__) {

	/*global me, app, client*/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.discoCapsQueue = discoCapsQueue;
	exports.loadRooms = loadRooms;
	exports.leaveRoom = leaveRoom;
	exports.getAllMessages = getAllMessages;
	exports.getRoster = getRoster;
	exports.receiveContacts = receiveContacts;
	exports.fetchHistory = fetchHistory;
	exports.receiveCreatedContact = receiveCreatedContact;
	exports.receiveMucs = receiveMucs;
	exports.receiveCreatedMuc = receiveCreatedMuc;
	exports.xmppSession = xmppSession;
	
	var _simpleAssign = __webpack_require__(266);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _constants = __webpack_require__(265);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _utils = __webpack_require__(273);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ = __webpack_require__(298);
	var async = __webpack_require__(299);
	var crypto = __webpack_require__(301);
	var bows = __webpack_require__(323);
	var uuid = __webpack_require__(325);
	var XmppUtils = __webpack_require__(326);
	
	var contactSchema = __webpack_require__(329);
	var messageSchema = __webpack_require__(331);
	var mucSchema = __webpack_require__(332);
	var uuid = __webpack_require__(325);
	
	var Muc = new mucSchema();
	var Message = new messageSchema();
	var Contact = new contactSchema();
	
	var log = bows('Otalk');
	var ioLogIn = bows('<< in');
	var ioLogOut = bows('>> out');
	
	function discoCapsQueue(pres) {
	    async.queue(function (pres, cb) {
	        var jid = pres.from;
	        var caps = pres.caps;
	
	        var resource = Resource.get(jid);
	
	        client.getDiscoInfo(jid, caps.node + '#' + caps.ver, function (err, result) {
	            if (err) {
	                log.error('Couldnt get info for ' + caps.ver);
	                return cb();
	            }
	            if (client.verifyVerString(result.discoInfo, caps.hash, caps.ver)) {
	                log.info('Saving info for ' + caps.ver);
	                var data = result.discoInfo;
	            } else {
	                log.info('Couldnt verify info for ' + caps.ver + ' from ' + jid);
	                cb();
	            }
	        });
	    });
	}
	
	function loadRooms() {
	    return function (dispatch, getState) {
	        (0, _utils.httpGet)('/api/v1/rooms').then(function (data) {
	            dispatch({
	                type: _constants2.default.LOAD_ROOMS,
	                rooms: data
	            });
	        });
	    };
	}
	
	function leaveRoom() {
	    return function (dispatch, getState) {
	        var _store$getState$xmpp = store.getState().xmpp;
	        var user = _store$getState$xmpp.user;
	        var jid = _store$getState$xmpp.jid;
	
	        var nick = "";
	        if (user) {
	            nick = user.first_name;
	        }
	
	        client.leaveRoom(jid, nick);
	    };
	}
	
	function convMessage(msg) {
	    var ts = Date.now();
	    var timestamp;
	    if (msg.delay) {
	        timestamp = msg.delay.stamp;
	    } else {
	        timestamp = ts;
	    }
	    var data = {
	        archivedId: msg.id || uuid.v4(),
	        owner: msg.owner || msg.from.bare,
	        to: msg.to.bare,
	        text: msg.body,
	        from: msg.from.bare,
	        body: msg.body,
	        type: msg.type,
	        delay: msg.delay,
	        edited: msg.edited,
	        created: msg.timestamp || timestamp,
	        from_full: msg.from,
	        to_full: msg.to
	    };
	    return (0, _simpleAssign2.default)({}, Message, msg, data);
	}
	
	function getAllMessages() {
	
	    return function (dispatch, getState) {
	        var _getState = getState();
	
	        var xmpp = _getState.xmpp;
	
	        var client = xmpp.client;
	        var jid = xmpp.jid;
	    };
	}
	
	function getRoster() {
	
	    client.getRoster(function (err, resp) {
	
	        if (resp.roster && resp.roster.items && resp.roster.items.length) {
	
	            _.each(resp.roster.items, function (item) {
	                var data = {
	                    owner: resp.to.bare,
	                    jid: item.jid.jid,
	                    nickname: item.local,
	                    name: item.name,
	                    groups: item.groups,
	                    subscription: item.subscription,
	                    avatarID: "",
	                    resources: {},
	                    offlineStatus: {}
	                };
	            });
	
	            var caps = client.updateCaps();
	
	            client.sendPresence();
	            client.enableCarbons();
	        }
	    });
	}
	
	function receiveContacts(rawContacts) {
	    dispatch({
	        type: _constants2.default.RECEIVE_RAW_CONTACTS,
	        rawContacts: rawContacts
	    });
	}
	
	function fetchHistory(jid) {
	    var client = store.getState().xmpp.client;
	
	    return function (dispatch) {
	
	        client.searchHistory({
	            with: jid,
	            rsm: { max: 500, before: true },
	            complete: false
	        }, function (err, res) {
	            if (err) {
	                return;
	            }
	            if (res.mamResult) {
	                var items = res.mamResult.items || [];
	            } else {
	                var items = [];
	            }
	
	            var msgList = items.map(function (x) {
	                return (0, _simpleAssign2.default)(Message, x.forwarded.message, {
	                    id: x.forwarded.message.id,
	                    from: x.forwarded.message.from.bare,
	                    to: x.forwarded.message.to.bare,
	                    created: x.forwarded.delay.stamp,
	                    text: x.forwarded.message.body
	                });
	            });
	
	            dispatch({
	                type: _constants2.default.LOAD_MESSAGES,
	                messages: msgList
	
	            });
	        });
	    };
	}
	
	function receiveCreatedContact(createdContact) {
	    dispatch({
	        type: _constants2.default.RECEIVE_RAW_CREATED_CONTACTS,
	        createdContact: createdContact
	    });
	}
	
	function receiveMucs(rawMucs) {
	    dispatch({
	        type: _constants2.default.RECEIVE_RAW_MUCS,
	        rawMucs: rawMucs
	    });
	}
	
	function receiveCreatedMuc(createdMuc) {
	    dispatch({
	        type: _constants2.default.RECEIVE_RAW_CREATED_MUC,
	        createdMuc: createdMuc
	    });
	}
	
	function xmppSession(client, dispatch, jid) {
	
	    client.on('*', function (name, data) {
	        if (name === 'raw:incoming') {
	            ioLogIn.debug(data.toString());
	        } else if (name === 'raw:outgoing') {
	            ioLogOut.debug(data.toString());
	        }
	    });
	
	    client.on('credentials:update', function (creds) {
	        client.config.credentials = creds;
	        dispatch({
	            type: _constants2.default.CLIENT_ON_CREDENTIALS_UPDATE,
	            creds: creds
	        });
	    });
	
	    client.on('disconnected', function (err) {
	
	        dispatch({
	            type: _constants2.default.CLIENT_ON_DISCONNECTED,
	            err: err
	        });
	    });
	
	    client.on('auth:failed', function () {
	
	        dispatch({
	            type: _constants2.default.CLIENT_ON_AUTHFAILED
	        });
	    });
	
	    client.on('stream:management:resumed', function () {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_STREAM_MANAGEMENT_RESUMED
	        });
	    });
	
	    client.on('session:started', function (jid) {
	
	        client.sendPresence();
	        var caps = client.updateCaps();
	
	        client.sendPresence({
	            status: '',
	            caps: client.disco.caps
	        });
	        client.enableCarbons();
	
	        client.searchHistory({
	            to: jid.bare,
	            rsm: { max: 500, before: true },
	            complete: false
	        }, function (err, res) {
	            if (res && res.mamResult) {
	                var items = res.mamResult.items || [];
	            } else {
	                var items = [];
	            }
	
	            var messages = items.map(function (x) {
	                return (0, _simpleAssign2.default)({}, Message, x.forwarded.message, {
	                    id: x.forwarded.message.id,
	                    from: x.forwarded.message.from.bare,
	                    to: x.forwarded.message.to.bare,
	                    created: x.forwarded.delay.stamp,
	                    text: x.forwarded.message.body
	                });
	            });
	
	            dispatch({
	                type: _constants2.default.LOAD_MESSAGES,
	                messages: messages
	
	            });
	        });
	
	        client.searchHistory({
	            from: jid.bare,
	            rsm: { max: 500, before: true },
	            complete: false
	        }, function (err, res) {
	            var mamResult = res.mamResult;
	            var itemList = mamResult.items || [];
	
	            var msgList = itemList.map(function (x) {
	                return (0, _simpleAssign2.default)({}, Message, x.forwarded.message, {
	                    id: x.forwarded.message.id,
	                    from: x.forwarded.message.from.bare,
	                    to: x.forwarded.message.to.bare,
	                    created: x.forwarded.delay.stamp,
	                    text: x.forwarded.message.body
	                });
	            });
	
	            dispatch({
	                type: _constants2.default.LOAD_MESSAGES,
	                messages: msgList
	
	            });
	        });
	
	        client.getRoster(function (err, resp) {
	            if (resp.roster && resp.roster.items && resp.roster.items.length) {
	
	                var items = resp.roster.items;
	
	                var contacts = items.map(function (item) {
	                    return (0, _simpleAssign2.default)({}, Contact, {
	                        owner: resp.to.bare,
	                        jid: item.jid.bare,
	                        nickname: item.jid.local,
	                        name: item.name,
	                        groups: item.groups,
	                        subscription: item.subscription,
	                        avatarID: "",
	                        resources: {},
	                        offlineStatus: {}
	                    });
	                });
	
	                dispatch({
	                    type: _constants2.default.LOAD_CONTACTS,
	                    contacts: contacts
	
	                });
	            }
	        });
	
	        client.getBookmarks(function (err, res) {
	            if (err) return;
	
	            var mucs = res.privateStorage.bookmarks.conferences || [];
	
	            dispatch({
	                type: _constants2.default.LOAD_MUCS,
	                mucs: mucs
	
	            });
	        });
	
	        dispatch({
	            type: _constants2.default.CLIENT_ON_SESSION_STARTED,
	            jid: jid,
	            client: client
	        });
	    });
	
	    client.on('roster:update', function (iq) {
	        iq = iq;
	        dispatch({
	            type: _constants2.default.CLIENT_ON_ROSTER_UPDATE,
	            iq: iq
	        });
	    });
	
	    client.on('subscribe', function (pres) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_SUBSCRIBE,
	            pres: pres
	        });
	    });
	
	    client.on('available', function (pres) {
	
	        dispatch({
	            type: _constants2.default.CLIENT_ON_AVAILABLE,
	            pres: pres
	        });
	    });
	
	    client.on('unavailable', function (pres) {
	
	        dispatch({
	            type: _constants2.default.CLIENT_ON_UNAVALILABLE,
	            pres: pres
	        });
	    });
	
	    client.on('avatar', function (info) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_AVATAR,
	            info: info
	        });
	    });
	
	    client.on('chatState', function (info) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_CHAT_STATE,
	            info: info
	        });
	    });
	
	    client.on('chat', function (msg) {
	
	        dispatch({
	            type: _constants2.default.CLIENT_ON_CHAT,
	            msg: convMessage(msg)
	        });
	    });
	
	    client.on('groupchat', function (msg) {
	
	        dispatch({
	            type: _constants2.default.CLIENT_ON_GROUPCHAT,
	            msg: convMessage(msg)
	        });
	    });
	
	    client.on('groupchat:subject', function (msg) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_GROUPCHAT_SUBJECT,
	            msg: convMessage(msg)
	        });
	    });
	
	    client.on('replace', function (msg) {
	
	        dispatch({
	            type: _constants2.default.CLIENT_ON_REPLACE,
	            msg: convMessage(msg)
	        });
	    });
	
	    client.on('receipt', function (msg) {
	
	        dispatch({
	            type: _constants2.default.CLIENT_ON_RECEIPT,
	            msg: convMessage(msg)
	        });
	    });
	
	    client.on('carbon:received', function (carbon) {
	
	        var mereg = new RegExp(jid);
	        if (!mereg.test(jid)) return;
	
	        dispatch({
	            type: _constants2.default.CLIENT_ON_CARBON_RECEIVED,
	            carbon: carbon
	        });
	    });
	
	    client.on('carbon:sent', function (carbon) {
	        var mereg = new RegExp(jid);
	        if (!mereg.test(jid)) return;
	        dispatch({
	            type: _constants2.default.CLIENT_ON_CARBON_SENT,
	            carbon: carbon
	        });
	    });
	
	    client.on('disco:caps', function (pres) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_DISCO_CAPS,
	            pres: pres
	        });
	        if (pres.caps.hash) {
	            log.info('Caps from ' + pres.from + ' ver: ' + pres.caps.ver);
	            discoCapsQueue(pres);
	        }
	    });
	
	    client.on('stanza:acked', function (stanza) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_STANZA_ACKED,
	            stanza: stanza
	        });
	    });
	
	    client.on('jingle:incoming', function (session) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_JINGLE_INCOMING,
	            session: session
	        });
	    });
	
	    client.on('jingle:outgoing', function (session) {
	
	        dispatch({
	            type: _constants2.default.CLIENT_ON_JINGLE_OUTGOING,
	            session: session
	        });
	    });
	
	    client.on('jingle:terminated', function (session) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_JINGLE_TERMINATED,
	            session: session
	        });
	    });
	
	    client.on('jingle:accepted', function (session) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_JINGLE_ACCEPTED,
	            session: session
	        });
	    });
	
	    client.on('jingle:localstream:added', function (stream) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_JINGLE_LOCALSTREAM_ADDED,
	            stream: stream
	        });
	    });
	
	    client.on('jingle:localstream:removed', function () {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_JINGLE_LOCALSTREAM_REMOVED
	        });
	    });
	
	    client.on('jingle:remotestream:added', function (session) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_JINGLE_REMOTESTREAM_ADDED,
	            session: session
	        });
	    });
	
	    client.on('jingle:remotestream:removed', function (session) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_JINGLE_REMOTESTREAM_REMOVED
	        });
	    });
	
	    client.on('jingle:ringing', function (session) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_JINGLE_RINGING,
	            session: session
	        });
	    });
	};

/***/ }

})
//# sourceMappingURL=0.6f03b2d084bc60f9ec62.hot-update.js.map