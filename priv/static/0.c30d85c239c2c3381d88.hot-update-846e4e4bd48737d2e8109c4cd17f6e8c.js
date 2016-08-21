webpackHotUpdate(0,{

/***/ 1285:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _simpleAssign = __webpack_require__(555);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _jquery = __webpack_require__(1269);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _reactDom = __webpack_require__(158);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _constants = __webpack_require__(554);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _general = __webpack_require__(1271);
	
	var Utils = _interopRequireWildcard(_general);
	
	var _reactTextareaAutosize = __webpack_require__(1286);
	
	var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);
	
	var _chatActions = __webpack_require__(1279);
	
	var ChatActions = _interopRequireWildcard(_chatActions);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2016 Sparkplug, Inc. All Rights Reserved.
	
	var KeyCodes = _constants2.default.KeyCodes;
	
	var SuggestionBox = function (_React$Component) {
	    _inherits(SuggestionBox, _React$Component);
	
	    function SuggestionBox(props) {
	        _classCallCheck(this, SuggestionBox);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SuggestionBox).call(this, props));
	
	        _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
	
	        _this.handleChange = _this.handleChange.bind(_this);
	        //this.handleCompleteWord = this.handleCompleteWord.bind(this);
	        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
	        // this.handlePretextChanged = this.handlePretextChanged.bind(this);
	
	        _this.suggestionId = Utils.generateId();
	        _this.state = { term: '', pretext: '' };
	        return _this;
	    }
	
	    _createClass(SuggestionBox, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _props = this.props;
	            var actions = _props.actions;
	            var dispatch = _props.dispatch;
	
	
	            dispatch(actions.registerSuggestions(this.suggestionId));
	
	            (0, _jquery2.default)(document).on('click', this.handleDocumentClick);
	
	            // this.handleCompleteWord(this.props);
	
	            // SuggestionStore.addCompleteWordListener(this.suggestionId, this.handleCompleteWord);
	            //SuggestionStore.addPretextChangedListener(this.suggestionId, this.handlePretextChanged);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            //SuggestionStore.removeCompleteWordListener(this.suggestionId, this.handleCompleteWord);
	            //SuggestionStore.removePretextChangedListener(this.suggestionId, this.handlePretextChanged);
	
	            var _props2 = this.props;
	            var actions = _props2.actions;
	            var dispatch = _props2.dispatch;
	
	
	            dispatch(actions.unregisterSuggestions(this.suggestionId));
	
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
	
	                var _props3 = this.props;
	                var actions = _props3.actions;
	                var dispatch = _props3.dispatch;
	
	
	                dispatch(actions.clearSuggestions(this.suggestionId));
	            }
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var textbox = _reactDom2.default.findDOMNode(this.refs.textbox);
	            var caret = Utils.getCaretPosition(textbox);
	            var pretext = textbox.value.substring(0, caret);
	
	            var _props4 = this.props;
	            var actions = _props4.actions;
	            var dispatch = _props4.dispatch;
	
	
	            dispatch(actions.suggestionPretextChanged(this.suggestionId, pretext));
	
	            if (this.props.onUserInput) {
	                this.props.onUserInput(textbox.value);
	            }
	
	            if (this.props.onChange) {
	                this.props.onChange(e);
	            }
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	
	            if (this.state.term !== nextProps.selectedSuggestion.term) {
	                this.handleCompleteWord(nextProps);
	                this.setState({
	                    term: nextProps.selectedSuggestion.term
	                });
	            }
	
	            if (this.state.pretext !== nextProps.selectedSuggestion.pretext) {
	                this.handlePretextChanged(nextProps.selectedSuggestion.pretext);
	                this.setState({
	                    pretext: nextProps.selectedSuggestion.pretext
	                });
	            }
	        }
	    }, {
	        key: 'handleCompleteWord',
	        value: function handleCompleteWord(props) {
	
	            var term = props.selectedSuggestion.term || "";
	            var textbox = _reactDom2.default.findDOMNode(this.refs.textbox);
	            var caret = Utils.getCaretPosition(textbox);
	            var pretext = props.selectedSuggestion.matchedPretext || [];
	
	            var text = this.props.value;
	            var prefix = text.substring(0, caret - pretext.length);
	            var suffix = text.substring(caret);
	
	            if (this.props.onUserInput) {
	                this.props.onUserInput(prefix + term + ' ' + suffix);
	            }
	
	            // set the caret position after the next rendering
	            window.requestAnimationFrame(function () {
	                Utils.setCaretPosition(textbox, prefix.length + term.length + 1);
	            });
	            store.dispatch(ChatActions.clearSelection(this.suggestionId));
	            store.dispatch(ChatActions.clearSuggestions(this.suggestionId));
	        }
	    }, {
	        key: 'handleKeyDown',
	        value: function handleKeyDown(e) {
	            var _props5 = this.props;
	            var actions = _props5.actions;
	            var dispatch = _props5.dispatch;
	
	            if (this.props.selectedSuggestion.hasSuggestions) {
	                if (e.which === KeyCodes.UP) {
	
	                    dispatch(actions.selectPreviousSuggestion(this.suggestionId));
	                    e.preventDefault();
	                } else if (e.which === KeyCodes.DOWN) {
	                    dispatch(actions.selectNextSuggestion(this.suggestionId));
	                    e.preventDefault();
	                } else if (e.which === KeyCodes.ENTER || e.which === KeyCodes.TAB) {
	
	                    dispatch(actions.completeWordSuggestion(this.suggestionId));
	
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
	                suggestionId: this.suggestionId,
	                actions: this.props.actions,
	                selectedSuggestion: this.props.selectedSuggestion,
	                dispatch: this.props.dispatch,
	                currentSuggestion: this.props.currentSuggestion
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
//# sourceMappingURL=0.c30d85c239c2c3381d88.hot-update.js.map