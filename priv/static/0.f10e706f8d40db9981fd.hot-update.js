webpackHotUpdate(0,{

/***/ 992:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jquery = __webpack_require__(980);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _reactDom = __webpack_require__(158);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _chatActions = __webpack_require__(990);
	
	var GlobalActions = _interopRequireWildcard(_chatActions);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2016 Sparkplug, Inc. All Rights Reserved.
	
	var SuggestionList = function (_React$Component) {
	    _inherits(SuggestionList, _React$Component);
	
	    function SuggestionList(props) {
	        _classCallCheck(this, SuggestionList);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SuggestionList).call(this, props));
	
	        _this.getContent = _this.getContent.bind(_this);
	
	        _this.handleItemClick = _this.handleItemClick.bind(_this);
	        _this.handleSuggestionsChanged = _this.handleSuggestionsChanged.bind(_this);
	
	        _this.scrollToItem = _this.scrollToItem.bind(_this);
	
	        _this.state = {
	            items: [],
	            terms: [],
	            components: [],
	            selection: ''
	        };
	        return _this;
	    }
	
	    _createClass(SuggestionList, [{
	        key: 'getContent',
	        value: function getContent() {
	            return (0, _jquery2.default)(_reactDom2.default.findDOMNode(this.refs.content));
	        }
	    }, {
	        key: 'handleItemClick',
	        value: function handleItemClick(term, e) {
	            GlobalActions.emitCompleteWordSuggestion(this.props.suggestionId, term);
	
	            e.preventDefault();
	        }
	    }, {
	        key: 'handleSuggestionsChanged',
	        value: function handleSuggestionsChanged() {
	            var _this2 = this;
	
	            var selection = null; // SuggestionStore.getSelection(this.props.suggestionId);
	
	            this.setState({
	                items: null, //SuggestionStore.getItems(this.props.suggestionId),
	                terms: null, //SuggestionStore.getTerms(this.props.suggestionId),
	                components: null, // SuggestionStore.getComponents(this.props.suggestionId),
	                selection: selection
	            });
	
	            if (selection) {
	                window.requestAnimationFrame(function () {
	                    return _this2.scrollToItem(_this2.state.selection);
	                });
	            }
	        }
	    }, {
	        key: 'scrollToItem',
	        value: function scrollToItem(term) {
	            var content = this.getContent();
	            var visibleContentHeight = content[0].clientHeight;
	            var actualContentHeight = content[0].scrollHeight;
	
	            if (visibleContentHeight < actualContentHeight) {
	                var contentTop = content.scrollTop();
	                var contentTopPadding = parseInt(content.css('padding-top'), 10);
	                var contentBottomPadding = parseInt(content.css('padding-top'), 10);
	
	                var item = (0, _jquery2.default)(_reactDom2.default.findDOMNode(this.refs[term]));
	                var itemTop = item[0].offsetTop - parseInt(item.css('margin-top'), 10);
	                var itemBottomMargin = parseInt(item.css('margin-bottom'), 10) + parseInt(item.css('padding-bottom'), 10);
	                var itemBottom = item[0].offsetTop + item.height() + itemBottomMargin;
	
	                if (itemTop - contentTopPadding < contentTop) {
	                    // the item is off the top of the visible space
	                    content.scrollTop(itemTop - contentTopPadding);
	                } else if (itemBottom + contentTopPadding + contentBottomPadding > contentTop + visibleContentHeight) {
	                    // the item has gone off the bottom of the visible space
	                    content.scrollTop(itemBottom - visibleContentHeight + contentTopPadding + contentBottomPadding);
	                }
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            if (this.state.items.length === 0) {
	                return null;
	            }
	
	            var items = [];
	            for (var i = 0; i < this.state.items.length; i++) {
	                var item = this.state.items[i];
	                var term = this.state.terms[i];
	                var isSelection = term === this.state.selection;
	
	                // ReactComponent names need to be upper case when used in JSX
	                var Component = this.state.components[i];
	
	                items.push(_react2.default.createElement(Component, {
	                    key: term,
	                    ref: term,
	                    item: item,
	                    term: term,
	                    isSelection: isSelection,
	                    onClick: this.handleItemClick.bind(this, term)
	                }));
	            }
	
	            return _jsx('div', {
	                className: 'suggestion-list suggestion-list--top'
	            }, void 0, _react2.default.createElement(
	                'div',
	                {
	                    ref: 'content',
	                    className: 'suggestion-list__content suggestion-list__content--top'
	                },
	                items
	            ));
	        }
	    }]);
	
	    return SuggestionList;
	}(_react2.default.Component);
	
	exports.default = SuggestionList;

/***/ }

})
//# sourceMappingURL=0.f10e706f8d40db9981fd.hot-update.js.map