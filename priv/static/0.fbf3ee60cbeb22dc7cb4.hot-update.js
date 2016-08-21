webpackHotUpdate(0,{

/***/ 1712:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(577);
	
	var _reactRouterRedux = __webpack_require__(600);
	
	var _session = __webpack_require__(1713);
	
	var _session2 = _interopRequireDefault(_session);
	
	var _registration = __webpack_require__(1846);
	
	var _registration2 = _interopRequireDefault(_registration);
	
	var _boards = __webpack_require__(1847);
	
	var _boards2 = _interopRequireDefault(_boards);
	
	var _current_board = __webpack_require__(1848);
	
	var _current_board2 = _interopRequireDefault(_current_board);
	
	var _current_card = __webpack_require__(1849);
	
	var _current_card2 = _interopRequireDefault(_current_card);
	
	var _header = __webpack_require__(1850);
	
	var _header2 = _interopRequireDefault(_header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _redux.combineReducers)({
	  routing: _reactRouterRedux.routerReducer,
	  session: _session2.default,
	  registration: _registration2.default,
	  boards: _boards2.default,
	  currentBoard: _current_board2.default,
	  currentCard: _current_card2.default,
	  header: _header2.default
	});

/***/ },

/***/ 1846:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = reducer;
	
	var _constants = __webpack_require__(605);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = {
	  errors: null
	};
	
	function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  switch (action.type) {
	    case _constants2.default.REGISTRATIONS_ERROR:
	      return _extends({}, state, { errors: action.errors });
	
	    default:
	      return state;
	  }
	}

/***/ },

/***/ 1847:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = reducer;
	
	var _constants = __webpack_require__(605);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = {
	  ownedBoards: [],
	  invitedBoards: [],
	  showForm: false,
	  formErrors: null,
	  ownedFetched: false,
	  fetching: true
	};
	
	function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  switch (action.type) {
	    case _constants2.default.BOARDS_FETCHING:
	      return _extends({}, state, { fetching: true });
	
	    case _constants2.default.BOARDS_RECEIVED:
	      return _extends({}, state, { ownedBoards: action.ownedBoards, invitedBoards: action.invitedBoards, fetching: false });
	
	    case _constants2.default.BOARDS_SHOW_FORM:
	      return _extends({}, state, { showForm: action.show });
	
	    case _constants2.default.BOARDS_CREATE_ERROR:
	      return _extends({}, state, { formErrors: action.errors });
	
	    case _constants2.default.BOARDS_RESET:
	      return _extends({}, state, { showForm: false, formErrors: null, ownedFetched: false, fetching: false });
	
	    case _constants2.default.BOARDS_FULL_RESET:
	      return initialState;
	
	    case _constants2.default.BOARDS_ADDED:
	      var invitedBoards = state.invitedBoards;
	
	
	      return _extends({}, state, { invitedBoards: [action.board].concat(invitedBoards) });
	
	    case _constants2.default.BOARDS_NEW_BOARD_CREATED:
	      var ownedBoards = state.ownedBoards;
	
	
	      return _extends({}, state, { ownedBoards: [action.board].concat(ownedBoards) });
	
	    default:
	      return state;
	  }
	}

/***/ },

/***/ 1848:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = reducer;
	
	var _constants = __webpack_require__(605);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = {
	  connectedUsers: [],
	  channel: null,
	  showForm: false,
	  showUsersForm: false,
	  editingListId: null,
	  addingNewCardInListId: null,
	  error: null,
	  fetching: true
	};
	
	function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  var lists = void 0;
	
	  switch (action.type) {
	    case _constants2.default.CURRENT_BOARD_FETHING:
	      return _extends({}, state, { fetching: true });
	
	    case _constants2.default.BOARDS_SET_CURRENT_BOARD:
	      return _extends({}, state, { editingListId: null, fetching: false }, action.board);
	
	    case _constants2.default.CURRENT_BOARD_CONNECTED_USERS:
	      return _extends({}, state, { connectedUsers: action.users });
	
	    case _constants2.default.CURRENT_BOARD_CONNECTED_TO_CHANNEL:
	      return _extends({}, state, { channel: action.channel });
	
	    case _constants2.default.CURRENT_BOARD_SHOW_FORM:
	      return _extends({}, state, { showForm: action.show });
	
	    case _constants2.default.CURRENT_BOARD_SHOW_MEMBERS_FORM:
	      return _extends({}, state, { showUsersForm: action.show, error: false });
	
	    case _constants2.default.CURRENT_BOARD_RESET:
	      return initialState;
	
	    case _constants2.default.CURRENT_BOARD_LIST_CREATED:
	      lists = state.lists;
	      lists.push(action.list);
	
	      return _extends({}, state, { lists: lists, showForm: false });
	
	    case _constants2.default.CURRENT_BOARD_CARD_CREATED:
	      lists = state.lists;
	      var card = action.card;
	
	
	      var listIndex = lists.findIndex(function (list) {
	        return list.id == card.list_id;
	      });
	      lists[listIndex].cards.push(card);
	
	      return _extends({}, state, { lists: lists });
	
	    case _constants2.default.CURRENT_BOARD_MEMBER_ADDED:
	      var members = state.members;
	
	      members.push(action.user);
	
	      return _extends({}, state, { members: members, showUsersForm: false });
	
	    case _constants2.default.CURRENT_BOARD_ADD_MEMBER_ERROR:
	      return _extends({}, state, { error: action.error });
	
	    case _constants2.default.CURRENT_BOARD_EDIT_LIST:
	      return _extends({}, state, { editingListId: action.listId });
	
	    case _constants2.default.CURRENT_BOARD_SHOW_CARD_FORM_FOR_LIST:
	      return _extends({}, state, { addingNewCardInListId: action.listId });
	
	    default:
	      return state;
	  }
	}

/***/ },

/***/ 1849:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = reducer;
	
	var _constants = __webpack_require__(605);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = {
	  card: null,
	  edit: false,
	  error: null,
	  fetching: true,
	  showMembersSelector: false,
	  showTagsSelector: false
	};
	
	function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  switch (action.type) {
	    case _constants2.default.CURRENT_CARD_FETHING:
	      return _extends({}, state, { fetching: true });
	
	    case _constants2.default.CURRENT_CARD_RESET:
	      return initialState;
	
	    case _constants2.default.CURRENT_CARD_SET:
	      var actionCard = action.actionCard;
	      var card = state.card;
	
	
	      var edit = false;
	
	      if (edit) {
	        edit = !(actionCard.id == card.id);
	      }
	
	      return _extends({}, state, { card: action.card, edit: edit });
	
	    case _constants2.default.CURRENT_CARD_EDIT:
	      return _extends({}, state, { edit: action.edit });
	
	    case _constants2.default.CURRENT_CARD_SHOW_MEMBERS_SELECTOR:
	      return _extends({}, state, { showMembersSelector: action.show });
	
	    case _constants2.default.CURRENT_CARD_SHOW_TAGS_SELECTOR:
	      return _extends({}, state, { showTagsSelector: action.show });
	
	    default:
	      return state;
	  }
	}

/***/ },

/***/ 1850:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = reducer;
	
	var _constants = __webpack_require__(605);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = {
	  showBoards: false
	};
	
	function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  switch (action.type) {
	    case _constants2.default.HEADER_SHOW_BOARDS:
	      return _extends({}, state, { showBoards: action.show });
	
	    default:
	      return state;
	  }
	}

/***/ }

})
//# sourceMappingURL=0.fbf3ee60cbeb22dc7cb4.hot-update.js.map