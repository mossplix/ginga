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
	
	  dispatch((0, _xmppActions.loadRooms)());
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

/***/ }

})
//# sourceMappingURL=0.2424b63561fc5c719fc2.hot-update.js.map