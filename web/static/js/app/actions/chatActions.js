import ActionTypes  from '../constants';


export function clickChannel(channelID) {
        dispatch({
            type: ActionTypes.CLICK_CHANNEL,
            channelID: channelID
        });
    }


export function clickThread(threadID) {
    dispatch({
      type: ActionTypes.CLICK_THREAD,
      threadID: threadID
    });
  }


export function createMessage(text, chat) {
    var message = ChatMessageUtils.getRawMessageData(text, chat);
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
  },



  export function receiveCreatedMessage(createdMessage) {
    dispatch({
      type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
      rawMessage: createdMessage
    });
  }