webpackHotUpdate(0,{

/***/ 1580:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _List = __webpack_require__(1415);
	
	var _Divider = __webpack_require__(1572);
	
	var _Divider2 = _interopRequireDefault(_Divider);
	
	var _Subheader = __webpack_require__(1468);
	
	var _Subheader2 = _interopRequireDefault(_Subheader);
	
	var _Avatar = __webpack_require__(1556);
	
	var _Avatar2 = _interopRequireDefault(_Avatar);
	
	var _colors = __webpack_require__(1428);
	
	var _IconButton = __webpack_require__(1489);
	
	var _IconButton2 = _interopRequireDefault(_IconButton);
	
	var _moreVert = __webpack_require__(1574);
	
	var _moreVert2 = _interopRequireDefault(_moreVert);
	
	var _IconMenu = __webpack_require__(1558);
	
	var _IconMenu2 = _interopRequireDefault(_IconMenu);
	
	var _MenuItem = __webpack_require__(1571);
	
	var _MenuItem2 = _interopRequireDefault(_MenuItem);
	
	var _reactRedux = __webpack_require__(242);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var React = __webpack_require__(2);
	var cx = __webpack_require__(1576);
	
	var ReactPropTypes = React.PropTypes;
	var Router = __webpack_require__(159);
	var Link = Router.Link;
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var State = Router.State;
	var Redirect = Router.Redirect;
	
	var iconButtonElement = _jsx(_IconButton2.default, {
	  touch: true,
	  tooltip: 'more',
	  tooltipPosition: 'bottom-left'
	}, void 0, _jsx(_moreVert2.default, {
	  color: _colors.grey400
	}));
	
	var rightIconMenu = _jsx(_IconMenu2.default, {
	  iconButtonElement: iconButtonElement
	}, void 0, _jsx(_MenuItem2.default, {}, void 0, 'Reply'), _jsx(_MenuItem2.default, {}, void 0, 'Forward'), _jsx(_MenuItem2.default, {}, void 0, 'Delete'));
	
	var ThreadListItem = React.createClass({
	  displayName: 'ThreadListItem',
	  _handleClick: function _handleClick() {
	
	    this.props.actions.clickThread(this.props.thread.id);
	  },
	
	
	  render: function render() {
	    var _props = this.props;
	    var thread = _props.thread;
	    var actions = _props.actions;
	
	    var lastMessage = thread.lastMessage;
	
	    if (lastMessage != null) {
	
	      return _jsx('div', {}, void 0, _jsx(_List.ListItem, {
	        leftAvatar: _jsx(_Avatar2.default, {
	          src: lastMessage.getSenderAvatar()
	        }),
	        primaryText: _jsx('p', {}, void 0, thread.name, ' ', _jsx('span', {
	          style: { color: _colors.lightBlack }
	        }, void 0, lastMessage.formattedTime())),
	        secondaryText: _jsx('p', {}, void 0, lastMessage.text),
	        secondaryTextLines: 2,
	        onClick: this._handleClick,
	        value: '/chat/threads/' + thread.id
	      }, "thread_" + thread.id), _jsx(_Divider2.default, {
	        inset: true
	      }));
	    } else {
	      return _jsx(_List.ListItem, {
	        primaryText: thread.name,
	        onClick: this._handleClick,
	        insetChildren: true
	      });
	    }
	  }
	
	});
	
	exports.default = ThreadListItem;

/***/ }

})
//# sourceMappingURL=0.57298e4adedcfbdf6344.hot-update.js.map