webpackHotUpdate(0,{

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	/*global me, app, client*/
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.discoCapsQueue = discoCapsQueue;
	exports.getAllChannels = getAllChannels;
	exports.getAllMessages = getAllMessages;
	exports.createMessage = createMessage;
	exports.getRoster = getRoster;
	exports.receiveContacts = receiveContacts;
	exports.receiveCreatedContact = receiveCreatedContact;
	exports.receiveMucs = receiveMucs;
	exports.receiveCreatedMuc = receiveCreatedMuc;
	exports.xmppSession = xmppSession;
	
	var _constants = __webpack_require__(243);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ = __webpack_require__(276);
	var async = __webpack_require__(277);
	var crypto = __webpack_require__(279);
	var bows = __webpack_require__(301);
	var uuid = __webpack_require__(303);
	var XmppUtils = __webpack_require__(304);
	
	var log = bows('Otalk');
	var ioLogIn = bows('<< in');
	var ioLogOut = bows('>> out');
	
	function discoCapsQueue() {
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
	
	function getAllChannels() {}
	
	function getAllMessages() {}
	function createMessage(msg) {
	    // simulate writing to a database
	    var timestamp = Date.now();
	    var data = {
	        archivedId: msg.id || uuid.v4(),
	        owner: msg.owner || msg.from || app.me,
	        to: msg.to,
	        from: msg.from || app.me,
	        body: msg.body,
	        type: msg.type,
	        delay: msg.delay,
	        edited: msg.edited,
	        _created: msg.timestamp || timestamp,
	        from_full: msg.from,
	        to_full: msg.to
	    };
	    return data;
	}
	
	function getRoster() {
	
	    client.getRoster(function (err, resp) {
	        resp = resp;
	
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
	                app.storage.roster.add(data);
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
	        pres = pres;
	        dispatch({
	            type: _constants2.default.CLIENT_ON_AVAILABLE,
	            pres: pres
	        });
	    });
	
	    client.on('unavailable', function (pres) {
	        pres = pres;
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
	
	        msg = msg;
	        dispatch({
	            type: _constants2.default.CLIENT_ON_CHAT,
	            msg: msg
	        });
	    });
	
	    client.on('groupchat', function (msg) {
	        msg = msg;
	        dispatch({
	            type: _constants2.default.CLIENT_ON_GROUPCHAT,
	            msg: msg
	        });
	    });
	
	    client.on('groupchat:subject', function (msg) {
	        dispatch({
	            type: _constants2.default.CLIENT_ON_GROUPCHAT_SUBJECT,
	            msg: msg
	        });
	    });
	
	    client.on('replace', function (msg) {
	        msg = msg;
	        dispatch({
	            type: _constants2.default.CLIENT_ON_REPLACE,
	            msg: msg
	        });
	    });
	
	    client.on('receipt', function (msg) {
	        msg = msg;
	        dispatch({
	            type: _constants2.default.CLIENT_ON_RECEIPT,
	            msg: msg
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
	            discoCapsQueue.push(pres);
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
//# sourceMappingURL=0.7ad3329e55a357196ca9.hot-update.js.map