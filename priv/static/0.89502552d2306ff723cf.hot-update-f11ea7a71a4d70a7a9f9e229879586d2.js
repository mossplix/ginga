webpackHotUpdate(0,{

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keyMirror;
	
	var _simpleAssign = __webpack_require__(266);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _chat_constants = __webpack_require__(969);
	
	var _chat_constants2 = _interopRequireDefault(_chat_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var keyMirror = __webpack_require__(267);
	
	var Other = keyMirror((_keyMirror = {
	  CLICK_THREAD: null,
	
	  CREATE_MESSAGE: null,
	  RECEIVE_RAW_CREATED_MESSAGE: null,
	  RECEIVE_RAW_MESSAGES: null,
	  APP_CONNECTED: null,
	  LOAD_LABELS: null,
	  TASK_CREATE: null,
	  TASK_COMPLETE: null,
	  TASK_DESTROY: null,
	  TASK_DESTROY_COMPLETED: null,
	  TASK_TOGGLE_COMPLETE_ALL: null,
	  TASK_UNDO_COMPLETE: null,
	  TASK_UPDATE_TEXT: null,
	  CLIENT_ON_CONNECT: null,
	  CLIENT_ON_AUTHFAILED: null,
	  CLIENT_ON_ALL: null,
	  CLIENT_ON_CREDENTIALS_UPDATE: null,
	  CLIENT_ON_DISCONNECTED: null,
	  CLIENT_ON_STREAM_MANAGEMENT_RESUMED: null,
	  CLIENT_ON_SESSION_STARTED: null,
	  CLIENT_ON_ROSTER_UPDATE: null,
	  CLIENT_ON_SUBSCRIBE: null,
	  CLIENT_ON_AVAILABLE: null,
	  CLIENT_ON_UNAVALILABLE: null,
	  CLIENT_ON_AVATAR: null,
	  CLIENT_ON_CHAT_STATE: null,
	  CLIENT_ON_CHAT: null,
	  CLIENT_ON_GROUPCHAT: null,
	  CLIENT_ON_GROUPCHAT_SUBJECT: null,
	  CLIENT_ON_REPLACE: null,
	  CLIENT_ON_RECEIPT: null,
	  CLIENT_ON_CARBON_RECEIVED: null,
	  CLIENT_ON_CARBON_SENT: null,
	  CLIENT_ON_DISCO_CAPS: null,
	  CLIENT_ON_STANZA_ACKED: null,
	  CLIENT_ON_JINGLE_INCOMING: null,
	  CLIENT_ON_JINGLE_OUTGOING: null,
	  CLIENT_ON_JINGLE_TERMINATED: null,
	  CLIENT_ON_JINGLE_ACCEPTED: null,
	  CLIENT_ON_JINGLE_LOCALSTREAM_ADDED: null,
	  CLIENT_ON_JINGLE_LOCALSTREAM_REMOVED: null,
	  CLIENT_ON_JINGLE_REMOTESTREAM_ADDED: null,
	  CLIENT_ON_JINGLE_REMOTESTREAM_REMOVED: null,
	  CLIENT_ON_JINGLE_RINGING: null,
	
	  USER_CHANGE_JID: null,
	  USER_CHANGE_ACTIVE: null,
	  USER_CHANGE_ROSTER_VERSION: null,
	  USER_CHANGE_AVATARID: null,
	  CLICK_CHANNEL: null,
	  RECEIVE_RAW_MUCS: null,
	  RECEIVE_RAW_CREATED_MUC: null,
	
	  ROOM_INVITE_USERS: null,
	  CLOSE_ROOM: null,
	  SEARCH_HISTORY: null,
	  RECEIVE_RAW_CONTACTS: null,
	  CREATE_RESOURCE: null,
	  APP_LOADED: null,
	  SEARCH: null,
	  LOAD_MESSAGES_SUCCESS: null,
	  MESSAGES_UNSTAR_REQUEST: null,
	  MESSAGES_ARCHIVE_REQUEST: null,
	  REFRESH: null,
	  LOAD_MESSAGES: null,
	  LOAD_ROOMS: null,
	  LOAD_CONTACTS: null,
	  LOAD_MUCS: null,
	  PRETEXT_CHANGED: null,
	  SUGGESTIONS_CHANGED: null,
	  COMPLETE_WORD: null,
	
	  RECEIVED_ERROR: null
	
	}, _defineProperty(_keyMirror, 'CLICK_CHANNEL', null), _defineProperty(_keyMirror, 'CREATE_CHANNEL', null), _defineProperty(_keyMirror, 'LEAVE_CHANNEL', null), _defineProperty(_keyMirror, 'CREATE_POST', null), _defineProperty(_keyMirror, 'POST_DELETED', null), _defineProperty(_keyMirror, 'REMOVE_POST', null), _defineProperty(_keyMirror, 'RECEIVED_CHANNELS', null), _defineProperty(_keyMirror, 'RECEIVED_CHANNEL', null), _defineProperty(_keyMirror, 'RECEIVED_MORE_CHANNELS', null), _defineProperty(_keyMirror, 'RECEIVED_CHANNEL_EXTRA_INFO', null), _defineProperty(_keyMirror, 'FOCUS_POST', null), _defineProperty(_keyMirror, 'RECEIVED_POSTS', null), _defineProperty(_keyMirror, 'RECEIVED_FOCUSED_POST', null), _defineProperty(_keyMirror, 'RECEIVED_POST', null), _defineProperty(_keyMirror, 'RECEIVED_EDIT_POST', null), _defineProperty(_keyMirror, 'RECEIVED_SEARCH', null), _defineProperty(_keyMirror, 'RECEIVED_SEARCH_TERM', null), _defineProperty(_keyMirror, 'RECEIVED_POST_SELECTED', null), _defineProperty(_keyMirror, 'RECEIVED_MENTION_DATA', null), _defineProperty(_keyMirror, 'RECEIVED_ADD_MENTION', null), _defineProperty(_keyMirror, 'RECEIVED_PROFILES', null), _defineProperty(_keyMirror, 'RECEIVED_ME', null), _defineProperty(_keyMirror, 'RECEIVED_SESSIONS', null), _defineProperty(_keyMirror, 'RECEIVED_AUDITS', null), _defineProperty(_keyMirror, 'RECEIVED_TEAMS', null), _defineProperty(_keyMirror, 'RECEIVED_STATUSES', null), _defineProperty(_keyMirror, 'RECEIVED_PREFERENCE', null), _defineProperty(_keyMirror, 'RECEIVED_PREFERENCES', null), _defineProperty(_keyMirror, 'RECEIVED_FILE_INFO', null), _defineProperty(_keyMirror, 'RECEIVED_ANALYTICS', null), _defineProperty(_keyMirror, 'RECEIVED_INCOMING_WEBHOOKS', null), _defineProperty(_keyMirror, 'RECEIVED_INCOMING_WEBHOOK', null), _defineProperty(_keyMirror, 'REMOVED_INCOMING_WEBHOOK', null), _defineProperty(_keyMirror, 'RECEIVED_OUTGOING_WEBHOOKS', null), _defineProperty(_keyMirror, 'RECEIVED_OUTGOING_WEBHOOK', null), _defineProperty(_keyMirror, 'UPDATED_OUTGOING_WEBHOOK', null), _defineProperty(_keyMirror, 'REMOVED_OUTGOING_WEBHOOK', null), _defineProperty(_keyMirror, 'RECEIVED_MSG', null), _defineProperty(_keyMirror, 'RECEIVED_MY_TEAM', null), _defineProperty(_keyMirror, 'RECEIVED_CONFIG', null), _defineProperty(_keyMirror, 'RECEIVED_LOGS', null), _defineProperty(_keyMirror, 'RECEIVED_SERVER_AUDITS', null), _defineProperty(_keyMirror, 'RECEIVED_SERVER_COMPLIANCE_REPORTS', null), _defineProperty(_keyMirror, 'RECEIVED_ALL_TEAMS', null), _defineProperty(_keyMirror, 'RECEIVED_LOCALE', null), _defineProperty(_keyMirror, 'SHOW_SEARCH', null), _defineProperty(_keyMirror, 'USER_TYPING', null), _defineProperty(_keyMirror, 'TOGGLE_IMPORT_THEME_MODAL', null), _defineProperty(_keyMirror, 'TOGGLE_INVITE_MEMBER_MODAL', null), _defineProperty(_keyMirror, 'TOGGLE_DELETE_POST_MODAL', null), _defineProperty(_keyMirror, 'TOGGLE_GET_POST_LINK_MODAL', null), _defineProperty(_keyMirror, 'TOGGLE_GET_TEAM_INVITE_LINK_MODAL', null), _defineProperty(_keyMirror, 'TOGGLE_REGISTER_APP_MODAL', null), _defineProperty(_keyMirror, 'SUGGESTION_PRETEXT_CHANGED', null), _defineProperty(_keyMirror, 'SUGGESTION_RECEIVED_SUGGESTIONS', null), _defineProperty(_keyMirror, 'SUGGESTION_CLEAR_SUGGESTIONS', null), _defineProperty(_keyMirror, 'SUGGESTION_COMPLETE_WORD', null), _defineProperty(_keyMirror, 'SUGGESTION_SELECT_NEXT', null), _defineProperty(_keyMirror, 'SUGGESTION_SELECT_PREVIOUS', null), _defineProperty(_keyMirror, 'REGISTER_SUGGESTION_BOX', null), _defineProperty(_keyMirror, 'ADD_COMPLETE_WORD', null), _defineProperty(_keyMirror, 'UNREGISTER_SUGGESTION_BOX', null), _keyMirror));
	
	var Constants = (0, _simpleAssign2.default)({}, {
	  USER_SIGNED_IN: 'USER_SIGNED_IN',
	  CURRENT_USER: 'CURRENT_USER',
	  USER_SIGNED_OUT: 'USER_SIGNED_OUT',
	  SESSIONS_ERROR: 'SESSIONS_ERROR',
	  REGISTRATIONS_ERROR: 'REGISTRATIONS_ERROR',
	
	  BOARDS_FETCHING: 'BOARDS_FETCHING',
	  BOARDS_SHOW_FORM: 'BOARDS_SHOW_FORM',
	  BOARDS_RECEIVED: 'BOARDS_RECEIVED',
	  BOARDS_SET_CURRENT_BOARD: 'BOARDS_SET_CURRENT_BOARD',
	  BOARDS_CREATE_ERROR: 'BOARDS_CREATE_ERROR',
	  BOARDS_RESET: 'BOARDS_RESET',
	  BOARDS_FULL_RESET: 'BOARDS_FULL_RESET',
	  BOARDS_ADDED: 'BOARDS_ADDED',
	  BOARDS_NEW_BOARD_CREATED: 'BOARDS_NEW_BOARD_CREATED',
	
	  CURRENT_BOARD_FETHING: 'CURRENT_BOARD_FETHING',
	  CURRENT_BOARD_CONNECTED_USERS: 'CURRENT_BOARD_CONNECTED_USERS',
	  CURRENT_BOARD_CONNECTED_TO_CHANNEL: 'CURRENT_BOARD_CONNECTED_TO_CHANNEL',
	  CURRENT_BOARD_RESET: 'CURRENT_BOARD_RESET',
	  CURRENT_BOARD_LIST_CREATED: 'CURRENT_BOARD_LIST_CREATED',
	  CURRENT_BOARD_CARD_CREATED: 'CURRENT_BOARD_CARD_CREATED',
	  CURRENT_BOARD_SHOW_FORM: 'CURRENT_BOARD_SHOW_FORM',
	  CURRENT_BOARD_SHOW_MEMBERS_FORM: 'CURRENT_BOARD_SHOW_MEMBERS_FORM',
	  CURRENT_BOARD_MEMBER_ADDED: 'CURRENT_BOARD_MEMBER_ADDED',
	  CURRENT_BOARD_ADD_MEMBER_ERROR: 'CURRENT_BOARD_ADD_MEMBER_ERROR',
	  CURRENT_BOARD_EDIT_LIST: 'CURRENT_BOARD_EDIT_LIST',
	  CURRENT_BOARD_SHOW_CARD: 'CURRENT_BOARD_SHOW_CARD',
	  CURRENT_BOARD_EDIT_CARD: 'CURRENT_BOARD_EDIT_CARD',
	  CURRENT_BOARD_SHOW_CARD_FORM_FOR_LIST: 'CURRENT_BOARD_SHOW_CARD_FORM_FOR_LIST',
	
	  LISTS_SHOW_FORM: 'LISTS_SHOW_FORM',
	
	  CARD_MOVE: 'CARD_MOVE',
	  CURRENT_CARD_FETHING: 'CURRENT_CARD_FETHING',
	  CURRENT_CARD_RESET: 'CURRENT_CARD_RESET',
	  CURRENT_CARD_SET: 'CURRENT_CARD_SET',
	  CURRENT_CARD_EDIT: 'CURRENT_CARD_EDIT',
	  CURRENT_CARD_SHOW_MEMBERS_SELECTOR: 'CURRENT_CARD_SHOW_MEMBERS_SELECTOR',
	  CURRENT_CARD_SHOW_TAGS_SELECTOR: 'CURRENT_CARD_SHOW_TAGS_SELECTOR',
	
	  HEADER_SHOW_BOARDS: 'HEADER_SHOW_BOARDS',
	  ADD_TASK: 'ADD_TASK',
	  DELETE_TASK: 'DELETE_TASK',
	  EDIT_TASK: 'EDIT_TASK',
	  COMPLETE_TASK: 'COMPLETE_TASK',
	  COMPLETE_ALL: 'COMPLETE_ALL',
	  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
	  REQUEST_STARTED: 'REQUEST_STARTED',
	  REQUEST_ALL_STOPPED: 'REQUEST_ALL_STOPPED'
	
	}, Other);
	
	exports.default = Constants;

/***/ },

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
	
	var _constants = __webpack_require__(265);
	
	var _constants2 = _interopRequireDefault(_constants);
	
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
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2016 Sparkplug, Inc. All Rights Reserved.
	
	var KeyCodes = _constants2.default.KeyCodes;
	
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
	
	            store.dispatch({
	                type: _constants2.default.REGISTER_SUGGESTION_BOX,
	                id: this.suggestionId
	
	            });
	
	            (0, _jquery2.default)(document).on('click', this.handleDocumentClick);
	
	            //this.handleCompleteWord();
	
	            // SuggestionStore.addCompleteWordListener(this.suggestionId, this.handleCompleteWord);
	            //SuggestionStore.addPretextChangedListener(this.suggestionId, this.handlePretextChanged);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            //SuggestionStore.removeCompleteWordListener(this.suggestionId, this.handleCompleteWord);
	            //SuggestionStore.removePretextChangedListener(this.suggestionId, this.handlePretextChanged);
	
	            //SuggestionStore.unregisterSuggestionBox(this.suggestionId);
	            store.dispatch({
	                type: _constants2.default.UNREGISTER_SUGGESTION_BOX,
	                id: this.suggestionId
	
	            });
	
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
	                    type: _constants2.default.SUGGESTION_CLEAR_SUGGESTIONS,
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
	
	            store.dispatch({
	                type: _constants2.default.SUGGESTION_PRETEXT_CHANGED,
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
	        value: function handleCompleteWord() {
	
	            var term = this.props.currentSuggestion.term;
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
	                        type: _constants2.default.SUGGESTION_SELECT_PREVIOUS,
	                        id: this.suggestionId
	
	                    });
	                    e.preventDefault();
	                } else if (e.which === KeyCodes.DOWN) {
	                    store.dispatch({
	                        type: _constants2.default.SUGGESTION_SELECT_NEXT,
	                        id: this.suggestionId
	
	                    });
	                    e.preventDefault();
	                } else if (e.which === KeyCodes.ENTER || e.which === KeyCodes.TAB) {
	
	                    store.dispatch({
	                        type: _constants2.default.SUGGESTION_COMPLETE_WORD,
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
//# sourceMappingURL=0.89502552d2306ff723cf.hot-update.js.map