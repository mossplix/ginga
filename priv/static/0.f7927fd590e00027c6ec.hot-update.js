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
	
	}, _defineProperty(_keyMirror, 'CLICK_CHANNEL', null), _defineProperty(_keyMirror, 'CREATE_CHANNEL', null), _defineProperty(_keyMirror, 'LEAVE_CHANNEL', null), _defineProperty(_keyMirror, 'CREATE_POST', null), _defineProperty(_keyMirror, 'POST_DELETED', null), _defineProperty(_keyMirror, 'REMOVE_POST', null), _defineProperty(_keyMirror, 'RECEIVED_CHANNELS', null), _defineProperty(_keyMirror, 'RECEIVED_CHANNEL', null), _defineProperty(_keyMirror, 'RECEIVED_MORE_CHANNELS', null), _defineProperty(_keyMirror, 'RECEIVED_CHANNEL_EXTRA_INFO', null), _defineProperty(_keyMirror, 'FOCUS_POST', null), _defineProperty(_keyMirror, 'RECEIVED_POSTS', null), _defineProperty(_keyMirror, 'RECEIVED_FOCUSED_POST', null), _defineProperty(_keyMirror, 'RECEIVED_POST', null), _defineProperty(_keyMirror, 'RECEIVED_EDIT_POST', null), _defineProperty(_keyMirror, 'RECEIVED_SEARCH', null), _defineProperty(_keyMirror, 'RECEIVED_SEARCH_TERM', null), _defineProperty(_keyMirror, 'RECEIVED_POST_SELECTED', null), _defineProperty(_keyMirror, 'RECEIVED_MENTION_DATA', null), _defineProperty(_keyMirror, 'RECEIVED_ADD_MENTION', null), _defineProperty(_keyMirror, 'RECEIVED_PROFILES', null), _defineProperty(_keyMirror, 'RECEIVED_ME', null), _defineProperty(_keyMirror, 'RECEIVED_SESSIONS', null), _defineProperty(_keyMirror, 'RECEIVED_AUDITS', null), _defineProperty(_keyMirror, 'RECEIVED_TEAMS', null), _defineProperty(_keyMirror, 'RECEIVED_STATUSES', null), _defineProperty(_keyMirror, 'RECEIVED_PREFERENCE', null), _defineProperty(_keyMirror, 'RECEIVED_PREFERENCES', null), _defineProperty(_keyMirror, 'RECEIVED_FILE_INFO', null), _defineProperty(_keyMirror, 'RECEIVED_ANALYTICS', null), _defineProperty(_keyMirror, 'RECEIVED_INCOMING_WEBHOOKS', null), _defineProperty(_keyMirror, 'RECEIVED_INCOMING_WEBHOOK', null), _defineProperty(_keyMirror, 'REMOVED_INCOMING_WEBHOOK', null), _defineProperty(_keyMirror, 'RECEIVED_OUTGOING_WEBHOOKS', null), _defineProperty(_keyMirror, 'RECEIVED_OUTGOING_WEBHOOK', null), _defineProperty(_keyMirror, 'UPDATED_OUTGOING_WEBHOOK', null), _defineProperty(_keyMirror, 'REMOVED_OUTGOING_WEBHOOK', null), _defineProperty(_keyMirror, 'RECEIVED_MSG', null), _defineProperty(_keyMirror, 'RECEIVED_MY_TEAM', null), _defineProperty(_keyMirror, 'RECEIVED_CONFIG', null), _defineProperty(_keyMirror, 'RECEIVED_LOGS', null), _defineProperty(_keyMirror, 'RECEIVED_SERVER_AUDITS', null), _defineProperty(_keyMirror, 'RECEIVED_SERVER_COMPLIANCE_REPORTS', null), _defineProperty(_keyMirror, 'RECEIVED_ALL_TEAMS', null), _defineProperty(_keyMirror, 'RECEIVED_LOCALE', null), _defineProperty(_keyMirror, 'SHOW_SEARCH', null), _defineProperty(_keyMirror, 'USER_TYPING', null), _defineProperty(_keyMirror, 'TOGGLE_IMPORT_THEME_MODAL', null), _defineProperty(_keyMirror, 'TOGGLE_INVITE_MEMBER_MODAL', null), _defineProperty(_keyMirror, 'TOGGLE_DELETE_POST_MODAL', null), _defineProperty(_keyMirror, 'TOGGLE_GET_POST_LINK_MODAL', null), _defineProperty(_keyMirror, 'TOGGLE_GET_TEAM_INVITE_LINK_MODAL', null), _defineProperty(_keyMirror, 'TOGGLE_REGISTER_APP_MODAL', null), _defineProperty(_keyMirror, 'SUGGESTION_PRETEXT_CHANGED', null), _defineProperty(_keyMirror, 'SUGGESTION_RECEIVED_SUGGESTIONS', null), _defineProperty(_keyMirror, 'SUGGESTION_CLEAR_SUGGESTIONS', null), _defineProperty(_keyMirror, 'SUGGESTION_COMPLETE_WORD', null), _defineProperty(_keyMirror, 'SUGGESTION_SELECT_NEXT', null), _defineProperty(_keyMirror, 'SUGGESTION_SELECT_PREVIOUS', null), _defineProperty(_keyMirror, 'REGISTER_SUGGESTION_BOX', null), _defineProperty(_keyMirror, 'ADD_COMPLETE_WORD', null), _keyMirror));
	
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

/***/ }

})
//# sourceMappingURL=0.f7927fd590e00027c6ec.hot-update.js.map