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