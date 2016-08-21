webpackHotUpdate(0,{

/***/ 1182:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = reducer;
	
	var _constants = __webpack_require__(243);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = {
	    fetching: true
	};
	
	function stremUrl() {
	    return URL.createObjectURL(_me.stream);
	}
	
	function cameraOn() {
	    getUserMedia(function (err, stream) {
	        if (err) {
	            console.error(err);
	        } else {
	            _me.stream = stream;
	        }
	    });
	}
	function cameraOff() {
	    if (_me.stream) {
	        _me.stream.stop();
	        _me.stream = null;
	    }
	}
	
	function updateIdlePresence() {
	    var update = {
	        status: _me.status,
	        show: _me.show,
	        caps: app.api.disco.caps
	    };
	
	    if (!app.state.active) {
	        update.idle = { since: app.state.idleSince };
	    }
	
	    app.api.sendPresence(update);
	}
	
	function save() {
	
	    var data = {
	        jid: _me.jid.bare,
	        avatarID: _me.avatarID,
	        status: _me.status,
	        rosterVer: _me.rosterVer
	    };
	    app.storage.profiles.set(data);
	}
	
	function load() {
	
	    var self = this;
	
	    app.storage.profiles.get(app.jid, function (err, profile) {
	        if (!err) {
	            _me.status = profile.status;
	            _me.avatarID = profile.avatarID;
	            self.save();
	
	            client.sendPresence({
	                status: _me.status,
	                caps: client.disco.caps
	            });
	            window.me = _me;
	        }
	
	        /*
	        put in contacts model
	        app.storage.roster.getAll(me.jid.bare, function (err, contacts) {
	             if (err) return;
	              contacts.forEach(function (contact) {
	                 contact = new Contact(contact);
	                 contact.owner = self.jid.bare;
	                 contact.inRoster = true;
	                 contact.save();
	                 self.contacts.add(contact);
	             });
	              self.contacts.trigger('loaded');*/
	    });
	}
	
	function setAvatar(id, type, source) {
	
	    fetchAvatar('', id, type, source, function (avatar) {
	        _me.avatarID = avatar.id;
	        _me.avatar = avatar.uri;
	    });
	}
	
	function reducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    switch (action.type) {
	        case _constants2.default.USER_CHANGE_JID:
	            //UserStore.load();
	            return _extends({}, state);
	        case _constants2.default.USER_CHANGE_ACTIVE:
	            //UserStore.updateIdlePresence();
	
	            return _extends({}, state);
	        case _constants2.default.USER_CHANGE_STATUS:
	
	            //UserStore.save();
	            return _extends({}, state);
	        case _constants2.default.USER_CHANGE_ROSTER_VERSION:
	
	            //UserStore.save();
	            return _extends({}, state);
	        case _constants2.default.USER_CHANGE_AVATARID:
	            //UserStore.save();
	
	            return _extends({}, state);
	        case _constants2.default.CLIENT_ON_SESSION_STARTED:
	            //UserStore.load();
	
	            return _extends({}, state);
	
	        case _constants2.default.CLIENT_ON_CREDENTIALS_UPDATE:
	            creds = action.creds;
	            if (creds.clientKey && creds.serverKey) {
	                delete creds.password;
	                delete creds.saltedPassword;
	            } else if (creds.saltedPassword) {
	                delete creds.password;
	            }
	
	            localStorage.config = JSON.stringify({
	                jid: client.config.jid.bare,
	                server: client.config.server,
	                wsURL: client.config.wsURL,
	                credentials: creds
	            });
	
	            return _extends({}, state);
	
	        default:
	            return state;
	    }
	}

/***/ }

})
//# sourceMappingURL=0.94aca140ae0377f52d71.hot-update.js.map