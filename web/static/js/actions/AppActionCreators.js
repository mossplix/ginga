

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/Constants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

    appLoaded: function(app,title,desc) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.APP_LOADED,
            app: app,
            title: title,
            desc: desc
        });
    }

};
