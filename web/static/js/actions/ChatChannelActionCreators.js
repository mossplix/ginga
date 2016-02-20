

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/Constants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

    clickChannel: function(channelID) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.CLICK_CHANNEL,
            channelID: channelID
        });
    }

};
