import ActionTypes  from '../constants/chat_constants';

const initialState = {
            pretext: '',
            matchedPretext: '',
            terms: [],
            items: [],
            components: [],
            selection: '',
     hasSuggestions: {
        return this.terms.length > 0;
    }
};

  function markInactive   () {
        if (this.focused) {
            return this.markActive();
        }

        _active = false;
        _idleSince = new Date(Date.now());

    }

registerSuggestionBox(id,state) {
        state[id]={
            pretext: '',
            matchedPretext: '',
            terms: [],
            items: [],
            components: [],
            selection: ''
        };
    return state;
    }

    unregisterSuggestionBox(id,state) {
        del state[id];
       return state;
    }

    clearSuggestions(id,state) {
        const suggestion = state[id];

        suggestion.matchedPretext = '';
        suggestion.terms = [];
        suggestion.items = [];
        suggestion.components = [];
        state[id] =suggestion;
       return state;
    }

    clearSelection(id,state) {
        const suggestion = state[id];

        suggestion.selection = '';
        state[id]=suggestion;
        return state;
    }

    hasSuggestions(id,state) {
        return state[id].terms.length > 0;
    }

    setPretext(id, pretext,state) {
        const suggestion = state[id];

        suggestion.pretext = pretext;
        state[id] = suggestion;
        return state;
    }

    setMatchedPretext(id, matchedPretext,state) {
        const suggestion = state[id];

        suggestion.matchedPretext = matchedPretext;
        state[id] = suggestion;
        return state;
    }

    addSuggestion(id, term, item, component,state) {
        const suggestion = state[id];

        suggestion.terms.push(term);
        suggestion.items.push(item);
        suggestion.components.push(component);
         state[id] = suggestion;
        return state;
    }

    addSuggestions(id, terms, items, component,state) {
        const suggestion = state[id];

        suggestion.terms.push(...terms);
        suggestion.items.push(...items);

        for (let i = 0; i < terms.length; i++) {
            suggestion.components.push(component);
        }
       state[id] = suggestion;
       return state;
    }

    // make sure that if suggestions exist, then one of them is selected. return true if the selection changes.
    ensureSelectionExists(id,state) {
        const suggestion = state[id];

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

    getPretext(id,state) {
        return state[id].pretext;
    }

    getMatchedPretext(id,state) {
        return state[id].matchedPretext;
    }

    getItems(id,state) {
        return state[id].items;
    }

    getTerms(id,state) {
        return state[id].terms;
    }

    getComponents(id,state) {
        return state[id].components;
    }

    getSelection(id,state) {
        return state[id].selection;
    }

    selectNext(id,state) {
        return setSelectionByDelta(id, 1,state);
    }

    selectPrevious(id,state) {
        return setSelectionByDelta(id, -1,state);
    }

    setSelectionByDelta(id, delta,state) {
        const suggestion = state[id];

        let selectionIndex = suggestion.terms.indexOf(suggestion.selection);

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

export default function reducer(state = {}, action = {}) {
     switch (action.type) {
         const { id, ...other} = action;

         case ActionTypes.SUGGESTION_PRETEXT_CHANGED:
             var toret=state;
             toret=clearSuggestions(id,toret);

            toret=setPretext(id, other.pretext,toret);
             store.dispatch({
                        type: ActionType.PRETEXT_CHANGED,
                        id:id,
                        pretext:other.pretext

                         });


            toret=ensureSelectionExists(id,toret);
             store.dispatch({
                        type: ActionType.SUGGESTIONS_CHANGED,
                        id:id,

                        });

            return {...toret};

        case  ActionTypes.SUGGESTION_RECEIVED_SUGGESTIONS:
            var toret=state;
              if (getMatchedPretext(id,state) === '') {
                toret=setMatchedPretext(id, other.matchedPretext,toret);

                // ensure the matched pretext hasn't changed so that we don't receive suggestions for outdated pretext
                toret=addSuggestions(id, other.terms, other.items, other.component,toret);

                toret=ensureSelectionExists(id,toret);
                store.dispatch({
                        type: ActionType.SUGGESTIONS_CHANGED,
                        id:id,

                        });
            }



            return { ...toret };
        case ActionTypes.SUGGESTION_CLEAR_SUGGESTIONS:
             var toret = state;
             toret = clearSuggestions(id,toret);
             toret = clearSelection(id,toret);
             store.dispatch({
                        type: ActionType.SUGGESTIONS_CHANGED,
                        id:id,

                        });

            return {...toret };
         case ActionTypes.SUGGESTION_SELECT_PREVIOUS:
             var toret = state;
             toret = selectNext(id,toret);
              store.dispatch({
                        type: ActionType.SUGGESTIONS_CHANGED,
                        id:id,

                        });

            return { ...toret };

        case ActionTypes.SUGGESTION_SELECT_NEXT:
          var toret=state;
          toret = selectPrevious(id,toret);
             store.dispatch({
                        type: ActionType.SUGGESTIONS_CHANGED,
                        id:id,

                        });
            return {...toret};
        case ActionTypes.SUGGESTION_COMPLETE_WORD:
              var toret = state;
             store.dispatch({
                        type: ActionType.COMPLETE_WORD,
                        id:id,
                        term: other.term || getSelection(id,state), getMatchedPretext(id,state)

                        });


            toret = setPretext(id, '',toret);
            toret = clearSuggestions(id,toret);
            toret = clearSelection(id,toret);
            store.dispatch({
                        type: ActionType.SUGGESTIONS_CHANGED,
                        id:id,

                        });
          return {...toret };




    default:
      return state;
  }
}




