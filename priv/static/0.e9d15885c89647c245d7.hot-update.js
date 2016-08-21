webpackHotUpdate(0,{

/***/ 932:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _reactRedux = __webpack_require__(220);
	
	var React = __webpack_require__(2);
	
	var ReactPropTypes = React.PropTypes;
	var cx = __webpack_require__(933);
	
	var MessageListItem = React.createClass({
	  displayName: 'MessageListItem',
	
	
	  render: function render() {
	    var message = this.props.message;
	    return _jsx('div', {
	      className: cx({
	        'message': true,
	        'left': message.isMine(),
	        'right': !message.isMine()
	      })
	    }, "msg_" + this.props.message.id, _jsx('div', {
	      className: 'message-text'
	    }, void 0, message.text, _jsx('div', {
	      className: 'list-action-right'
	    }, void 0, _jsx('span', {
	      className: 'top'
	    }, void 0, message.nickname()), '  ', _jsx('time', {
	      className: 'meta'
	    }, void 0, message.formattedTime()))), _jsx('img', {
	      src: message.getSenderAvatar(),
	      className: 'user-picture',
	      alt: message.nickname()
	    }, void 0));
	  }
	
	});
	
	exports.default = MessageListItem;

/***/ }

})
//# sourceMappingURL=0.e9d15885c89647c245d7.hot-update.js.map