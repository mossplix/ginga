webpackHotUpdate(0,{

/***/ 1673:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;
	
	var _redux = __webpack_require__(248);
	
	var _reactRouterRedux = __webpack_require__(288);
	
	var _reduxLogger = __webpack_require__(1674);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	var _reduxThunk = __webpack_require__(1675);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reducers = __webpack_require__(1676);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _reduxPromise = __webpack_require__(1699);
	
	var _reduxPromise2 = _interopRequireDefault(_reduxPromise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var loggerMiddleware = (0, _reduxLogger2.default)({
	  level: 'info',
	  collapsed: true
	});
	
	var initialState = {
	  phase: 'pending',
	  error: null,
	  loading: true
	};
	
	function configureStore(browserHistory) {
	
	  var reduxRouterMiddleware = (0, _reactRouterRedux.routerMiddleware)(browserHistory);
	  var createStoreWithMiddleware = (0, _redux.compose)((0, _redux.applyMiddleware)(reduxRouterMiddleware, _reduxThunk2.default, _reduxPromise2.default, loggerMiddleware), window.devToolsExtension ? window.devToolsExtension() : function (f) {
	    return f;
	  })(_redux.createStore);
	  return createStoreWithMiddleware(_reducers2.default);
	}

/***/ }

})
//# sourceMappingURL=0.8d077c21cd7fd03659d3.hot-update.js.map