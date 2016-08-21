webpackHotUpdate(0,{

/***/ 957:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _MessageSection = __webpack_require__(958);
	
	var _MessageSection2 = _interopRequireDefault(_MessageSection);
	
	var _ThreadSection = __webpack_require__(1410);
	
	var _ThreadSection2 = _interopRequireDefault(_ThreadSection);
	
	var _ChannelSection = __webpack_require__(1589);
	
	var _ChannelSection2 = _interopRequireDefault(_ChannelSection);
	
	var _MessageComposer = __webpack_require__(959);
	
	var _MessageComposer2 = _interopRequireDefault(_MessageComposer);
	
	var _chatActions = __webpack_require__(991);
	
	var ChatActions = _interopRequireWildcard(_chatActions);
	
	var _redux = __webpack_require__(248);
	
	var _reactRedux = __webpack_require__(242);
	
	var _selectors = __webpack_require__(1595);
	
	var _paper = __webpack_require__(1598);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var React = __webpack_require__(2);
	
	
	var ChatApp = React.createClass({
	  displayName: 'ChatApp',
	
	
	  contextTypes: {
	    router: React.PropTypes.object.isRequired
	  },
	  handleUpdateSelectedIndex: function handleUpdateSelectedIndex(event, index) {
	    this.setState({
	      selectedIndex: index
	    });
	  },
	
	
	  render: function render() {
	    var _props = this.props;
	    var messages = _props.messages;
	    var actions = _props.actions;
	    var channels = _props.channels;
	    var threads = _props.threads;
	    var currentChat = _props.currentChat;
	    var dispatch = _props.dispatch;
	    var threadMessages = _props.threadMessages;
	    var location = _props.location;
	    var currentSuggestion = _props.currentSuggestion;
	    var selectedSuggestion = _props.selectedSuggestion;
	
	    return _jsx('div', {
	      className: 'layer-container'
	    }, void 0, _jsx('div', {
	      className: ' fade in active',
	      id: 'messages'
	    }, void 0, _jsx('div', {
	      className: 'col-md-4'
	    }, void 0, _jsx(_paper2.default, {
	      zDepth: 2
	    }, void 0, _jsx(_ChannelSection2.default, {
	      location: location,
	      actions: actions,
	      channels: channels,
	      currentChat: currentChat,
	      dispatch: dispatch
	    }), _jsx(_ThreadSection2.default, {
	      location: location,
	      actions: actions,
	      threads: threads,
	      currentChat: currentChat,
	      dispatch: dispatch
	    }))), _jsx('div', {
	      className: 'col-md-8'
	    }, void 0, _jsx(_MessageSection2.default, {
	      actions: actions,
	      messages: messages,
	      currentChat: currentChat,
	      threadMessages: threadMessages
	    }), _jsx(_MessageComposer2.default, {
	      currentChat: currentChat,
	      actions: actions,
	      currentSuggestion: currentSuggestion,
	      selectedSuggestion: selectedSuggestion
	    }))));
	  }
	
	});
	
	function mapDispatchToProps(dispatch) {
	  return {
	    actions: (0, _redux.bindActionCreators)(ChatActions, dispatch),
	    dispatch: dispatch
	  };
	}
	
	var mapStateToProps = function mapStateToProps(state, ownProps) {
	  return {
	    messages: state.messages,
	    currentMessage: state.currentMessage,
	    channels: state.rooms,
	    contacts: state.contacts,
	    currentChat: state.currentChat,
	    threads: state.threads,
	    location: ownProps.location,
	    threadMessages: (0, _selectors.currentThreadMessagesSelector)(state),
	    selectedSuggestion: (0, _selectors.selectedSuggestionSelector)(state),
	    currentSuggestion: state.currentSuggestion
	
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ChatApp);

/***/ },

/***/ 959:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _React$createClass;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _simpleAssign = __webpack_require__(266);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _reactRedux = __webpack_require__(242);
	
	var _jquery = __webpack_require__(960);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _at_mention_provider = __webpack_require__(961);
	
	var _at_mention_provider2 = _interopRequireDefault(_at_mention_provider);
	
	var _command_provider = __webpack_require__(966);
	
	var _command_provider2 = _interopRequireDefault(_command_provider);
	
	var _emoticon_provider = __webpack_require__(967);
	
	var _emoticon_provider2 = _interopRequireDefault(_emoticon_provider);
	
	var _suggestion_list = __webpack_require__(990);
	
	var _suggestion_list2 = _interopRequireDefault(_suggestion_list);
	
	var _suggestion_box = __webpack_require__(992);
	
	var _suggestion_box2 = _interopRequireDefault(_suggestion_box);
	
	var _text_formatting = __webpack_require__(995);
	
	var TextFormatting = _interopRequireWildcard(_text_formatting);
	
	var _reactIntl = __webpack_require__(219);
	
	var _msg_typing = __webpack_require__(1148);
	
	var _msg_typing2 = _interopRequireDefault(_msg_typing);
	
	var _file_upload = __webpack_require__(1149);
	
	var _file_upload2 = _interopRequireDefault(_file_upload);
	
	var _file_preview = __webpack_require__(1151);
	
	var _file_preview2 = _interopRequireDefault(_file_preview);
	
	var _tutorial_tip = __webpack_require__(1153);
	
	var _tutorial_tip2 = _interopRequireDefault(_tutorial_tip);
	
	var _chatActions = __webpack_require__(991);
	
	var ChatActions = _interopRequireWildcard(_chatActions);
	
	var _general = __webpack_require__(962);
	
	var Utils = _interopRequireWildcard(_general);
	
	var _chat_constants = __webpack_require__(969);
	
	var _chat_constants2 = _interopRequireDefault(_chat_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var React = __webpack_require__(2);
	var ENTER_KEY_CODE = 13;
	
	var PreReleaseFeatures = _chat_constants2.default.PRE_RELEASE_FEATURES;
	
	var Preferences = _chat_constants2.default.Preferences;
	var TutorialSteps = _chat_constants2.default.TutorialSteps;
	var ActionTypes = _chat_constants2.default.ActionTypes;
	
	var KeyCodes = __webpack_require__(1405);
	
	var holders = (0, _reactIntl.defineMessages)({
	    comment: {
	        id: 'create_post.comment',
	        defaultMessage: 'Comment',
	        description: "comment"
	    },
	    post: {
	        id: 'create_post.post',
	        defaultMessage: 'Post',
	        description: "post"
	    },
	    write: {
	        id: 'create_post.write',
	        defaultMessage: 'Write a message...',
	        description: "message"
	    }
	});
	
	var MessageComposer = React.createClass((_React$createClass = {
	    displayName: 'MessageComposer',
	
	
	    getInitialState: function getInitialState() {
	        var _ref;
	
	        var draft = this.getCurrentDraft();
	        return _ref = { messageText: '',
	            channelId: this.props.currentChat.id
	        }, _defineProperty(_ref, 'messageText', draft.messageText), _defineProperty(_ref, 'uploadsInProgress', draft.uploadsInProgress), _defineProperty(_ref, 'previews', draft.previews), _defineProperty(_ref, 'submitting', false), _defineProperty(_ref, 'initialText', draft.messageText), _defineProperty(_ref, 'ctrlSend', false), _defineProperty(_ref, 'showTutorialTip', false), _defineProperty(_ref, 'showPostDeletedModal', false), _ref;
	    },
	
	    getFileCount: function getFileCount(channelId) {},
	    handleSubmit: function handleSubmit(e) {
	        e.preventDefault();
	
	        if (this.state.uploadsInProgress.length > 0 || this.state.submitting) {
	            return;
	        }
	
	        var post = {};
	        post.filenames = [];
	        post.message = this.state.messageText;
	
	        if (post.message.trim().length === 0 && this.state.previews.length === 0) {
	            return;
	        }
	
	        this.setState({ submitting: true, serverError: null });
	
	        if (post.message.indexOf('/') === 0) {
	            /*Client.executeCommand(
	                this.state.channelId,
	                post.message,
	                false,
	                (data) => {
	                    PostStore.storeDraft(this.state.channelId, null);
	                    this.setState({messageText: '', submitting: false, postError: null, previews: [], serverError: null});
	                     if (data.goto_location && data.goto_location.length > 0) {
	                        browserHistory.push(data.goto_location);
	                    }
	                },
	                (err) => {
	                    if (err.sendMessage) {
	                        this.sendMessage(post);
	                    } else {
	                        const state = {};
	                        state.serverError = err.message;
	                        state.submitting = false;
	                        this.setState(state);
	                    }
	                }
	            );*/
	        } else {
	                this.sendMessage(post);
	            }
	    },
	    sendMessage: function sendMessage(post) {
	        post.channel_id = this.state.channelId;
	        post.filenames = this.state.previews;
	
	        var time = Utils.getTimestamp();
	        var userId = store.getState.session.currentUser.id;
	        post.pending_post_id = userId + ':' + time;
	        post.user_id = userId;
	        post.create_at = time;
	        post.parent_id = this.state.parentId;
	
	        var channel = this.props.currentChat.channel;
	
	        //ChatActions.emitUserPostedEvent(post);
	
	        this.setState({ messageText: '', submitting: false, postError: null, previews: [], serverError: null });
	    },
	    postMsgKeyPress: function postMsgKeyPress(e) {
	        if (this.state.ctrlSend && e.ctrlKey || !this.state.ctrlSend) {
	            if (e.which === KeyCodes.ENTER && !e.shiftKey && !e.altKey) {
	                e.preventDefault();
	                ReactDOM.findDOMNode(this.refs.textbox).blur();
	                this.handleSubmit(e);
	            }
	        }
	
	        //ChatActions.emitLocalUserTypingEvent(this.state.channelId, '');
	    },
	    removePreview: function removePreview(id) {
	        var previews = (0, _simpleAssign2.default)([], this.state.previews);
	        var uploadsInProgress = this.state.uploadsInProgress;
	
	        // id can either be the path of an uploaded file or the client id of an in progress upload
	        var index = previews.indexOf(id);
	        if (index === -1) {
	            index = uploadsInProgress.indexOf(id);
	
	            if (index !== -1) {
	                uploadsInProgress.splice(index, 1);
	                this.refs.fileUpload.getWrappedInstance().cancelUpload(id);
	            }
	        } else {
	            previews.splice(index, 1);
	        }
	
	        var draft = {}; //PostStore.getCurrentDraft();
	        draft.previews = previews;
	        draft.uploadsInProgress = uploadsInProgress;
	        //PostStore.storeCurrentDraft(draft);
	
	        this.setState({ previews: previews, uploadsInProgress: uploadsInProgress });
	    },
	    handleUserInput: function handleUserInput(messageText) {
	        this.setState({ messageText: messageText });
	    },
	    handleUploadClick: function handleUploadClick() {
	        this.focusTextbox();
	    },
	    handleUploadStart: function handleUploadStart(clientIds, channelId) {
	        var draft = PostStore.getDraft(channelId);
	
	        draft.uploadsInProgress = draft.uploadsInProgress.concat(clientIds);
	        PostStore.storeDraft(channelId, draft);
	
	        this.setState({ uploadsInProgress: draft.uploadsInProgress });
	
	        // this is a bit redundant with the code that sets focus when the file input is clicked,
	        // but this also resets the focus after a drag and drop
	        this.focusTextbox();
	    },
	    handleFileUploadComplete: function handleFileUploadComplete(filenames, clientIds, channelId) {
	        var draft = PostStore.getDraft(channelId);
	
	        // remove each finished file from uploads
	        for (var i = 0; i < clientIds.length; i++) {
	            var index = draft.uploadsInProgress.indexOf(clientIds[i]);
	
	            if (index !== -1) {
	                draft.uploadsInProgress.splice(index, 1);
	            }
	        }
	
	        draft.previews = draft.previews.concat(filenames);
	        PostStore.storeDraft(channelId, draft);
	
	        this.setState({ uploadsInProgress: draft.uploadsInProgress, previews: draft.previews });
	    }
	}, _defineProperty(_React$createClass, 'handleUploadClick', function handleUploadClick() {
	    this.focusTextbox();
	}), _defineProperty(_React$createClass, 'handleUploadError', function handleUploadError(err, clientId) {
	    var message = err;
	    if (message && typeof message !== 'string') {
	        // err is an AppError from the server
	        message = err.message;
	    }
	
	    if (clientId !== -1) {
	        var draft = PostStore.getDraft(this.state.channelId);
	
	        var index = draft.uploadsInProgress.indexOf(clientId);
	        if (index !== -1) {
	            draft.uploadsInProgress.splice(index, 1);
	        }
	
	        PostStore.storeDraft(this.state.channelId, draft);
	
	        this.setState({ uploadsInProgress: draft.uploadsInProgress });
	    }
	
	    this.setState({ serverError: message });
	}), _defineProperty(_React$createClass, 'getCurrentDraft', function getCurrentDraft() {
	    var draft = null;
	    var safeDraft = { previews: [], messageText: '', uploadsInProgress: [] };
	
	    if (draft) {
	        if (draft.message) {
	            safeDraft.messageText = draft.message;
	        }
	        if (draft.previews) {
	            safeDraft.previews = draft.previews;
	        }
	        if (draft.uploadsInProgress) {
	            safeDraft.uploadsInProgress = draft.uploadsInProgress;
	        }
	    }
	
	    return safeDraft;
	}), _defineProperty(_React$createClass, 'handleKeyDown', function handleKeyDown(e) {
	    if (this.state.ctrlSend && e.keyCode === KeyCodes.ENTER && e.ctrlKey === true) {
	        this.postMsgKeyPress(e);
	        return;
	    }
	
	    if (e.keyCode === KeyCodes.UP && this.state.messageText === '') {
	        e.preventDefault();
	
	        var channelId = this.props.currentChat.id;
	        var lastPost = this.props.message.lastPost;
	        if (!lastPost) {
	            return;
	        }
	        var formatMessage = this.props.intl.formatMessage;
	
	        var type = lastPost.root_id && lastPost.root_id.length > 0 ? formatMessage(holders.comment) : formatMessage(holders.post);
	
	        store.dispatch({
	            type: ActionType.MESSAGE_CREATED_EDITED,
	            refocusId: '#post_textbox',
	            title: type,
	            message: lastPost.message,
	            postId: lastPost.id,
	            channelId: lastPost.channel_id
	        });
	    }
	}), _defineProperty(_React$createClass, 'createTutorialTip', function createTutorialTip() {
	    var screens = [];
	
	    screens.push(_jsx('div', {}, void 0, _jsx(_reactIntl.FormattedHTMLMessage, {
	        id: 'create_post.tutorialTip',
	        defaultMessage: '<h4>Sending Messages</h4><p>Type here to write a message and press <strong>Enter</strong> to post it.</p><p>Click the <strong>Attachment</strong> button to upload an image or a file.</p>'
	    })));
	
	    return _jsx(_tutorial_tip2.default, {
	        placement: 'top',
	        screens: screens,
	        overlayClass: 'tip-overlay--chat'
	    });
	}), _defineProperty(_React$createClass, 'render', function render() {
	    var _React$createElement;
	
	    var serverError = null;
	    if (this.state.serverError) {
	        serverError = _jsx('div', {
	            className: 'has-error'
	        }, void 0, _jsx('label', {
	            className: 'control-label'
	        }, void 0, this.state.serverError));
	    }
	
	    var postError = null;
	    if (this.state.postError) {
	        postError = _jsx('label', {
	            className: 'control-label'
	        }, void 0, this.state.postError);
	    }
	
	    var preview = null;
	    if (this.state.previews.length > 0 || this.state.uploadsInProgress.length > 0) {
	        preview = _jsx(_file_preview2.default, {
	            files: this.state.previews,
	            onRemove: this.removePreview,
	            uploadsInProgress: this.state.uploadsInProgress
	        });
	    }
	    var postFooterClassName = 'post-create-footer';
	    if (postError) {
	        postFooterClassName += ' has-error';
	    }
	
	    var hasText = this.state.messageText.length > 0;
	
	    var previewLink = null;
	    if (Utils.isFeatureEnabled(PreReleaseFeatures.MARKDOWN_PREVIEW)) {
	        previewLink = _jsx('a', {
	            onClick: this.showPreview,
	            className: 'textbox-preview-link'
	        }, void 0, this.state.preview ? _jsx(_reactIntl.FormattedMessage, {
	            id: 'textbox.edit',
	            defaultMessage: 'Edit message'
	        }) : _jsx(_reactIntl.FormattedMessage, {
	            id: 'textbox.preview',
	            defaultMessage: 'Preview'
	        }));
	    };
	    var helpText = _jsx('div', {
	        style: { visibility: hasText ? 'visible' : 'hidden', opacity: hasText ? '0.3' : '0' },
	        className: 'help__format-text'
	    }, void 0, _jsx('b', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: 'textbox.bold',
	        defaultMessage: '**bold**'
	    })), _jsx('i', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: 'textbox.italic',
	        defaultMessage: '_italic_'
	    })), _jsx('span', {}, void 0, '~~', _jsx('strike', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: 'textbox.strike',
	        defaultMessage: 'strike'
	    })), '~~ '), _jsx('code', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: 'textbox.inlinecode',
	        defaultMessage: '`inline code`'
	    })), _jsx('code', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: 'textbox.preformatted',
	        defaultMessage: '```preformatted```'
	    })), _jsx('span', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: 'textbox.quote',
	        defaultMessage: '>quote'
	    })));
	    var tutorialTip = null;
	    if (this.state.showTutorialTip) {
	        tutorialTip = this.createTutorialTip();
	    };
	
	    return _jsx('div', {}, void 0, React.createElement(
	        'div',
	        { ref: 'wrapper', className: 'textarea-wrapper' },
	        React.createElement(_suggestion_box2.default, (_React$createElement = {
	            ref: 'message',
	            currentSuggestion: currentSuggestion,
	            className: 'form-control custom-textarea ' + this.state.connection,
	            type: 'textarea',
	            spellCheck: 'true',
	            autoComplete: 'off',
	            autoCorrect: 'off',
	            maxLength: _chat_constants2.default.MAX_POST_LEN,
	            placeholder: "compose",
	            value: this.state.messageText,
	            onUserInput: this.props.onUserInput,
	            onKeyPress: this.handleKeyPress,
	            onKeyDown: this.handleKeyDown,
	            onHeightChange: this.handleHeightChange,
	            style: { visibility: this.state.preview ? 'hidden' : 'visible' },
	            listComponent: _suggestion_list2.default,
	            providers: this.suggestionProviders,
	            channelId: this.props.channelId
	        }, _defineProperty(_React$createElement, 'onUserInput', this.handleUserInput), _defineProperty(_React$createElement, 'onKeyPress', this.postMsgKeyPress), _defineProperty(_React$createElement, 'onKeyDown', this.handleKeyDown), _defineProperty(_React$createElement, 'id', 'message_textbox'), _defineProperty(_React$createElement, 'ref', 'textbox'), _React$createElement)),
	        React.createElement(_file_upload2.default, {
	            ref: 'fileUpload',
	            getFileCount: this.getFileCount,
	            onClick: this.handleUploadClick,
	            onUploadStart: this.handleUploadStart,
	            onFileUpload: this.handleFileUploadComplete,
	            onUploadError: this.handleUploadError,
	            postType: 'post',
	            channelId: ''
	        })
	    ), _jsx('div', {
	        className: 'help__text'
	    }, void 0, helpText, previewLink, _jsx('a', {
	        target: '_blank',
	        href: '/help/getting-started/messaging-basics.html',
	        className: 'textbox-help-link'
	    }, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: 'textbox.help',
	        defaultMessage: 'Help'
	    }))), tutorialTip, _jsx('div', {
	        className: postFooterClassName
	    }, void 0, _jsx(_msg_typing2.default, {
	        channelId: this.state.channelId,
	        parentId: ''
	    }), preview, postError, serverError));
	}), _defineProperty(_React$createClass, 'focus', function focus() {
	    this.refs.message.getTextbox().focus();
	}), _defineProperty(_React$createClass, 'focusTextbox', function focusTextbox() {
	    if (!Utils.isMobile()) {
	        this.refs.textbox.focus();
	    }
	}), _defineProperty(_React$createClass, 'showPreview', function showPreview(e) {
	    e.preventDefault();
	    e.target.blur();
	    this.setState({ preview: !this.state.preview });
	}), _defineProperty(_React$createClass, '_onChange', function _onChange(event, value) {
	    this.setState({ text: event.target.value });
	}), _defineProperty(_React$createClass, '_onKeyDown', function _onKeyDown(event) {
	    if (event.keyCode === ENTER_KEY_CODE) {
	        event.preventDefault();
	        var text = this.state.text.trim();
	        if (text) {
	            //ChatMessageActionCreators.createMessage(text, this.props.chat,chat_type=ChatTypeStore.getCurrent());
	            this.props.actions.createMessage(text, this.props.currentChat);
	        }
	        this.setState({ text: '' });
	    }
	}), _React$createClass));
	
	exports.default = (0, _reactIntl.injectIntl)(MessageComposer);

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
	
	            this.handleCompleteWord();
	
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
	
	            //GlobalActions.emitSuggestionPretextChanged(this.suggestionId, pretext);
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

