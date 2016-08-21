webpackHotUpdate(0,{

/***/ 939:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _reactRedux = __webpack_require__(220);
	
	var React = __webpack_require__(2);
	var cx = __webpack_require__(933);
	
	
	var Router = __webpack_require__(159);
	
	var Link = Router.Link;
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var State = Router.State;
	var Redirect = Router.Redirect;
	
	var ReactPropTypes = React.PropTypes;
	
	var ChannelListItem = React.createClass({
	    displayName: 'ChannelListItem',
	
	
	    render: function render() {
	        var _this = this;
	
	        var channel = this.props.channel;
	        var chat = this.props.currentChat;
	        return _jsx('div', {}, void 0, _jsx(Link, {
	            to: '/chat/channels/' + channel.jid,
	            onClick: function onClick() {
	                return _this.props.actions.clickChannel(channel.jid);
	            },
	            params: { id: channel.jid }
	        }, "link_" + channel.jid, _jsx('li', {
	            className: cx({
	                'channels has-action-left has-action-right': true,
	                'active': channel.jid === this.props.currentChat.id
	
	            })
	        }, void 0, _jsx('div', {
	            className: 'list-content'
	        }, void 0, _jsx('span', {
	            className: 'title'
	        }, void 0, channel.name), _jsx('span', {
	            className: 'caption'
	        }, void 0, channel.unread)))));
	    }
	
	});
	
	exports.default = ChannelListItem;

/***/ }

})
//# sourceMappingURL=0.d04bdc10c3b72600b731.hot-update.js.map