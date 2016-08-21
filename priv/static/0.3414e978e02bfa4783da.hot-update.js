webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	//import AppRoutes from './AppRoutes';
	
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(158);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRouter = __webpack_require__(159);
	
	var _routes = __webpack_require__(1845);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _reactTapEventPlugin = __webpack_require__(1700);
	
	var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);
	
	var _history = __webpack_require__(1705);
	
	var _store = __webpack_require__(1709);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _reactRouterRedux = __webpack_require__(600);
	
	var _reactRedux = __webpack_require__(571);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var localStorage = __webpack_require__(546);
	
	var _ = __webpack_require__(554);
	var async = __webpack_require__(281);
	var StanzaIO = __webpack_require__(232);
	
	var Storage = __webpack_require__(1714);
	var xmppEventHandlers = __webpack_require__(1720);
	var pushNotifications = __webpack_require__(1728);
	var Notify = __webpack_require__(1729);
	var Desktop = __webpack_require__(1731);
	var AppCache = __webpack_require__(1732);
	var AppState = __webpack_require__(1733);
	var userStore = __webpack_require__(1725);
	var contactUtils = __webpack_require__(549);
	var crypto = __webpack_require__(523);
	var ChatWebAPIUtils = __webpack_require__(229);
	
	var MessageSchema = __webpack_require__(539);
	var jQuery = __webpack_require__(1734);
	var request = __webpack_require__(1735);
	__webpack_require__(1741)(request);
	var Backbone = __webpack_require__(1742);
	
	//var injectTapEventPlugin = require("react-tap-event-plugin");
	
	var moment = __webpack_require__(1744);
	
	
	var store = (0, _store2.default)(_reactRouter.browserHistory);
	var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);
	
	//ChatExampleData.init(); // load example data into localstorage
	
	//ChatWebAPIUtils.getAllMessages();
	
	//Helpers for debugging
	window.React = _react2.default;
	window._ = _;
	window.Perf = __webpack_require__(1843);
	window.moment = moment;
	
	//Needed for onTouchTap
	//Can go away when react 1.0 release
	//Check this repo:
	//https://github.com/zilverline/react-tap-event-plugin
	(0, _reactTapEventPlugin2.default)();
	
	var _exports = {
	    launch: function launch() {
	        var self = window.app = this;
	        var config = {
	            jid: "mossplix@localhost",
	            wsURL: "ws://127.0.0.1:5280/websocket",
	            transport: "websocket",
	            nickname: "mmoses",
	            credentials: {
	                password: "mosespass"
	            } };
	        localStorage.config = JSON.stringify(config);
	
	        //localStorage.mucs  = JSON.stringify(muc_list);
	        app.jid = app.me = config.jid;
	        app.config = config;
	        window._ = _;
	        window.request = request;
	
	        config.useStreamManagement = true;
	
	        _.extend(this, Backbone.Events);
	
	        var profile = {};
	        async.series([function (cb) {
	            app.notifications = new Notify();
	            app.desktop = new Desktop();
	            app.cache = new AppCache();
	            app.storage = new Storage();
	            app.storage.open(cb);
	            app.crypto = crypto;
	            window.MessageSchema = MessageSchema;
	        }, function (cb) {
	            app.storage.profiles.get(config.jid, function (err, res) {
	                if (res) {
	                    profile = res;
	                    profile.jid = { full: config.jid, bare: config.jid };
	                    config.rosterVer = res.rosterVer;
	                }
	                cb();
	            });
	        }, function (cb) {
	
	            window.onbeforeunload = function () {
	                if (app.api.sessionStarted) {
	                    app.api.disconnect();
	                }
	            };
	
	            self.api = window.client = StanzaIO.createClient(config);
	            client.enableKeepAlive({ interval: 30 });
	            client.use(pushNotifications);
	            xmppEventHandlers(self.api, self);
	
	            self.api.once('session:started', function () {
	                app.hasConnected = true;
	                cb();
	            });
	            self.api.connect();
	        }, function (cb) {
	
	            ChatWebAPIUtils.getAllMessages();
	            ChatWebAPIUtils.getAllChannels();
	        }]);
	    }
	
	};
	
	_exports.launch();
	
	_reactDom2.default.render(_jsx(_reactRedux.Provider, {
	    store: store
	}, void 0, _jsx(_reactRouter.Router, {
	    history: history,
	    onUpdate: function onUpdate() {
	        return window.scrollTo(0, 0);
	    }
	}, void 0, (0, _routes2.default)(store))), document.getElementById('app_container'));

/***/ }
])
//# sourceMappingURL=0.3414e978e02bfa4783da.hot-update.js.map