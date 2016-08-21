webpackHotUpdate(0,{

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

/***/ }

})
//# sourceMappingURL=0.29609275d5b918bd5a64.hot-update.js.map