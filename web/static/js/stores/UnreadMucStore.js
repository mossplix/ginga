
var ChatAppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var MessageStore = require('../stores/MessageStore');
var MucStore = require('../stores/MucStore');
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'unread_muc_change';

var UnreadMucStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getCount: function() {
        var threads = MucStore.getAll();
        var unreadCount = 0;
        //use xmpp
        return unreadCount;
    }

});

UnreadMucStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
    ChatAppDispatcher.waitFor([
        MucStore.dispatchToken,
        MessageStore.dispatchToken
    ]);

    var action = payload.action;
    switch (action.type) {

        case ActionTypes.CLICK_CHANNEL:
            UnreadMucStore.emitChange();
            break;

        case ActionTypes.MUC_RECEIVE_RAW_MESSAGES:
            UnreadMucStore.emitChange();
            break;

        default:
        // do nothing
    }
});

module.exports = UnreadMucStore;