/***/ },

/***/ 1595:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.prevMessageSelector = exports.nextMessageSelector = exports.loadedThreadCountSelector = exports.hasMoreThreadsSelector = exports.lastMessageInEachThreadSelector = exports.chronoThreadsSelector = exports.selectedSuggestionSelector = exports.selectedThreadMessagesSelector = exports.currentThreadMessagesSelector = exports.allThreadsSelector = exports.suggestionsSelector = exports.selectedSuggestionBox = exports.selectedRoomIDSelector = exports.selectedIDSelector = exports.selectedMessageIDSelector = exports.searchQuerySelector = exports.threadsSelector = exports.labelsSelector = exports.isLoadingSelector = undefined;
	
	var _reselect = __webpack_require__(1596);
	
	var _lodash = __webpack_require__(1597);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var messageListByQuerySelector = function messageListByQuerySelector(state) {
	  return state.messageListByQuery;
	};
	var threadsByIDSelector = function threadsByIDSelector(state) {
	  return state.threads;
	};
	var roomsByIDSelector = function roomsByIDSelector(state) {
	  return state.rooms;
	};
	var messagesByIDSelector = function messagesByIDSelector(state) {
	  return state.messages;
	};
	
	var isLoadingSelector = exports.isLoadingSelector = function isLoadingSelector(state) {
	  return state.isLoading;
	};
	var labelsSelector = exports.labelsSelector = function labelsSelector(state) {
	  return state.labels;
	};
	var threadsSelector = exports.threadsSelector = function threadsSelector(state) {
	  return state.threads;
	};
	var searchQuerySelector = exports.searchQuerySelector = function searchQuerySelector(state) {
	  return state.app.searchQuery;
	};
	var selectedMessageIDSelector = exports.selectedMessageIDSelector = function selectedMessageIDSelector(state) {
	  return state.currentChat.messageID;
	};
	var selectedIDSelector = exports.selectedIDSelector = function selectedIDSelector(state) {
	  return state.currentChat.id;
	};
	
	var selectedRoomIDSelector = exports.selectedRoomIDSelector = function selectedRoomIDSelector(state) {
	  return state.currentChat.roomID;
	};
	
	var selectedSuggestionBox = exports.selectedSuggestionBox = function selectedSuggestionBox(state) {
	  return state.currentSuggestion.id;
	};
	var suggestionsSelector = exports.suggestionsSelector = function suggestionsSelector(state) {
	  return state.suggestionsSelector;
	};
	
	var jidSelector = function jidSelector(state) {
	  return state.xmpp.jid;
	};
	
	var allThreadsSelector = exports.allThreadsSelector = (0, _reselect.createSelector)([searchQuerySelector, messageListByQuerySelector, threadsByIDSelector], function (searchQuery, messageListByQuery, threadsByID) {
	  var threadList = messageListByQuery[searchQuery];
	  return threadList ? threadList.threadIDs.map(function (threadID) {
	    return threadsByID[threadID];
	  }) : [];
	});
	
	var currentThreadMessagesSelector = exports.currentThreadMessagesSelector = (0, _reselect.createSelector)([messagesByIDSelector, selectedIDSelector, jidSelector], function (messages, id, jid) {
	  var from_messages = _lodash2.default.filter(messages, { from: id, to: jid });
	  var my_messages = _lodash2.default.filter(messages, { from: jid, to: id });
	  var toret = _lodash2.default.uniqBy(from_messages.concat(my_messages), function (elem) {
	    return [elem.from, elem.to, elem.created, elem.text].join();
	  });
	  return _lodash2.default.orderBy(toret, ["created"], ['desc']);
	});
	
	var selectedThreadMessagesSelector = exports.selectedThreadMessagesSelector = (0, _reselect.createSelector)([threadsByIDSelector, selectedIDSelector, messagesByIDSelector], function (threadsByID, selectedThreadID, messagesByID) {
	  var selectedThread = threadsByID[selectedThreadID];
	  return selectedThread && selectedThread.messageIDs.map(function (messageID) {
	    return messagesByID[messageID];
	  });
	});
	
	var selectedSuggestionSelector = exports.selectedSuggestionSelector = (0, _reselect.createSelector)([suggestionsSelector, selectedSuggestionBox], function (suggestions, message_box_id) {
	  var suggestion = suggestions[message_box_id];
	  return suggestion;
	});
	
	var chronoThreadsSelector = exports.chronoThreadsSelector = (0, _reselect.createSelector)([threadsSelector], function (threads) {
	  var orderedThreads = [];
	  for (var id in threads) {
	    var thread = threads[id];
	    orderedThreads.push(thread);
	  }
	  orderedThreads.sort(function (a, b) {
	    if (!a.lastMessage === null) {
	
	      if (a.lastMessage._created < b.lastMessage._created) {
	        return -1;
	      } else if (a.lastMessage._created > b.lastMessage._created) {
	        return 1;
	      }
	    } else {
	      return -1;
	    }
	    return 0;
	  });
	  return orderedThreads;
	});
	
	var lastMessageInEachThreadSelector = exports.lastMessageInEachThreadSelector = (0, _reselect.createSelector)([messagesByIDSelector, threadsSelector], function (messagesByID, threads) {
	  return threads && _lodash2.default.toArray(threads).map(function (thread) {
	    return messagesByID[_lodash2.default.last(thread.messageIDs)];
	  });
	});
	
	var hasMoreThreadsSelector = exports.hasMoreThreadsSelector = (0, _reselect.createSelector)([searchQuerySelector, messageListByQuerySelector], function (searchQuery, messageListByQuery) {
	  var threadList = messageListByQuery[searchQuery];
	  return !threadList || !!threadList.nextPageToken;
	});
	
	var loadedThreadCountSelector = exports.loadedThreadCountSelector = (0, _reselect.createSelector)([searchQuerySelector, messageListByQuerySelector], function (searchQuery, messageListByQuery) {
	  var threadList = messageListByQuery[searchQuery];
	  return threadList ? threadList.threadIDs.length : 0;
	});
	
	var nextMessageSelector = exports.nextMessageSelector = (0, _reselect.createSelector)([lastMessageInEachThreadSelector, selectedMessageIDSelector], function (messages, selectedMessageID) {
	  if (!messages) {
	    return null;
	  }
	
	  var selectedMessageIndex = selectedMessageID && messages.findIndex(function (msg) {
	    return msg.id === selectedMessageID;
	  });
	
	  if (!selectedMessageID) {
	    return messages[0];
	  } else if (selectedMessageIndex < 0 || selectedMessageIndex === messages.length) {
	    return null;
	  } else {
	    return messages[selectedMessageIndex + 1];
	  }
	});
	
	var prevMessageSelector = exports.prevMessageSelector = (0, _reselect.createSelector)([lastMessageInEachThreadSelector, selectedMessageIDSelector], function (messages, selectedMessageID) {
	  if (!messages) {
	    return null;
	  }
	
	  var selectedMessageIndex = selectedMessageID && messages.findIndex(function (msg) {
	    return msg.id === selectedMessageID;
	  });
	
	  if (!selectedMessageID) {
	    return messages[0];
	  } else if (selectedMessageIndex < 0 || selectedMessageIndex === 0) {
	    return null;
	  } else {
	    return messages[selectedMessageIndex - 1];
	  }
	});

