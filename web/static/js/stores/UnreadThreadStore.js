

var ChatAppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var MessageStore = require('../stores/MessageStore');
var ThreadStore = require('../stores/ThreadStore');
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'unread_thread_change';

var UnreadThreadStore = assign({}, EventEmitter.prototype, {

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
    var threads = ThreadStore.getAll();
    var unreadCount = 0;

    return unreadCount;
  }

});

UnreadThreadStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
  ChatAppDispatcher.waitFor([
    ThreadStore.dispatchToken,
    MessageStore.dispatchToken
  ]);

  var action = payload.action;
  switch (action.type) {

    case ActionTypes.CLICK_THREAD:
      UnreadThreadStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      UnreadThreadStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = UnreadThreadStore;
