webpackHotUpdate(0,{

/***/ 1697:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.currentSuggestion = undefined;
	
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
	        case _chat_constants2.default.UNREGISTER_SUGGESTION_BOX:
	            var toret = state;
	            toret = unregisterSuggestionBox(id, toret);
	            return _extends({}, toret);
	
	        default:
	            return state;
	    }
	}
	
	var currentSuggestion = exports.currentSuggestion = function reducer() {
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
//# sourceMappingURL=0.ea17454182608fdb3878.hot-update.js.map