

var ChatAppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var ThreadStore = require('../stores/ThreadStore');
var MucStore = require('../stores/MucStore');
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'chat_change';
var _Chat={};
var ChatTypeStore = assign({}, EventEmitter.prototype, {

    init: function(){
        var mucs = MucStore.getAll();

        _Chat={type:mucs[0],chattype:"groupchat",id:mucs[0].jid}
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    set:function(chat){
        _Chat=chat;
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    getCurrent: function()
    {
      return _Chat;
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});

ChatTypeStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
    ChatAppDispatcher.waitFor([
        ThreadStore.dispatchToken,
        MucStore.dispatchToken
    ]);

    var action = payload.action;
    switch (action.type) {

        case ActionTypes.CLICK_THREAD:
            _Chat={chattype:"chat",type:ThreadStore.getCurrent(),id:ThreadStore.getCurrentID()};
            ChatTypeStore.emitChange();
            break;

        case ActionTypes.CLICK_CHANNEL:
           _Chat={type:MucStore.getCurrent(),chattype:"groupchat",id:MucStore.getCurrentChannelId()};
            console.log(_Chat);
            ChatTypeStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_MUCS:
            ChatAppDispatcher.waitFor([MucStore.dispatchToken]);
            ChatTypeStore.init();
            ChatTypeStore.emitChange();
            break;




        default:
        // do nothing
    }
});

ChatTypeStore.setMaxListeners(0);
module.exports = ChatTypeStore;