/***/ },

/***/ 1675:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(248);
	
	var _reactRouterRedux = __webpack_require__(268);
	
	var _sessionReducer = __webpack_require__(1676);
	
	var _sessionReducer2 = _interopRequireDefault(_sessionReducer);
	
	var _registrationReducer = __webpack_require__(1677);
	
	var _registrationReducer2 = _interopRequireDefault(_registrationReducer);
	
	var _boardReducer = __webpack_require__(1678);
	
	var _boardReducer2 = _interopRequireDefault(_boardReducer);
	
	var _currentBoardReducer = __webpack_require__(1679);
	
	var _currentBoardReducer2 = _interopRequireDefault(_currentBoardReducer);
	
	var _currentCardReducer = __webpack_require__(1680);
	
	var _currentCardReducer2 = _interopRequireDefault(_currentCardReducer);
	
	var _headerReducer = __webpack_require__(1681);
	
	var _headerReducer2 = _interopRequireDefault(_headerReducer);
	
	var _xmppReducer = __webpack_require__(1682);
	
	var _xmppReducer2 = _interopRequireDefault(_xmppReducer);
	
	var _appReducer = __webpack_require__(1683);
	
	var _appReducer2 = _interopRequireDefault(_appReducer);
	
	var _callReducer = __webpack_require__(1684);
	
	var _callReducer2 = _interopRequireDefault(_callReducer);
	
	var _currentChatReducer = __webpack_require__(1685);
	
	var _currentChatReducer2 = _interopRequireDefault(_currentChatReducer);
	
	var _contactReducer = __webpack_require__(1686);
	
	var _contactReducer2 = _interopRequireDefault(_contactReducer);
	
	var _loadingReducer = __webpack_require__(1687);
	
	var _loadingReducer2 = _interopRequireDefault(_loadingReducer);
	
	var _messageReducer = __webpack_require__(1688);
	
	var _messageReducer2 = _interopRequireDefault(_messageReducer);
	
	var _resourceReducer = __webpack_require__(1689);
	
	var _resourceReducer2 = _interopRequireDefault(_resourceReducer);
	
	var _roomReducer = __webpack_require__(1690);
	
	var _roomReducer2 = _interopRequireDefault(_roomReducer);
	
	var _threadReducer = __webpack_require__(1691);
	
	var _threadReducer2 = _interopRequireDefault(_threadReducer);
	
	var _taskReducer = __webpack_require__(1692);
	
	var _taskReducer2 = _interopRequireDefault(_taskReducer);
	
	var _unreadThreadReducer = __webpack_require__(1693);
	
	var _unreadThreadReducer2 = _interopRequireDefault(_unreadThreadReducer);
	
	var _unreadRoomReducer = __webpack_require__(1694);
	
	var _unreadRoomReducer2 = _interopRequireDefault(_unreadRoomReducer);
	
	var _userReducer = __webpack_require__(1695);
	
	var _userReducer2 = _interopRequireDefault(_userReducer);
	
	var _taskreducer = __webpack_require__(1696);
	
	var _taskreducer2 = _interopRequireDefault(_taskreducer);
	
	var _suggestionsReducer = __webpack_require__(1697);
	
	var _suggestionsReducer2 = _interopRequireDefault(_suggestionsReducer);
	
	var _MessageListReducer = __webpack_require__(1698);
	
	var _MessageListReducer2 = _interopRequireDefault(_MessageListReducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _redux.combineReducers)({
	  routing: _reactRouterRedux.routerReducer,
	  session: _sessionReducer2.default,
	  registration: _registrationReducer2.default,
	  boards: _boardReducer2.default,
	  currentBoard: _currentBoardReducer2.default,
	  currentCard: _currentCardReducer2.default,
	  currentChat: _currentChatReducer2.default,
	  header: _headerReducer2.default,
	  tasks: _taskreducer2.default,
	  xmpp: _xmppReducer2.default,
	  messages: _messageReducer2.default,
	  loading: _loadingReducer2.default,
	  user: _userReducer2.default,
	  unreadRoom: _unreadRoomReducer2.default,
	  unreadThread: _unreadThreadReducer2.default,
	  threads: _threadReducer2.default,
	  rooms: _roomReducer2.default,
	  contacts: _contactReducer2.default,
	  calls: _callReducer2.default,
	  resources: _resourceReducer2.default,
	  app: _appReducer2.default,
	  messageListByQuery: _MessageListReducer2.default,
	  suggestions: _suggestionsReducer2.default,
	  currentMessage: _messageReducer.messageReducer,
	  currentSuggestion: _suggestionsReducer.currentSuggestion
	
	});

