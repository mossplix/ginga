webpackHotUpdate(0,{

/***/ 992:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _simpleAssign = __webpack_require__(266);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _jquery = __webpack_require__(960);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _reactDom = __webpack_require__(158);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _chat_constants = __webpack_require__(969);
	
	var _chat_constants2 = _interopRequireDefault(_chat_constants);
	
	var _chatActions = __webpack_require__(991);
	
	var GlobalActions = _interopRequireWildcard(_chatActions);
	
	var _general = __webpack_require__(962);
	
	var Utils = _interopRequireWildcard(_general);
	
	var _reactTextareaAutosize = __webpack_require__(993);
	
	var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
	// See License.txt for license information.
	
	var KeyCodes = _chat_constants2.default.KeyCodes;
	
	var SuggestionBox = function (_React$Component) {
	    _inherits(SuggestionBox, _React$Component);
	
	    function SuggestionBox(props) {
	        _classCallCheck(this, SuggestionBox);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SuggestionBox).call(this, props));
	
	        _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
	
	        _this.handleChange = _this.handleChange.bind(_this);
	        _this.handleCompleteWord = _this.handleCompleteWord.bind(_this);
	        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
	        _this.handlePretextChanged = _this.handlePretextChanged.bind(_this);
	
	        _this.suggestionId = Utils.generateId();
	        return _this;
	    }
	
	    _createClass(SuggestionBox, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //SuggestionStore.registerSuggestionBox(this.suggestionId);
	            (0, _jquery2.default)(document).on('click', this.handleDocumentClick);
	
	            // SuggestionStore.addCompleteWordListener(this.suggestionId, this.handleCompleteWord);
	            //SuggestionStore.addPretextChangedListener(this.suggestionId, this.handlePretextChanged);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            //SuggestionStore.removeCompleteWordListener(this.suggestionId, this.handleCompleteWord);
	            //SuggestionStore.removePretextChangedListener(this.suggestionId, this.handlePretextChanged);
	
	            //SuggestionStore.unregisterSuggestionBox(this.suggestionId);
	            (0, _jquery2.default)(document).off('click', this.handleDocumentClick);
	        }
	    }, {
	        key: 'getTextbox',
	        value: function getTextbox() {
	            // this is to support old code that looks at the input/textarea DOM nodes
	            var textbox = this.refs.textbox;
	
	            if (!(textbox instanceof HTMLElement)) {
	                textbox = _reactDom2.default.findDOMNode(textbox);
	            }
	
	            return textbox;
	        }
	    }, {
	        key: 'handleDocumentClick',
	        value: function handleDocumentClick(e) {
	            var container = (0, _jquery2.default)(_reactDom2.default.findDOMNode(this));
	            if (!(container.is(e.target) || container.has(e.target).length > 0)) {
	                // we can't just use blur for this because it fires and hides the children before
	                // their click handlers can be called
	
	                store.dispatch({
	                    type: ActionTypes.SUGGESTION_CLEAR_SUGGESTIONS,
	                    id: this.suggestionId
	
	                });
	            }
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var textbox = _reactDom2.default.findDOMNode(this.refs.textbox);
	            var caret = Utils.getCaretPosition(textbox);
	            var pretext = textbox.value.substring(0, caret);
	
	            //GlobalActions.emitSuggestionPretextChanged(this.suggestionId, pretext);
	            store.dispatch({
	                type: ActionTypes.SUGGESTION_PRETEXT_CHANGED,
	                id: this.suggestionId,
	                pretext: pretext
	
	            });
	
	            if (this.props.onUserInput) {
	                this.props.onUserInput(textbox.value);
	            }
	
	            if (this.props.onChange) {
	                this.props.onChange(e);
	            }
	        }
	    }, {
	        key: 'handleCompleteWord',
	        value: function handleCompleteWord(term) {
	            var textbox = _reactDom2.default.findDOMNode(this.refs.textbox);
	            var caret = Utils.getCaretPosition(textbox);
	
	            var text = this.props.value;
	            var prefix = ""; //text.substring(0, caret - SuggestionStore.getMatchedPretext(this.suggestionId).length);
	            var suffix = text.substring(caret);
	
	            if (this.props.onUserInput) {
	                this.props.onUserInput(prefix + term + ' ' + suffix);
	            }
	
	            // set the caret position after the next rendering
	            window.requestAnimationFrame(function () {
	                Utils.setCaretPosition(textbox, prefix.length + term.length + 1);
	            });
	        }
	    }, {
	        key: 'handleKeyDown',
	        value: function handleKeyDown(e) {
	            if (SuggestionStore.hasSuggestions(this.suggestionId)) {
	                if (e.which === KeyCodes.UP) {
	                    store.dispatch({
	                        type: ActionTypes.SUGGESTION_SELECT_PREVIOUS,
	                        id: this.suggestionId
	
	                    });
	                    e.preventDefault();
	                } else if (e.which === KeyCodes.DOWN) {
	                    store.dispatch({
	                        type: ActionTypes.SUGGESTION_SELECT_NEXT,
	                        id: this.suggestionId
	
	                    });
	                    e.preventDefault();
	                } else if (e.which === KeyCodes.ENTER || e.which === KeyCodes.TAB) {
	
	                    store.dispatch({
	                        type: ActionTypes.SUGGESTION_COMPLETE_WORD,
	                        id: this.suggestionId
	
	                    });
	                    e.preventDefault();
	                } else if (this.props.onKeyDown) {
	                    this.props.onKeyDown(e);
	                }
	            } else if (this.props.onKeyDown) {
	                this.props.onKeyDown(e);
	            }
	        }
	    }, {
	        key: 'handlePretextChanged',
	        value: function handlePretextChanged(pretext) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this.props.providers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var provider = _step.value;
	
	                    provider.handlePretextChanged(this.suggestionId, pretext);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var newProps = (0, _simpleAssign2.default)({}, this.props, {
	                onChange: this.handleChange,
	                onKeyDown: this.handleKeyDown
	            });
	
	            var textbox = null;
	            if (this.props.type === 'input') {
	                textbox = _react2.default.createElement('input', _extends({
	                    ref: 'textbox',
	                    type: 'text'
	                }, newProps));
	            } else if (this.props.type === 'search') {
	                textbox = _react2.default.createElement('input', _extends({
	                    ref: 'textbox',
	                    type: 'search'
	                }, newProps));
	            } else if (this.props.type === 'textarea') {
	                textbox = _react2.default.createElement(_reactTextareaAutosize2.default, _extends({
	                    id: this.suggestionId,
	                    ref: 'textbox'
	                }, newProps));
	            }
	
	            var SuggestionListComponent = this.props.listComponent;
	
	            return _jsx('div', {}, void 0, textbox, _jsx(SuggestionListComponent, {
	                suggestionId: this.suggestionId
	            }));
	        }
	    }]);
	
	    return SuggestionBox;
	}(_react2.default.Component);
	
	exports.default = SuggestionBox;
	
	
	SuggestionBox.defaultProps = {
	    type: 'input'
	};

/***/ }

})
//# sourceMappingURL=0.04d0b4061afb4c32fafd.hot-update.js.map