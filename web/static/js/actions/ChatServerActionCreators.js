
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/Constants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  receiveAll: function(rawMessages) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_MESSAGES,
      rawMessages: rawMessages
    });
  },



  receiveCreatedMessage: function(createdMessage) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
      rawMessage: createdMessage
    });
  }


};
