webpackHotUpdate(0,{

/***/ 945:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _simpleAssign = __webpack_require__(244);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _radium = __webpack_require__(946);
	
	var _radium2 = _interopRequireDefault(_radium);
	
	var _reactTitleComponent = __webpack_require__(1006);
	
	var _reactTitleComponent2 = _interopRequireDefault(_reactTitleComponent);
	
	var _ClearFix = __webpack_require__(1007);
	
	var _ClearFix2 = _interopRequireDefault(_ClearFix);
	
	var _AppBar = __webpack_require__(1027);
	
	var _AppBar2 = _interopRequireDefault(_AppBar);
	
	var _IconButton = __webpack_require__(1029);
	
	var _IconButton2 = _interopRequireDefault(_IconButton);
	
	var _FlatButton = __webpack_require__(1114);
	
	var _FlatButton2 = _interopRequireDefault(_FlatButton);
	
	var _spacing = __webpack_require__(1020);
	
	var _spacing2 = _interopRequireDefault(_spacing);
	
	var _styleResizable = __webpack_require__(1117);
	
	var _styleResizable2 = _interopRequireDefault(_styleResizable);
	
	var _getMuiTheme2 = __webpack_require__(1009);
	
	var _getMuiTheme3 = _interopRequireDefault(_getMuiTheme2);
	
	var _colorManipulator = __webpack_require__(1016);
	
	var _colorManipulator2 = _interopRequireDefault(_colorManipulator);
	
	var _close = __webpack_require__(1118);
	
	var _close2 = _interopRequireDefault(_close);
	
	var _IconMenu = __webpack_require__(1119);
	
	var _IconMenu2 = _interopRequireDefault(_IconMenu);
	
	var _moreVert = __webpack_require__(1140);
	
	var _moreVert2 = _interopRequireDefault(_moreVert);
	
	var _MenuItem = __webpack_require__(1141);
	
	var _MenuItem2 = _interopRequireDefault(_MenuItem);
	
	var _PureRender = __webpack_require__(1142);
	
	var _PureRender2 = _interopRequireDefault(_PureRender);
	
	var _reactRouterRedux = __webpack_require__(246);
	
	var _colors = __webpack_require__(1019);
	
	var _AppNavDrawer = __webpack_require__(1144);
	
	var _AppNavDrawer2 = _interopRequireDefault(_AppNavDrawer);
	
	var _MuiThemeProvider = __webpack_require__(1156);
	
	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);
	
	var _boardActions = __webpack_require__(242);
	
	var _boardActions2 = _interopRequireDefault(_boardActions);
	
	var _header = __webpack_require__(259);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _reactRedux = __webpack_require__(220);
	
	var _reactRouter = __webpack_require__(159);
	
	var _reactGravatar = __webpack_require__(260);
	
	var _reactGravatar2 = _interopRequireDefault(_reactGravatar);
	
	var _reactPageClick = __webpack_require__(269);
	
	var _reactPageClick2 = _interopRequireDefault(_reactPageClick);
	
	var _sessionActions = __webpack_require__(273);
	
	var _sessionActions2 = _interopRequireDefault(_sessionActions);
	
	var _AppActions = __webpack_require__(1168);
	
	var _headerActions = __webpack_require__(595);
	
	var _headerActions2 = _interopRequireDefault(_headerActions);
	
	var _xmppActions = __webpack_require__(275);
	
	var _Spinner = __webpack_require__(1169);
	
	var _Spinner2 = _interopRequireDefault(_Spinner);
	
	var _redux = __webpack_require__(226);
	
	var _selectors = __webpack_require__(941);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	var Master = _react2.default.createClass({
	  displayName: 'Master',
	
	
	  contextTypes: {
	    router: _react2.default.PropTypes.object.isRequired
	  },
	
	  childContextTypes: {
	    muiTheme: _react2.default.PropTypes.object
	  },
	
	  mixins: [_styleResizable2.default],
	
	  getInitialState: function getInitialState() {
	    return {
	      muiTheme: sparkTheme,
	      navDrawerOpen: false
	
	    };
	  },
	  getChildContext: function getChildContext() {
	    return {
	      muiTheme: this.state.muiTheme
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this.setState({
	      muiTheme: this.state.muiTheme
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    var dispatch = this.props.dispatch;
	
	    dispatch(_boardActions2.default.fetchBoards());
	    dispatch((0, _xmppActions.loadRooms)());
	    //dispatch(getAllMessages());
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
	    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
	    this.setState({
	      muiTheme: newMuiTheme
	    });
	  },
	  getStyles: function getStyles() {
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
	  },
	  handleTouchTapLeftIconButton: function handleTouchTapLeftIconButton() {
	    this.setState({
	      navDrawerOpen: !this.state.navDrawerOpen
	    });
	  },
	  handleChangeRequestNavDrawer: function handleChangeRequestNavDrawer(open) {
	    this.setState({
	      navDrawerOpen: open
	    });
	  },
	  handleRequestChangeList: function handleRequestChangeList(event, value) {
	    this.context.router.push(value);
	    this.setState({
	      navDrawerOpen: false
	    });
	  },
	  handleChangeMuiTheme: function handleChangeMuiTheme(muiTheme) {
	    this.setState({
	      muiTheme: muiTheme
	    });
	  },
	  _renderCurrentUser: function _renderCurrentUser() {
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
	  },
	  _tryLoad: function _tryLoad(props, state) {
	    this.props.loadBoards();
	    //this.props.loadMessageList();
	    //ThreadActions.refresh,
	    this.props.loadRooms();
	  },
	  _renderSignOutLink: function _renderSignOutLink() {
	    if (!this.props.currentUser) {
	      return false;
	    }
	
	    return _jsx('a', {
	      href: '#',
	      onClick: this._handleSignOutClick
	    }, void 0, _jsx('i', {
	      className: 'fa fa-sign-out'
	    }), ' Sign out');
	  },
	  _handleSignOutClick: function _handleSignOutClick(e) {
	    e.preventDefault();
	
	    this.props.dispatch(_sessionActions2.default.signOut());
	  },
	  render: function render() {
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
	
	    var docked = true;
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
	      onClick: this._handleSignOutClick
	    })));
	
	    return _jsx('div', {}, void 0, _jsx(_radium.StyleRoot, {}, void 0, this.props.isLoading ? _jsx(_Spinner2.default, {}) : null), _jsx(_reactTitleComponent2.default, {
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
	    }, void 0, _jsx(_AppNavDrawer2.default, {
	      style: styles.navDrawer,
	      location: location,
	      docked: docked,
	      onRequestChangeNavDrawer: this.handleChangeRequestNavDrawer,
	      onRequestChangeList: this.handleRequestChangeList,
	      open: navDrawerOpen
	    }), children))));
	  }
	});
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    currentUser: state.session.currentUser,
	    socket: state.session.socket,
	    channel: state.session.channel,
	    boards: state.boards,
	    currentBoard: state.currentBoard,
	    isLoading: (0, _selectors.isLoadingSelector)(state),
	    labels: (0, _selectors.labelsSelector)(state),
	    searchQuery: (0, _selectors.searchQuerySelector)(state),
	    threads: (0, _selectors.threadsSelector)(state),
	    //rooms: roomsSelector(state),
	    lastMessageInEachThread: (0, _selectors.lastMessageInEachThreadSelector)(state),
	    hasMoreThreads: (0, _selectors.hasMoreThreadsSelector)(state),
	    hasMoreMessages: (0, _selectors.hasMoreThreadsSelector)(state),
	    loadedThreadCount: (0, _selectors.loadedThreadCountSelector)(state),
	    nextMessage: (0, _selectors.nextMessageSelector)(state),
	    prevMessage: (0, _selectors.prevMessageSelector)(state)
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Master);

/***/ }

})
//# sourceMappingURL=0.d9dd7afc04d2a20e6597.hot-update.js.map