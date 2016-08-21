webpackHotUpdate(0,{

/***/ 978:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _MessageComposer = __webpack_require__(979);
	
	var _MessageComposer2 = _interopRequireDefault(_MessageComposer);
	
	var _MessageListItem = __webpack_require__(1414);
	
	var _MessageListItem2 = _interopRequireDefault(_MessageListItem);
	
	var _reactRedux = __webpack_require__(242);
	
	var _reactDom = __webpack_require__(158);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _chatActions = __webpack_require__(990);
	
	var ChatActions = _interopRequireWildcard(_chatActions);
	
	var _List = __webpack_require__(1415);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var React = __webpack_require__(2);
	
	function getMessageListItem(message, actions, index) {
	  return _jsx(_MessageListItem2.default, {
	    message: message,
	    actions: actions,
	    ident: index
	  });
	}
	
	var MessageSection = React.createClass({
	  displayName: 'MessageSection',
	
	
	  componentDidMount: function componentDidMount() {
	    this._scrollToBottom();
	  },
	
	  render: function render() {
	    var _this = this;
	
	    var messageListItems = _.toArray(this.props.threadMessages).map(function (message, index) {
	      return getMessageListItem(message, _this.props.actions, index);
	    });
	    return _jsx('div', {}, void 0, _jsx('h3', {
	      className: 'message-thread-heading'
	    }, void 0, this.props.currentChat.type), React.createElement(
	      'div',
	      {
	        ref: 'postlist',
	        className: 'post-list-holder-by-time message-list'
	      },
	      _jsx('div', {
	        className: 'post-list__table'
	      }, void 0, React.createElement(
	        'div',
	        {
	          ref: 'postlistcontent',
	          className: 'post-list__content'
	        },
	        _jsx('div', {
	          className: 'message-send-container'
	        }, void 0, React.createElement(
	          'div',
	          { className: 'messages', ref: 'messageList' },
	          _jsx(_List.List, {}, void 0, messageListItems)
	        ))
	      ))
	    ), _jsx(_List.List, {}, void 0));
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	    this._scrollToBottom();
	  },
	
	  _scrollToBottom: function _scrollToBottom() {
	    var ul = _reactDom2.default.findDOMNode(this.refs.messageList);
	    console.log("s");
	
	    ul.scrollTop = ul.scrollHeight;
	  }
	
	});
	
	exports.default = MessageSection;

/***/ }

})
//# sourceMappingURL=0.cc46920b3fc028ca4312.hot-update.js.map