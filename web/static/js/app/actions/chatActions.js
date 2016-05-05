import ActionTypes  from '../constants';
import { push }           from 'react-router-redux';

export function clickChannel(channelID) {

    return dispatch => {
        dispatch({
            type: ActionTypes.CLICK_CHANNEL,
            channelID: channelID
        });

    dispatch(push(`/chat/channels/${channelID}`));
    }}


export function clickThread(threadID) {
    return dispatch => {
    dispatch({
      type: ActionTypes.CLICK_THREAD,
      threadID: threadID
    });

    dispatch(push(`/chat/threads/${threadID}`));


  }}


export function createMessage(text, chat) {
    dispatch({
      type: ActionTypes.CREATE_MESSAGE,
      message: message,
      chat: chat,

    });
  }

export function    receiveRawMessage(msg) {
        dispatch({
            type: ActionTypes.RECEIVE_RAW_MESSAGE,
            msg: msg

        });
    }

export function receiveAll(rawMessages) {
    dispatch({
      type: ActionTypes.RECEIVE_RAW_MESSAGES,
      rawMessages: rawMessages
    });
  }



  export function receiveCreatedMessage(createdMessage) {
    dispatch({
      type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
      rawMessage: createdMessage
    });
  }


export function suggestionPretextChanged(suggestionId, pretext) {
    dispatch({
        type: ActionTypes.SUGGESTION_PRETEXT_CHANGED,
        id: suggestionId,
        pretext
    });
}

export function selectNextSuggestion(suggestionId) {
    dispatch({
        type: ActionTypes.SUGGESTION_SELECT_NEXT,
        id: suggestionId
    });
}

export function selectPreviousSuggestion(suggestionId) {
    dispatch({
        type: ActionTypes.SUGGESTION_SELECT_PREVIOUS,
        id: suggestionId
    });
}

export function completeWordSuggestion(suggestionId, term = '') {
    dispatch({
        type: Constants.ActionTypes.SUGGESTION_COMPLETE_WORD,
        id: suggestionId,
        term
    });
}

export function clearSuggestions(suggestionId) {
    dispatch({
        type: Constants.ActionTypes.SUGGESTION_CLEAR_SUGGESTIONS,
        id: suggestionId
    });
}