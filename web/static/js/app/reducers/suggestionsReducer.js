import ActionTypes  from '../constants';


  function markInactive   () {
        if (this.focused) {
            return this.markActive();
        }

        _active = false;
        _idleSince = new Date(Date.now());

    }

function registerSuggestionBox(id,state) {
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

   function  unregisterSuggestionBox(id,state) {
        delete state[id];
       return state;
    }

    function clearSuggestions(id,state) {
        var  suggestion = state[id];

        suggestion.matchedPretext = '';
        suggestion.terms = [];
        suggestion.items = [];
        suggestion.components = [];
        state[id] =suggestion;
       return state;
    }

    function clearSelection(id,state) {
        var  suggestion = state[id];

        suggestion.selection = '';
        state[id]=suggestion;
        return state;
    }

    function hasSuggestions(id,state) {
        return state[id].terms.length > 0;
    }

    function setPretext(id, pretext,state) {
        var suggestion = state[id];

        suggestion.pretext = pretext;
        state[id] = suggestion;
        return state;
    }

    function setMatchedPretext(id, matchedPretext,state) {
        var suggestion = state[id];

        suggestion.matchedPretext = matchedPretext;
        state[id] = suggestion;
        return state;
    }

    function addSuggestion(id, term, item, component,state) {
        var  suggestion = state[id];

        suggestion.terms.push(term);
        suggestion.items.push(item);
        suggestion.components.push(component);
         state[id] = suggestion;
        return state;
    }

   function  addSuggestions(id, terms, items, component,state) {
        var suggestion = state[id];
        var newState=state;

        suggestion.terms.push(...terms);
        suggestion.items.push(...items);

        for (let i = 0; i < terms.length; i++) {
            suggestion.components.push(component);
        }
       newState[id] = suggestion;
       return newState;
    }

    // make sure that if suggestions exist, then one of them is selected. return true if the selection changes.
    function ensureSelectionExists(id,state) {
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

    function getPretext(id,state) {
        return state[id].pretext;
    }

    function getMatchedPretext(id,state) {
        return state[id].matchedPretext;
    }

   function  getItems(id,state) {
        return state[id].items;
    }

    function getTerms(id,state) {
        return state[id].terms;
    }

   function  getComponents(id,state) {
        return state[id].components;
    }

   function  getSelection(id,state) {
        return state[id].selection;
    }

    function selectNext(id,state) {
        return setSelectionByDelta(id, 1,state);
    }

    function selectPrevious(id,state) {
        return setSelectionByDelta(id, -1,state);
    }

    function setSelectionByDelta(id, delta,state) {
        var suggestion = state[id];

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
     const  { id, ...other} = action;

     switch (action.type) {


         case ActionTypes.SUGGESTION_PRETEXT_CHANGED:
             var toret=state;
             toret=clearSuggestions(id,toret);

            toret=setPretext(id, other.pretext,toret);
            toret=ensureSelectionExists(id,toret);

            return {...toret};

        case  ActionTypes.SUGGESTION_RECEIVED_SUGGESTIONS:
            var toret=state;
              if (getMatchedPretext(id,state) === '') {
                toret=setMatchedPretext(id, other.matchedPretext,toret);

                // ensure the matched pretext hasn't changed so that we don't receive suggestions for outdated pretext
                toret=addSuggestions(id, other.terms, other.items, other.component,toret);

                toret=ensureSelectionExists(id,toret);

            }



            return { ...toret };
        case ActionTypes.SUGGESTION_CLEAR_SUGGESTIONS:
             var toret = clearSuggestions(id,state);
             toret = clearSelection(id,toret);

            return {...toret };
         case ActionTypes.SUGGESTION_SELECT_PREVIOUS:


            return selectNext(id,state);

        case ActionTypes.SUGGESTION_SELECT_NEXT:

            return selectPrevious(id,state);
        case ActionTypes.SUGGESTION_COMPLETE_WORD:
            var t_term= other.term||getSelection(id,suggestions)|| getMatchedPretext(id,suggestions);

            var toret = setPretext(id, '',state);
            toret = clearSuggestions(id,toret);
            toret = clearSelection(id,toret);

          return {...toret };

        case ActionTypes.REGISTER_SUGGESTION_BOX:

            return registerSuggestionBox(id,state);
        case ActionTypes.UNREGISTER_SUGGESTION_BOX:
            return unregisterSuggestionBox(id,state);
        case ActionTypes.ADD_SUGGESTIONS:

            var tr = addSuggestions(id, other.terms, other.items, other.component,state);
            console.log(tr);
            return {...tr};

        case ActionTypes.SET_MATCHED_PRETEXT:

            return setMatchedPretext(id, other.text,state);
        case ActionTypes.CLEAR_SELECTION:

            return clearSelection(id,state);


    default:
      return state;
  }
}



export const currentSuggestion  = function reducer(state = {
            pretext: '',
            matchedPretext: '',
            terms: [],
            items: [],
            components: [],
            selection: '',
    id:null
        }, action = {}) {
     const  { id, ...other} = action;
     switch (action.type) {

          case ActionTypes.REGISTER_SUGGESTION_BOX:
                 return {id: id };
         case ActionTypes.SUGGESTION_COMPLETE_WORD:
             const suggestion = store.getState().suggestions[id];
             return {id:id,term: other.term || getSelection(id,state)|| getMatchedPretext(id,state),suggestion:suggestion,hasSuggestions:suggestion.terms.length > 0};

    default:
      return state;
  }
}


