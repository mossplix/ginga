webpackHotUpdate(0,{

/***/ 925:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _class2, _temp2;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _simpleAssign = __webpack_require__(244);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(2);
	
	var _reactTitleComponent = __webpack_require__(926);
	
	var _reactTitleComponent2 = _interopRequireDefault(_reactTitleComponent);
	
	var _radium = __webpack_require__(927);
	
	var _radium2 = _interopRequireDefault(_radium);
	
	var _reactRedux = __webpack_require__(220);
	
	var _redux = __webpack_require__(226);
	
	var _lodash = __webpack_require__(987);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _reactRouter = __webpack_require__(159);
	
	var _reactGravatar = __webpack_require__(260);
	
	var _reactGravatar2 = _interopRequireDefault(_reactGravatar);
	
	var _reactPageClick = __webpack_require__(269);
	
	var _reactPageClick2 = _interopRequireDefault(_reactPageClick);
	
	var _reactRouterRedux = __webpack_require__(246);
	
	var _ClearFix = __webpack_require__(988);
	
	var _ClearFix2 = _interopRequireDefault(_ClearFix);
	
	var _AppBar = __webpack_require__(1008);
	
	var _AppBar2 = _interopRequireDefault(_AppBar);
	
	var _IconButton = __webpack_require__(1010);
	
	var _IconButton2 = _interopRequireDefault(_IconButton);
	
	var _FlatButton = __webpack_require__(1095);
	
	var _FlatButton2 = _interopRequireDefault(_FlatButton);
	
	var _spacing = __webpack_require__(1001);
	
	var _spacing2 = _interopRequireDefault(_spacing);
	
	var _styleResizable = __webpack_require__(1098);
	
	var _styleResizable2 = _interopRequireDefault(_styleResizable);
	
	var _getMuiTheme2 = __webpack_require__(990);
	
	var _getMuiTheme3 = _interopRequireDefault(_getMuiTheme2);
	
	var _colorManipulator = __webpack_require__(997);
	
	var _colorManipulator2 = _interopRequireDefault(_colorManipulator);
	
	var _close = __webpack_require__(1099);
	
	var _close2 = _interopRequireDefault(_close);
	
	var _IconMenu = __webpack_require__(1100);
	
	var _IconMenu2 = _interopRequireDefault(_IconMenu);
	
	var _moreVert = __webpack_require__(1121);
	
	var _moreVert2 = _interopRequireDefault(_moreVert);
	
	var _MenuItem = __webpack_require__(1122);
	
	var _MenuItem2 = _interopRequireDefault(_MenuItem);
	
	var _colors = __webpack_require__(1000);
	
	var _AppNavDrawer = __webpack_require__(1123);
	
	var _AppNavDrawer2 = _interopRequireDefault(_AppNavDrawer);
	
	var _MuiThemeProvider = __webpack_require__(1135);
	
	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);
	
	var _boardActions = __webpack_require__(242);
	
	var _boardActions2 = _interopRequireDefault(_boardActions);
	
	var _header = __webpack_require__(259);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _sessionActions = __webpack_require__(273);
	
	var _sessionActions2 = _interopRequireDefault(_sessionActions);
	
	var _headerActions = __webpack_require__(591);
	
	var _headerActions2 = _interopRequireDefault(_headerActions);
	
	var _Spinner = __webpack_require__(1138);
	
	var _Spinner2 = _interopRequireDefault(_Spinner);
	
	var _KeyBinder = __webpack_require__(1144);
	
	var _KeyBinder2 = _interopRequireDefault(_KeyBinder);
	
	var _PureRender = __webpack_require__(1142);
	
	var _PureRender2 = _interopRequireDefault(_PureRender);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var sparkTheme = (0, _getMuiTheme3.default)(_defineProperty({
	  palette: {
	    textColor: _colors.cyan500
	  },
	  appBar: {
	    height: 50
	  }
	}, 'palette', {
	  primary1Color: _colors.sparkLight,
	  primary2Color: _colors.cyan700,
	  primary3Color: _colors.grey400,
	  accent1Color: _colors.pinkA200,
	  accent2Color: _colors.grey100,
	  accent3Color: _colors.grey500,
	  textColor: _colors.darkBlack,
	  alternateTextColor: _colors.white,
	  canvasColor: _colors.white,
	  borderColor: _colors.grey300,
	  disabledColor: _colorManipulator2.default.fade(_colors.darkBlack, 0.3),
	  pickerHeaderColor: _colors.cyan500,
	  clockCircleColor: _colorManipulator2.default.fade(_colors.darkBlack, 0.07),
	  shadowColor: _colors.fullBlack
	}));
	
	var logo = _jsx('div', {}, void 0, _jsx(_IconButton2.default, {}, void 0, _jsx('img', {
	  src: '/images/logo2.png'
	})));
	
	var Master = (0, _KeyBinder2.default)(_class = (0, _PureRender2.default)(_class = (0, _radium2.default)(_class = (_temp2 = _class2 = function (_Component) {
	  _inherits(Master, _Component);
	
	  function Master() {
	    var _Object$getPrototypeO;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, Master);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Master)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.childContextTypes = {
	      muiTheme: _react.PropTypes.object
	    }, _this.mixins = [_styleResizable2.default], _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(Master, [{
	    key: 'getInitialState',
	    value: function getInitialState() {
	      return {
	        muiTheme: sparkTheme,
	        navDrawerOpen: false
	
	      };
	    }
	  }, {
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        muiTheme: this.state.muiTheme
	      };
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.setState({
	        muiTheme: this.state.muiTheme
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var dispatch = this.props.dispatch;
	
	      dispatch(_boardActions2.default.fetchBoards());
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps, nextContext) {
	      var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
	      this.setState({
	        muiTheme: newMuiTheme
	      });
	    }
	  }, {
	    key: 'getStyles',
	    value: function getStyles() {
	      var styles = {
	        logo: {
	          marginTop: '3px'
	        },
	        appBar: {
	          position: 'fixed',
	          // Needed to overlap the examples
	          zIndex: this.state.muiTheme.zIndex.appBar + 1,
	          top: 0
	        },
	        root: {
	          paddingTop: _spacing2.default.desktopKeylineIncrement,
	          minHeight: 400
	        },
	        content: {
	          margin: _spacing2.default.desktopGutter
	        },
	        contentWhenMedium: {
	          margin: _spacing2.default.desktopGutter * 2 + 'px ' + _spacing2.default.desktopGutter * 3 + 'px'
	        },
	        footer: {
	          backgroundColor: _colors.grey900,
	          textAlign: 'center'
	        },
	        a: {
	          color: _colors.darkWhite
	        },
	        p: {
	          margin: '0 auto',
	          padding: 0,
	          color: _colors.lightWhite,
	          maxWidth: 356
	        },
	        iconButton: {
	          color: _colors.darkWhite
	        }
	      };
	
	      if (this.isDeviceSize(_styleResizable2.default.statics.Sizes.MEDIUM) || this.isDeviceSize(_styleResizable2.default.statics.Sizes.LARGE)) {
	        styles.content = (0, _simpleAssign2.default)(styles.content, styles.contentWhenMedium);
	      }
	
	      return styles;
	    }
	  }, {
	    key: 'handleTouchTapLeftIconButton',
	    value: function handleTouchTapLeftIconButton() {
	      this.setState({
	        navDrawerOpen: !this.state.navDrawerOpen
	      });
	    }
	  }, {
	    key: 'handleChangeRequestNavDrawer',
	    value: function handleChangeRequestNavDrawer(open) {
	      this.setState({
	        navDrawerOpen: open
	      });
	    }
	  }, {
	    key: 'handleRequestChangeList',
	    value: function handleRequestChangeList(event, value) {
	      this.context.router.push(value);
	      this.setState({
	        navDrawerOpen: false
	      });
	    }
	  }, {
	    key: 'handleChangeMuiTheme',
	    value: function handleChangeMuiTheme(muiTheme) {
	      this.setState({
	        muiTheme: muiTheme
	      });
	    }
	  }, {
	    key: '_renderCurrentUser',
	    value: function _renderCurrentUser() {
	      var currentUser = this.props.currentUser;
	
	
	      if (!currentUser) {
	        return false;
	      }
	
	      var fullName = [currentUser.first_name, currentUser.last_name].join(' ');
	
	      return _jsx('a', {
	        className: 'current-user'
	      }, void 0, _jsx(_reactGravatar2.default, {
	        className: 'react-gravatar',
	        email: currentUser.email,
	        https: true
	      }), ' ', fullName);
	    }
	  }, {
	    key: '_renderSignOutLink',
	    value: function _renderSignOutLink() {
	      if (!this.props.currentUser) {
	        return false;
	      }
	
	      return _jsx('a', {
	        href: '#',
	        onClick: this._handleSignOutClick.bind(this)
	      }, void 0, _jsx('i', {
	        className: 'fa fa-sign-out'
	      }), ' Sign out');
	    }
	  }, {
	    key: '_handleSignOutClick',
	    value: function _handleSignOutClick(e) {
	      e.preventDefault();
	
	      this.props.dispatch(_sessionActions2.default.signOut());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var location = _props.location;
	      var children = _props.children;
	      var currentUser = _props.currentUser;
	      var dispatch = _props.dispatch;
	      var boards = _props.boards;
	      var socket = _props.socket;
	      var currentBoard = _props.currentBoard;
	
	
	      if (!currentUser) return false;
	
	      var navDrawerOpen = this.state.navDrawerOpen;
	      var prepareStyles = this.state.muiTheme.prepareStyles;
	
	
	      var router = this.context.router;
	      var styles = this.getStyles();
	      var title = router.isActive('/get-started') ? 'Get Started' : router.isActive('/customization') ? 'Customization' : router.isActive('/components') ? 'Components' : router.isActive('/') ? '' : '';
	
	      var docked = false;
	      var showMenuIconButton = true;
	      var logo2 = "mdsmdmdm";
	
	      if (this.isDeviceSize(_styleResizable2.default.statics.Sizes.LARGE) && title !== '') {
	        docked = true;
	        navDrawerOpen = true;
	        showMenuIconButton = false;
	
	        styles.navDrawer = {
	          zIndex: styles.appBar.zIndex - 1
	        };
	        styles.root.paddingLeft = 256;
	        styles.footer.paddingLeft = 256;
	      }
	
	      var search_bar = _jsx('div', {}, void 0, _jsx('input', {
	        type: 'text',
	        className: 'search'
	      }));
	
	      var auth_bar = _jsx('div', {}, void 0, _jsx(_IconMenu2.default, {
	        iconButtonElement: _jsx(_IconButton2.default, {}, void 0, _jsx(_moreVert2.default, {})),
	        targetOrigin: { horizontal: 'right', vertical: 'top' },
	        anchorOrigin: { horizontal: 'right', vertical: 'top' }
	      }, void 0, _jsx(_MenuItem2.default, {
	        primaryText: 'Refresh'
	      }), _jsx(_MenuItem2.default, {
	        primaryText: 'Help'
	      }), _jsx(_MenuItem2.default, {
	        primaryText: 'Sign out',
	        rightIcon: _jsx('i', {
	          className: 'fa fa-sign-out'
	        }),
	        onClick: this._handleSignOutClick.bind(this)
	      })));
	
	      return _jsx('div', {}, void 0, this.props.isLoading ? _jsx(_Spinner2.default, {}) : null, _jsx(_reactTitleComponent2.default, {
	        render: 'Plug Apps'
	      }), _jsx(_AppBar2.default, {
	        onLeftIconButtonTouchTap: this.handleTouchTapLeftIconButton,
	        title: logo,
	        zDepth: 1,
	        style: styles.appBar,
	        children: auth_bar,
	        showMenuIconButton: true,
	        iconElementRight: search_bar
	      }), _jsx(_ClearFix2.default, {}, void 0, _jsx('div', {
	        style: prepareStyles(styles.root)
	      }, void 0, _jsx('div', {
	        style: prepareStyles(styles.content)
	      }, void 0, children))), _jsx(_AppNavDrawer2.default, {
	        style: styles.navDrawer,
	        location: location,
	        docked: docked,
	        onRequestChangeNavDrawer: this.handleChangeRequestNavDrawer,
	        onRequestChangeList: this.handleRequestChangeList,
	        open: navDrawerOpen
	      }));
	    }
	  }]);
	
	  return Master;
	}(_react.Component), _class2.contextTypes = {
	  router: _react.PropTypes.object.isRequired
	}, _temp2)) || _class) || _class) || _class;
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    currentUser: state.session.currentUser,
	    socket: state.session.socket,
	    channel: state.session.channel,
	    boards: state.boards,
	    currentBoard: state.currentBoard
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Master);

/***/ }

})
//# sourceMappingURL=0.2e8d93bf6d366eca6cdf.hot-update.js.map