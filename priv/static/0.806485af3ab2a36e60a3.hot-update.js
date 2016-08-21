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
	
	var _reactRouter = __webpack_require__(448);
	
	var _routes = __webpack_require__(506);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _reactTapEventPlugin = __webpack_require__(1953);
	
	var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);
	
	var _history = __webpack_require__(1958);
	
	var _store = __webpack_require__(1962);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _root = __webpack_require__(1993);
	
	var _root2 = _interopRequireDefault(_root);
	
	var _reactRouterRedux = __webpack_require__(577);
	
	var _reactRedux = __webpack_require__(531);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.push = _reactRouterRedux.push;
	var localStorage = __webpack_require__(636);
	
	var _ = __webpack_require__(1284);
	var async = __webpack_require__(608);
	var StanzaIO = __webpack_require__(642);
	
	var Notify = __webpack_require__(1994);
	var Desktop = __webpack_require__(1996);
	var AppCache = __webpack_require__(1997);
	var crypto = __webpack_require__(610);
	
	var MessageSchema = __webpack_require__(640);
	var jQuery = __webpack_require__(1269);
	var request = __webpack_require__(1998);
	__webpack_require__(2004)(request);
	var Backbone = __webpack_require__(2005);
	
	//var injectTapEventPlugin = require("react-tap-event-plugin");
	
	var moment = __webpack_require__(1156);
	
	
	//ChatExampleData.init(); // load example data into localstorage
	
	//ChatWebAPIUtils.getAllMessages();
	
	//Helpers for debugging
	window.React = _react2.default;
	window._ = _;
	window.Perf = __webpack_require__(2007);
	window.moment = moment;
	
	//Needed for onTouchTap
	//Can go away when react 1.0 release
	//Check this repo:
	//https://github.com/zilverline/react-tap-event-plugin
	(0, _reactTapEventPlugin2.default)();
	
	var store = (0, _store2.default)(_reactRouter.browserHistory);
	window.store = store;
	var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);
	
	var target = document.getElementById('main_container');
	var node = _jsx(_root2.default, {
	  routerHistory: history,
	  store: store
	});
	
	_reactDom2.default.render(node, target);

/***/ }
])
//# sourceMappingURL=0.806485af3ab2a36e60a3.hot-update.js.map