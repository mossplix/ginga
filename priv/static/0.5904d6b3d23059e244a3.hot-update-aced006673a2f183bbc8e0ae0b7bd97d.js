webpackHotUpdate(0,{

/***/ 1:
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
	
	_reactDom2.default.render(_jsx(_reactRouter.Router, {
	    history: history,
	    onUpdate: function onUpdate() {
	        return window.scrollTo(0, 0);
	    }
	}, void 0, (0, _routes2.default)(store)), document.getElementById('app_container'));

/***/ },

/***/ 1845:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Here we define all our material-ui ReactComponents.
	
	
	exports.default = configRoutes;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(159);
	
	var _ChatApp = __webpack_require__(218);
	
	var _ChatApp2 = _interopRequireDefault(_ChatApp);
	
	var _new = __webpack_require__(570);
	
	var _new2 = _interopRequireDefault(_new);
	
	var _Master = __webpack_require__(607);
	
	var _Master2 = _interopRequireDefault(_Master);
	
	var _Home = __webpack_require__(791);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _Prerequisites = __webpack_require__(795);
	
	var _Prerequisites2 = _interopRequireDefault(_Prerequisites);
	
	var _Installation = __webpack_require__(951);
	
	var _Installation2 = _interopRequireDefault(_Installation);
	
	var _Usage = __webpack_require__(953);
	
	var _Usage2 = _interopRequireDefault(_Usage);
	
	var _Examples = __webpack_require__(955);
	
	var _Examples2 = _interopRequireDefault(_Examples);
	
	var _ServerRendering = __webpack_require__(957);
	
	var _ServerRendering2 = _interopRequireDefault(_ServerRendering);
	
	var _Colors = __webpack_require__(959);
	
	var _Colors2 = _interopRequireDefault(_Colors);
	
	var _Themes = __webpack_require__(960);
	
	var _Themes2 = _interopRequireDefault(_Themes);
	
	var _InlineStyles = __webpack_require__(1071);
	
	var _InlineStyles2 = _interopRequireDefault(_InlineStyles);
	
	var _Page = __webpack_require__(1076);
	
	var _Page2 = _interopRequireDefault(_Page);
	
	var _Page3 = __webpack_require__(1273);
	
	var _Page4 = _interopRequireDefault(_Page3);
	
	var _Page5 = __webpack_require__(1282);
	
	var _Page6 = _interopRequireDefault(_Page5);
	
	var _Page7 = __webpack_require__(1288);
	
	var _Page8 = _interopRequireDefault(_Page7);
	
	var _Page9 = __webpack_require__(1298);
	
	var _Page10 = _interopRequireDefault(_Page9);
	
	var _Page11 = __webpack_require__(1312);
	
	var _Page12 = _interopRequireDefault(_Page11);
	
	var _Page13 = __webpack_require__(1319);
	
	var _Page14 = _interopRequireDefault(_Page13);
	
	var _Page15 = __webpack_require__(1326);
	
	var _Page16 = _interopRequireDefault(_Page15);
	
	var _Page17 = __webpack_require__(1349);
	
	var _Page18 = _interopRequireDefault(_Page17);
	
	var _Page19 = __webpack_require__(1360);
	
	var _Page20 = _interopRequireDefault(_Page19);
	
	var _Page21 = __webpack_require__(1370);
	
	var _Page22 = _interopRequireDefault(_Page21);
	
	var _Page23 = __webpack_require__(1379);
	
	var _Page24 = _interopRequireDefault(_Page23);
	
	var _Page25 = __webpack_require__(1390);
	
	var _Page26 = _interopRequireDefault(_Page25);
	
	var _Page27 = __webpack_require__(1400);
	
	var _Page28 = _interopRequireDefault(_Page27);
	
	var _Page29 = __webpack_require__(1406);
	
	var _Page30 = _interopRequireDefault(_Page29);
	
	var _Page31 = __webpack_require__(1413);
	
	var _Page32 = _interopRequireDefault(_Page31);
	
	var _Page33 = __webpack_require__(1422);
	
	var _Page34 = _interopRequireDefault(_Page33);
	
	var _Page35 = __webpack_require__(1437);
	
	var _Page36 = _interopRequireDefault(_Page35);
	
	var _Page37 = __webpack_require__(1452);
	
	var _Page38 = _interopRequireDefault(_Page37);
	
	var _Page39 = __webpack_require__(1484);
	
	var _Page40 = _interopRequireDefault(_Page39);
	
	var _Page41 = __webpack_require__(1491);
	
	var _Page42 = _interopRequireDefault(_Page41);
	
	var _Page43 = __webpack_require__(1500);
	
	var _Page44 = _interopRequireDefault(_Page43);
	
	var _Page45 = __webpack_require__(1519);
	
	var _Page46 = _interopRequireDefault(_Page45);
	
	var _Page47 = __webpack_require__(1529);
	
	var _Page48 = _interopRequireDefault(_Page47);
	
	var _Page49 = __webpack_require__(1538);
	
	var _Page50 = _interopRequireDefault(_Page49);
	
	var _Page51 = __webpack_require__(1545);
	
	var _Page52 = _interopRequireDefault(_Page51);
	
	var _Page53 = __webpack_require__(1551);
	
	var _Page54 = _interopRequireDefault(_Page53);
	
	var _Page55 = __webpack_require__(1564);
	
	var _Page56 = _interopRequireDefault(_Page55);
	
	var _Page57 = __webpack_require__(1573);
	
	var _Page58 = _interopRequireDefault(_Page57);
	
	var _Page59 = __webpack_require__(1582);
	
	var _Page60 = _interopRequireDefault(_Page59);
	
	var _Page61 = __webpack_require__(1592);
	
	var _Page62 = _interopRequireDefault(_Page61);
	
	var _Page63 = __webpack_require__(1595);
	
	var _Page64 = _interopRequireDefault(_Page63);
	
	var _Page65 = __webpack_require__(1608);
	
	var _Page66 = _interopRequireDefault(_Page65);
	
	var _Page67 = __webpack_require__(1637);
	
	var _Page68 = _interopRequireDefault(_Page67);
	
	var _Page69 = __webpack_require__(1650);
	
	var _Page70 = _interopRequireDefault(_Page69);
	
	var _Page71 = __webpack_require__(1659);
	
	var _Page72 = _interopRequireDefault(_Page71);
	
	var _Page73 = __webpack_require__(1664);
	
	var _Page74 = _interopRequireDefault(_Page73);
	
	var _Community = __webpack_require__(1677);
	
	var _Community2 = _interopRequireDefault(_Community);
	
	var _Contributing = __webpack_require__(1679);
	
	var _Contributing2 = _interopRequireDefault(_Contributing);
	
	var _Showcase = __webpack_require__(1681);
	
	var _Showcase2 = _interopRequireDefault(_Showcase);
	
	var _RelatedProjects = __webpack_require__(1683);
	
	var _RelatedProjects2 = _interopRequireDefault(_RelatedProjects);
	
	var _Page75 = __webpack_require__(1685);
	
	var _Page76 = _interopRequireDefault(_Page75);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
	 *
	 * Routes are used to declare your view hierarchy.
	 *
	 * Say you go to http://material-ui.com/#/components/paper
	 * The react router will search for a route named 'paper' and will recursively render its
	 * handler and its parent handler like so: Paper > Components > Master
	 */
	var AppRoutes = _jsx(_reactRouter.Route, {
	  path: '/',
	  component: _Master2.default
	}, void 0, _jsx(_reactRouter.IndexRoute, {
	  component: _Home2.default
	}), _jsx(_reactRouter.Route, {
	  path: '/sign_in',
	  component: _new2.default
	}), _jsx(_reactRouter.Route, {
	  path: 'home',
	  component: _Home2.default
	}), _jsx(_reactRouter.Redirect, {
	  from: 'get-started',
	  to: '/get-started/prerequisites'
	}), _jsx(_reactRouter.Route, {
	  path: 'get-started'
	}, void 0, _jsx(_reactRouter.Route, {
	  path: 'prerequisites',
	  component: _Prerequisites2.default
	}), _jsx(_reactRouter.Route, {
	  path: 'installation',
	  component: _Installation2.default
	}), _jsx(_reactRouter.Route, {
	  path: 'usage',
	  component: _Usage2.default
	}), _jsx(_reactRouter.Route, {
	  path: 'examples',
	  component: _Examples2.default
	}), _jsx(_reactRouter.Route, {
	  path: 'server-rendering',
	  component: _ServerRendering2.default
	}), _jsx(_reactRouter.Route, {
	  path: 'chat',
	  component: _ChatApp2.default
	})), _jsx(_reactRouter.Redirect, {
	  from: 'customization',
	  to: '/customization/themes'
	}), _jsx(_reactRouter.Route, {
	  path: 'customization'
	}, void 0, _jsx(_reactRouter.Route, {
	  path: 'colors',
	  component: _Colors2.default
	}), _jsx(_reactRouter.Route, {
	  path: 'themes',
	  component: _Themes2.default
	}), _jsx(_reactRouter.Route, {
	  path: 'inline-styles',
	  component: _InlineStyles2.default
	})), _jsx(_reactRouter.Redirect, {
	  from: 'components',
	  to: '/components/app-bar'
	}), _jsx(_reactRouter.Route, {
	  path: 'components'
	}, void 0, _jsx(_reactRouter.Route, {
	  path: 'app-bar',
	  component: _Page2.default
	}), _jsx(_reactRouter.Route, {
	  path: 'auto-complete',
	  component: _Page4.default
	}), _jsx(_reactRouter.Route, {
	  path: 'avatar',
	  component: _Page6.default
	}), _jsx(_reactRouter.Route, {
	  path: 'badge',
	  component: _Page8.default
	}), _jsx(_reactRouter.Route, {
	  path: 'card',
	  component: _Page10.default
	}), _jsx(_reactRouter.Route, {
	  path: 'circular-progress',
	  component: _Page12.default
	}), _jsx(_reactRouter.Route, {
	  path: 'checkbox',
	  component: _Page14.default
	}), _jsx(_reactRouter.Route, {
	  path: 'date-picker',
	  component: _Page16.default
	}), _jsx(_reactRouter.Route, {
	  path: 'dialog',
	  component: _Page18.default
	}), _jsx(_reactRouter.Route, {
	  path: 'divider',
	  component: _Page20.default
	}), _jsx(_reactRouter.Route, {
	  path: 'drawer',
	  component: _Page22.default
	}), _jsx(_reactRouter.Route, {
	  path: 'dropdown-menu',
	  component: _Page24.default
	}), _jsx(_reactRouter.Route, {
	  path: 'font-icon',
	  component: _Page30.default
	}), _jsx(_reactRouter.Route, {
	  path: 'flat-button',
	  component: _Page26.default
	}), _jsx(_reactRouter.Route, {
	  path: 'floating-action-button',
	  component: _Page28.default
	}), _jsx(_reactRouter.Route, {
	  path: 'grid-list',
	  component: _Page32.default
	}), _jsx(_reactRouter.Route, {
	  path: 'icon-button',
	  component: _Page34.default
	}), _jsx(_reactRouter.Route, {
	  path: 'icon-menu',
	  component: _Page36.default
	}), _jsx(_reactRouter.Route, {
	  path: 'list',
	  component: _Page38.default
	}), _jsx(_reactRouter.Route, {
	  path: 'linear-progress',
	  component: _Page40.default
	}), _jsx(_reactRouter.Route, {
	  path: 'paper',
	  component: _Page42.default
	}), _jsx(_reactRouter.Route, {
	  path: 'menu',
	  component: _Page44.default
	}), _jsx(_reactRouter.Route, {
	  path: 'popover',
	  component: _Page46.default
	}), _jsx(_reactRouter.Route, {
	  path: 'refresh-indicator',
	  component: _Page50.default
	}), _jsx(_reactRouter.Route, {
	  path: 'radio-button',
	  component: _Page52.default
	}), _jsx(_reactRouter.Route, {
	  path: 'raised-button',
	  component: _Page48.default
	}), _jsx(_reactRouter.Route, {
	  path: 'select-field',
	  component: _Page54.default
	}), _jsx(_reactRouter.Route, {
	  path: 'svg-icon',
	  component: _Page60.default
	}), _jsx(_reactRouter.Route, {
	  path: 'slider',
	  component: _Page56.default
	}), _jsx(_reactRouter.Route, {
	  path: 'snackbar',
	  component: _Page58.default
	}), _jsx(_reactRouter.Route, {
	  path: 'stepper',
	  component: _Page76.default
	}), _jsx(_reactRouter.Route, {
	  path: 'subheader',
	  component: _Page62.default
	}), _jsx(_reactRouter.Route, {
	  path: 'table',
	  component: _Page64.default
	}), _jsx(_reactRouter.Route, {
	  path: 'tabs',
	  component: _Page66.default
	}), _jsx(_reactRouter.Route, {
	  path: 'text-field',
	  component: _Page68.default
	}), _jsx(_reactRouter.Route, {
	  path: 'time-picker',
	  component: _Page70.default
	}), _jsx(_reactRouter.Route, {
	  path: 'toggle',
	  component: _Page72.default
	}), _jsx(_reactRouter.Route, {
	  path: 'toolbar',
	  component: _Page74.default
	})), _jsx(_reactRouter.Redirect, {
	  from: 'discover-more',
	  to: '/discover-more/community'
	}), _jsx(_reactRouter.Route, {
	  path: 'discover-more'
	}, void 0, _jsx(_reactRouter.Route, {
	  path: 'community',
	  component: _Community2.default
	}), _jsx(_reactRouter.Route, {
	  path: 'contributing',
	  component: _Contributing2.default
	}), _jsx(_reactRouter.Route, {
	  path: 'showcase',
	  component: _Showcase2.default
	}), _jsx(_reactRouter.Route, {
	  path: 'related-projects',
	  component: _RelatedProjects2.default
	})));
	
	function configRoutes(store) {
	  var _ensureAuthenticated = function _ensureAuthenticated(nextState, replace, callback) {
	    var dispatch = store.dispatch;
	
	    var _store$getState = store.getState();
	
	    var session = _store$getState.session;
	    var currentUser = session.currentUser;
	
	
	    if (!currentUser && localStorage.getItem('phoenixAuthToken')) {
	      dispatch(Actions.currentUser());
	    } else if (!localStorage.getItem('phoenixAuthToken')) {
	      replace('/sign_in');
	    }
	
	    callback();
	  };
	
	  return { AppRoutes: AppRoutes };
	}

/***/ }

})
//# sourceMappingURL=0.5904d6b3d23059e244a3.hot-update.js.map