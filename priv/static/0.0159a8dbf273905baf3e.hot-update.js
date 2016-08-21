webpackHotUpdate(0,{

/***/ 1414:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _reactRedux = __webpack_require__(242);
	
	var _List = __webpack_require__(1415);
	
	var _reactDom = __webpack_require__(158);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Avatar = __webpack_require__(1556);
	
	var _Avatar2 = _interopRequireDefault(_Avatar);
	
	var _IconMenu = __webpack_require__(1558);
	
	var _IconMenu2 = _interopRequireDefault(_IconMenu);
	
	var _MenuItem = __webpack_require__(1571);
	
	var _MenuItem2 = _interopRequireDefault(_MenuItem);
	
	var _Divider = __webpack_require__(1572);
	
	var _Divider2 = _interopRequireDefault(_Divider);
	
	var _Subheader = __webpack_require__(1468);
	
	var _Subheader2 = _interopRequireDefault(_Subheader);
	
	var _colors = __webpack_require__(1428);
	
	var _IconButton = __webpack_require__(1489);
	
	var _IconButton2 = _interopRequireDefault(_IconButton);
	
	var _moreVert = __webpack_require__(1574);
	
	var _moreVert2 = _interopRequireDefault(_moreVert);
	
	var _twemoji = __webpack_require__(1575);
	
	var _twemoji2 = _interopRequireDefault(_twemoji);
	
	var _reactIntl = __webpack_require__(219);
	
	var _text_formatting = __webpack_require__(1000);
	
	var TextFormatting = _interopRequireWildcard(_text_formatting);
	
	var _chat_constants = __webpack_require__(267);
	
	var _chat_constants2 = _interopRequireDefault(_chat_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var React = __webpack_require__(2);
	
	var ReactPropTypes = React.PropTypes;
	var cx = __webpack_require__(1576);
	
	var MessageListItem = React.createClass({
	  displayName: 'MessageListItem',
	
	  // message: ReactPropTypes.object
	
	
	  parseEmojis: function parseEmojis() {
	    _twemoji2.default.parse(_reactDom2.default.findDOMNode(this), {
	      className: 'emoticon',
	      base: '',
	      folder: _chat_constants2.default.EMOJI_PATH
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    this.parseEmojis();
	  },
	
	  render: function render() {
	    var message = this.props.message;
	
	    var p_message = _jsx('span', {
	      dangerouslySetInnerHTML: { __html: TextFormatting.formatText(this.props.message.text) }
	    });
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
	    return _jsx('div', {
	      className: cx({
	        'message': true,
	        'left': message.isMine(),
	        'right': !message.isMine()
	      })
	    }, "msg_" + this.props.message.id, React.createElement(_List.ListItem, {
	      key: "messages2_" + this.props.ident,
	      ref: "messages2_" + this.props.ident,
	
	      leftAvatar: _jsx(_Avatar2.default, {
	        src: message.getSenderAvatar()
	      }),
	      rightIconButton: rightIconMenu,
	      primaryText: _jsx('p', {}, void 0, message.nickname(), ' ', _jsx('span', {
	        style: { color: _colors.lightBlack }
	      }, void 0, message.formattedTime())),
	      secondaryText: _jsx('p', {}, void 0, p_message),
	      secondaryTextLines: 8
	    }), _jsx(_Divider2.default, {
	      inset: true
	    }));
	  }
	
	});
	
	exports.default = MessageListItem;

/***/ }

})
//# sourceMappingURL=0.0159a8dbf273905baf3e.hot-update.js.map