/***/ },

/***/ 1697:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = reducer;
	
	var _chat_constants = __webpack_require__(969);
	
	var _chat_constants2 = _interopRequireDefault(_chat_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function markInactive() {
	    if (this.focused) {
	        return this.markActive();
	    }
	
	    _active = false;
	    _idleSince = new Date(Date.now());
	}
	
	function registerSuggestionBox(id, state) {
	    state[id] = {
	        pretext: '',
	        matchedPretext: '',
	        terms: [],
	        items: [],
	        components: [],
	        selection: ''
	    };
	    return state;
	}
	
	function unregisterSuggestionBox(id, state) {
	    delete state[id];
	    return state;
	}
	
	function clearSuggestions(id, state) {
	    var suggestion = state[id];
	
	    suggestion.matchedPretext = '';
	    suggestion.terms = [];
	    suggestion.items = [];
	    suggestion.components = [];
	    state[id] = suggestion;
	    return state;
	}
	
	function clearSelection(id, state) {
	    var suggestion = state[id];
	
	    suggestion.selection = '';
	    state[id] = suggestion;
	    return state;
	}
	
	function hasSuggestions(id, state) {
	    return state[id].terms.length > 0;
	}
	
	function setPretext(id, pretext, state) {
	    var suggestion = state[id];
	
	    suggestion.pretext = pretext;
	    state[id] = suggestion;
	    return state;
	}
	
	function setMatchedPretext(id, matchedPretext, state) {
	    var suggestion = state[id];
	
	    suggestion.matchedPretext = matchedPretext;
	    state[id] = suggestion;
	    return state;
	}
	
	function addSuggestion(id, term, item, component, state) {
	    var suggestion = state[id];
	
	    suggestion.terms.push(term);
	    suggestion.items.push(item);
	    suggestion.components.push(component);
	    state[id] = suggestion;
	    return state;
	}
	
	function addSuggestions(id, terms, items, component, state) {
	    var _suggestion$terms, _suggestion$items;
	
	    var suggestion = state[id];
	
	    (_suggestion$terms = suggestion.terms).push.apply(_suggestion$terms, _toConsumableArray(terms));
	    (_suggestion$items = suggestion.items).push.apply(_suggestion$items, _toConsumableArray(items));
	
	    for (var i = 0; i < terms.length; i++) {
	        suggestion.components.push(component);
	    }
	    state[id] = suggestion;
	    return state;
	}
	
	// make sure that if suggestions exist, then one of them is selected. return true if the selection changes.
	function ensureSelectionExists(id, state) {
	    var suggestion = state[id];
	
	    if (suggestion.terms.length > 0) {
	        // if the current selection is no longer in the map, select the first term in the list
	        if (!suggestion.selection || suggestion.terms.indexOf(suggestion.selection) === -1) {
	            suggestion.selection = suggestion.terms[0];
	
	            return true;
	        }
	    } else if (suggestion.selection) {
	        suggestion.selection = '';
	    }
	
	    state[id] = suggestion;
	    return state;
	}
	
	function getPretext(id, state) {
	    return state[id].pretext;
	}
	
	function getMatchedPretext(id, state) {
	    return state[id].matchedPretext;
	}
	
	function getItems(id, state) {
	    return state[id].items;
	}
	
	function getTerms(id, state) {
	    return state[id].terms;
	}
	
	function getComponents(id, state) {
	    return state[id].components;
	}
	
	function getSelection(id, state) {
	    return state[id].selection;
	}
	
	function selectNext(id, state) {
	    return setSelectionByDelta(id, 1, state);
	}
	
	function selectPrevious(id, state) {
	    return setSelectionByDelta(id, -1, state);
	}
	
	function setSelectionByDelta(id, delta, state) {
	    var suggestion = state[id];
	
	    var selectionIndex = suggestion.terms.indexOf(suggestion.selection);
	
	    if (selectionIndex === -1) {
	        // this should never happen since selection should always be in terms
	        throw new Error('selection is not in terms');
	    }
	
	    selectionIndex += delta;
	
	    if (selectionIndex < 0) {
	        selectionIndex = 0;
	    } else if (selectionIndex > suggestion.terms.length - 1) {
	        selectionIndex = suggestion.terms.length - 1;
	    }
	
	    suggestion.selection = suggestion.terms[selectionIndex];
	
	    state[id] = suggestion;
	    return state;
	}
	
	function reducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var id = action.id;
	
	    var other = _objectWithoutProperties(action, ['id']);
	
	    switch (action.type) {
	
	        case _chat_constants2.default.SUGGESTION_PRETEXT_CHANGED:
	            var toret = state;
	            toret = clearSuggestions(id, toret);
	
	            toret = setPretext(id, other.pretext, toret);
	            store.dispatch({
	                type: ActionType.PRETEXT_CHANGED,
	                id: id,
	                pretext: other.pretext
	
	            });
	
	            toret = ensureSelectionExists(id, toret);
	            store.dispatch({
	                type: ActionType.SUGGESTIONS_CHANGED,
	                id: id
	
	            });
	
	            return _extends({}, toret);
	
	        case _chat_constants2.default.SUGGESTION_RECEIVED_SUGGESTIONS:
	            var toret = state;
	            if (getMatchedPretext(id, state) === '') {
	                toret = setMatchedPretext(id, other.matchedPretext, toret);
	
	                // ensure the matched pretext hasn't changed so that we don't receive suggestions for outdated pretext
	                toret = addSuggestions(id, other.terms, other.items, other.component, toret);
	
	                toret = ensureSelectionExists(id, toret);
	                store.dispatch({
	                    type: ActionType.SUGGESTIONS_CHANGED,
	                    id: id
	
	                });
	            }
	
	            return _extends({}, toret);
	        case _chat_constants2.default.SUGGESTION_CLEAR_SUGGESTIONS:
	            var toret = state;
	            toret = clearSuggestions(id, toret);
	            toret = clearSelection(id, toret);
	            store.dispatch({
	                type: ActionType.SUGGESTIONS_CHANGED,
	                id: id
	
	            });
	
	            return _extends({}, toret);
	        case _chat_constants2.default.SUGGESTION_SELECT_PREVIOUS:
	            var toret = state;
	            toret = selectNext(id, toret);
	            store.dispatch({
	                type: ActionType.SUGGESTIONS_CHANGED,
	                id: id
	
	            });
	
	            return _extends({}, toret);
	
	        case _chat_constants2.default.SUGGESTION_SELECT_NEXT:
	            var toret = state;
	            toret = selectPrevious(id, toret);
	            store.dispatch({
	                type: ActionType.SUGGESTIONS_CHANGED,
	                id: id
	
	            });
	            return _extends({}, toret);
	        case _chat_constants2.default.SUGGESTION_COMPLETE_WORD:
	            var toret = state;
	            store.dispatch({
	                type: ActionType.COMPLETE_WORD,
	                id: id,
	                term: other.term || getSelection(id, state) || getMatchedPretext(id, state)
	
	            });
	
	            toret = setPretext(id, '', toret);
	            toret = clearSuggestions(id, toret);
	            toret = clearSelection(id, toret);
	            store.dispatch({
	                type: ActionType.SUGGESTIONS_CHANGED,
	                id: id
	
	            });
	            return _extends({}, toret);
	
	        case _chat_constants2.default.REGISTER_SUGGESTION_BOX:
	            var toret = state;
	            toret = registerSuggestionBox(id, toret);
	            return _extends({}, toret);
	        case _chat_constants2.default.ADD_COMPLETE_WORD:
	            var toret = state;
	            return _extends({}, toret);
	        case _chat_constants2.default.SUGGESTION_COMPLETE_WORD:
	            var toret = state;
	            return _extends({}, toret);
	        case _chat_constants2.default.SUGGESTION_COMPLETE_WORD:
	            var toret = state;
	            return _extends({}, toret);
	
	        default:
	            return state;
	    }
	}
	
	var currentSuggestion = function reducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var id = action.id;
	
	    var other = _objectWithoutProperties(action, ['id']);
	
	    switch (action.type) {
	
	        case _chat_constants2.default.REGISTER_SUGGESTION_BOX:
	            return { id: id };
	        case _chat_constants2.default.SUGGESTION_COMPLETE_WORD:
	            return { id: id, term: other.term || getSelection(id, state) || getMatchedPretext(id, state) };
	
	        default:
	            return state;
	    }
	};

/***/ }

})
//# sourceMappingURL=0.4152862d3ac7bea80a99.hot-update.js.map