var ChatAppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var ThreadStore = require('../stores/ThreadStore');
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'state_change';

window._state={};
var _xmpp_connected={};
var _active={};
var _idleSince={};
var StateStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },


    markInactive: function () {
        if (this.focused) {
            return this.markActive();
        }

        _active = false;
        _idleSince = new Date(Date.now());
    }

});

StateStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case ActionTypes.CLIENT_ON_DISCONNECTED:
            _xmpp_connected=true;
            StateStore.emitChange();
            break;

        case  ActionTypes.CLIENT_ON_STREAM_MANAGEMENT_RESUMED:
            _xmpp_connected=true;
            StateStore.emitChange();
            break;
        case ActionTypes.CLIENT_ON_SESSION_STARTED:
            _xmpp_connected=true;
            client.sendPresence();
            StateStore.emitChange();
            break;








        default:
        // do nothing
    }

});

module.exports = StateStore;
