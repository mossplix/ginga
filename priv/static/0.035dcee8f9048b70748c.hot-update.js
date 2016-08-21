webpackHotUpdate(0,{

/***/ 273:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setupClient = setupClient;
	exports.setCurrentUser = setCurrentUser;
	
	var _reactRouterRedux = __webpack_require__(246);
	
	var _constants = __webpack_require__(243);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _phoenix = __webpack_require__(274);
	
	var _utils = __webpack_require__(251);
	
	var _xmppActions = __webpack_require__(275);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var uuid = __webpack_require__(303);
	var StanzaIO = __webpack_require__(311);
	
	var pushNotifications = __webpack_require__(594);
	
	function setupClient(dispatch, user) {
	  var config = {
	    jid: user.jid,
	    wsURL: "ws://127.0.0.1:5280/websocket",
	    transport: "websocket",
	    nickname: user.first_name,
	    credentials: {
	      password: localStorage.getItem('phoenixAuthToken')
	    } };
	
	  var client = StanzaIO.createClient(config);
	  client.enableKeepAlive({ interval: 30 });
	  client.use(pushNotifications);
	  (0, _xmppActions.xmppSession)(client, dispatch, user.jid);
	
	  client.once('session:started', function () {
	    dispatch({
	      type: _constants2.default.APP_CONNECTED
	    });
	  });
	  client.connect();
	}
	
	function setCurrentUser(dispatch, user) {
	  var socket = new _phoenix.Socket('/socket', {
	    params: { token: localStorage.getItem('phoenixAuthToken') },
	    logger: function logger(kind, msg, data) {
	      console.log(kind + ': ' + msg, data);
	    }
	  });
	
	  socket.connect();
	
	  var channel = socket.channel('users:' + user.id);
	
	  if (channel.state != 'joined') {
	    channel.join().receive('ok', function () {
	      dispatch({
	        type: _constants2.default.CURRENT_USER,
	        currentUser: user,
	        socket: socket,
	        channel: channel
	      });
	    });
	  }
	
	  channel.on('boards:add', function (msg) {
	    dispatch({
	      type: _constants2.default.BOARDS_ADDED,
	      board: msg.board
	    });
	  });
	};
	
	var Actions = {
	  signIn: function signIn(email, password) {
	    return function (dispatch) {
	      var data = {
	        session: {
	          email: email,
	          password: password
	        }
	      };
	
	      (0, _utils.httpPost)('/api/v1/sessions', data).then(function (data) {
	        localStorage.setItem('phoenixAuthToken', data.jwt);
	        setCurrentUser(dispatch, data.user);
	        dispatch((0, _reactRouterRedux.push)('/'));
	      }).catch(function (error) {
	        error.response.json().then(function (errorJSON) {
	          dispatch({
	            type: _constants2.default.SESSIONS_ERROR,
	            error: errorJSON.error
	          });
	        });
	      });
	    };
	  },
	
	  currentUser: function currentUser() {
	    return function (dispatch) {
	      var authToken = localStorage.getItem('phoenixAuthToken');
	
	      (0, _utils.httpGet)('/api/v1/current_user').then(function (data) {
	        setCurrentUser(dispatch, data);
	        setupClient(dispatch, data);
	      }).catch(function (error) {
	        console.log(error);
	        dispatch((0, _reactRouterRedux.push)('/sign_in'));
	      });
	    };
	  },
	
	  signOut: function signOut() {
	    return function (dispatch) {
	      (0, _utils.httpDelete)('/api/v1/sessions').then(function (data) {
	        localStorage.removeItem('phoenixAuthToken');
	
	        dispatch({ type: _constants2.default.USER_SIGNED_OUT });
	
	        dispatch((0, _reactRouterRedux.push)('/sign_in'));
	
	        dispatch({ type: _constants2.default.BOARDS_FULL_RESET });
	      }).catch(function (error) {
	        console.log(error);
	      });
	    };
	  }
	};
	
	exports.default = Actions;

/***/ },

/***/ 1192:
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
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _ = __webpack_require__(276);
	var async = __webpack_require__(277);
	var crypto = __webpack_require__(279);
	var bows = __webpack_require__(301);
	
	
	var initialState = _defineProperty({
	    client: null,
	    user: null,
	    jid: null,
	    rooms: null,
	    config: null
	}, 'client', null);
	
	function reducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    switch (action.type) {
	        case _constants2.default.CURRENT_USER:
	            store.dispatch((0, _xmppActions.loadRooms)());
	
	            return _extends({}, state, { user: action.currentUser, jid: action.currentUser.jid, vhost: action.currentUser.vhost });
	
	        case _constants2.default.CLIENT_ON_SESSION_STARTED:
	            return _extends({}, state, { client: action.client, jid: action.client.jid.bare });
	
	        default:
	            return state;
	    }
	}

/***/ }

})
//# sourceMappingURL=0.035dcee8f9048b70748c.hot-update.js.map