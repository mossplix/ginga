

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/Constants');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var ChatMessageUtils = require('../utils/ChatMessageUtils');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  createMessage: function(text, chat) {
    var message = ChatMessageUtils.getRawMessageData(text, chat);
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_MESSAGE,
      message: message,
      chat: chat,

    });
  },

    receiveRawMessage: function(msg) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.RECEIVE_RAW_MESSAGE,
            msg: msg

        });
    }

};
