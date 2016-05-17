import ActionTypes  from '../constants';
import { push }           from 'react-router-redux';

import {getSelection,getMatchedPretext} from '../reducers/suggestionsReducer';
export function clickChannel(channelID) {

    return dispatch => {
        dispatch({
            type: ActionTypes.CLICK_CHANNEL,
            channelID: channelID
        });

    dispatch(push(`/chat/channels/${channelID}`));
    }}





function promise(callback){
    return dispatch => {
        console.log(dispatch);
        dispatch(callback);
         return Promise.resolve();
    }

}


export function clickThread(threadID) {
    return dispatch => {
    dispatch({
      type: ActionTypes.CLICK_THREAD,
      threadID: threadID
    });

    dispatch(push(`/chat/threads/${threadID}`));


  }}


export function createMessage(text, chat) {
    return (dispatch, getState) =>
    {
        dispatch({
            type: ActionTypes.CREATE_MESSAGE,
            message: message,
            chat: chat,

        });
    }
  }

export function    receiveRawMessage(msg) {
    return (dispatch, getState) =>
    {
        dispatch({
            type: ActionTypes.RECEIVE_RAW_MESSAGE,
            msg: msg

        });
    }
    }

export function receiveAll(rawMessages) {
    return (dispatch, getState) =>
    {
        dispatch({
            type: ActionTypes.RECEIVE_RAW_MESSAGES,
            rawMessages: rawMessages
        });
    }
  }



  export function receiveCreatedMessage(createdMessage) {
    return (dispatch, getState) =>
    {
        dispatch({
            type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
            rawMessage: createdMessage
        });
    }
  }




export function selectNextSuggestion(suggestionId) {
    return (dispatch, getState) =>
    {
        return new Promise((resolve) => { dispatch({
            type: ActionTypes.SUGGESTION_SELECT_NEXT,
            id: suggestionId
        });resolve(false);}).then(() => dispatch({
                        type: ActionTypes.SUGGESTIONS_CHANGED,
                        id:suggestionId

                        })   );

}}

export function selectPreviousSuggestion(suggestionId) {
    return (dispatch, getState) =>
    {
        return new Promise((resolve) => { dispatch({
            type: ActionTypes.SUGGESTION_SELECT_PREVIOUS,
            id: suggestionId
        }); resolve(false);} ).then(() => dispatch({
                        type: ActionTypes.SUGGESTIONS_CHANGED,
                        id:suggestionId,

                        })  );
    }
}



export function suggestionChanged(suggestionId){
     return (dispatch, getState) =>
    {


        return dispatch({
            type: ActionTypes.SUGGESTIONS_CHANGED,
            id: suggestionId,

        });



    }

}

function emitCompleteWordSuggestion(suggestionId, term = ''){

    return (dispatch, getState) =>
    {
        var suggestions =getState().suggestions;
        var suggestion =suggestions[suggestionId];
        return dispatch({
            type: ActionTypes.SUGGESTION_COMPLETE_WORD,
            id: suggestionId,
            term: term
        });

}}

function completeWord(suggestionId, term = ''){
    return (dispatch, getState) =>
    {
    return dispatch({
                        type: ActionTypes.COMPLETE_WORD,
                        id:suggestionId,
                        term: term

                        });
}}

export function completeWordSuggestion(suggestionId, term = '') {
    return (dispatch, getState) =>
    {
        var suggestions =getState().suggestions;
        var suggestion =suggestions[suggestionId];
        var term_t=term
        return  new Promise((resolve) => { dispatch({
            type: ActionTypes.SUGGESTION_COMPLETE_WORD,
            id: suggestionId,
            term: term
        });resolve(false); }).then(() =>  dispatch({
                        type: ActionTypes.COMPLETE_WORD,
                        id:suggestionId,
                        term: term_t

                        })).then(() => dispatch({
                        type: ActionTypes.SUGGESTIONS_CHANGED,
                        id:suggestionId

                        })   );
    }
}




export function registerSuggestions(suggestionId){
     return {type: ActionTypes.REGISTER_SUGGESTION_BOX,id: suggestionId}



    }


export function unregisterSuggestions(suggestionId){
    return (dispatch, getState) =>
    {
        dispatch({type: ActionTypes.UNREGISTER_SUGGESTION_BOX,id: suggestionId});



    }
}

export function clearSuggestions(suggestionId){
    return (dispatch, getState) =>
    {
        return new Promise((resolve) => { dispatch({type: ActionTypes.SUGGESTION_CLEAR_SUGGESTIONS,id: suggestionId});resolve(false);}).then(() => dispatch({
                        type: ActionTypes.SUGGESTIONS_CHANGED,
                        id:suggestionId

                        })   );



    }
}


export function suggestionPretextChanged(suggestionId,pretext){
    return (dispatch, getState) =>
    {
        return  new Promise((resolve) => { dispatch({type: ActionTypes.SUGGESTION_PRETEXT_CHANGED,
                  id: suggestionId,
                  pretext:pretext});

         resolve(false); }).then(() => dispatch({
                        type: ActionTypes.PRETEXT_CHANGED,
                        id:suggestionId,
                        pretext:pretext

                         })


        ).then(() => dispatch({
                        type: ActionTypes.SUGGESTIONS_CHANGED,
                        id:suggestionId

                        }   ));



    }
}


export function handlePretextChanged(suggestionId,pretext)
{

    return (dispatch, getState) =>
        {
            if (pretext.startsWith('/')) {

          httpGet(`/api/v1/commands/${CommandSuggestion}/`)
          .then((data) => {

                      var matches = [];
                data.forEach((cmd) => {
                    if (('/' + cmd.trigger).indexOf(command) === 0) {
                        let s = '/' + cmd.trigger;
                        let hint = '';
                        if (cmd.auto_complete_hint && cmd.auto_complete_hint.length !== 0) {
                            hint = cmd.auto_complete_hint;
                        }
                        matches.push({
                            suggestion: s,
                            hint,
                            description: cmd.auto_complete_desc
                        });
                    }
                });

                matches = matches.sort((a, b) => a.suggestion.localeCompare(b.suggestion));

                // pull out the suggested commands from the returned data
                const terms = matches.map((suggestion) => suggestion.suggestion);

                if (terms.length > 0) {
                    return dispatch({
                        type: ActionTypes.SUGGESTION_RECEIVED_SUGGESTIONS,
                        id: suggestionId,
                        matchedPretext: command,
                        terms:terms,
                        items: matches,
                        component:component
                    }).then( () => {

                        dispatch({
                            type: ActionTypes.SUGGESTIONS_CHANGED,
                            id: suggestionId

                        })
                }
                    );
                }


          });
        }
            }






}

export function setMatchedPretext(suggestionId, text){

    return (dispatch, getState) =>
    {
        dispatch({type: ActionTypes.SET_MATCHED_PRETEXT,id: suggestionId,text: text});



    }

}

export function addSuggestions(suggestionId,  terms, items, component){

    return (dispatch, getState) =>
    {
        dispatch({type: ActionTypes.ADD_SUGGESTIONS,id: suggestionId,terms:terms, items: items, component:component});



    }

}

export function clearSelection(suggestionId){

    return (dispatch, getState) =>
    {
        dispatch({type: ActionTypes.CLEAR_SELECTION,id: suggestionId});



    }

}




