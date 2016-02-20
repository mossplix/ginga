

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/Constants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  clickThread: function(threadID) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CLICK_THREAD,
      threadID: threadID
    });
  }

};
