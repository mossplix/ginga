var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

    receiveContacts: function(rawContacts) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_RAW_CONTACTS,
            rawContacts: rawContacts
        });
    },



    receiveCreatedContact: function(createdContact) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_RAW_CREATED_CONTACTS,
            createdContact: createdContact
        });
    },

    receiveMucs: function(rawMucs) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_RAW_MUCS,
            rawMucs: rawMucs
        });
    },



    receiveCreatedMuc: function(createdMuc) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_RAW_CREATED_MUC,
            createdMuc: createdMuc
        });
    }




};
