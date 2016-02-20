

var ChatAppDispatcher = require('../dispatcher/AppDispatcher');
var MucStore = require('../stores/MucStore');
var ContactStore = require('../stores/ContactStore');
var ChatConstants = require('../constants/Constants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var ChatWebApiUtils = require('../utils/ChatWebAPIUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'thread_change';

var _currentID = null;
window._threads = {};



function _addToThread(roster){
    if (typeof roster != 'undefined'){
        roster.forEach(function (contact) {

                var threadID = contact.jid;
                var thread = _threads[threadID];
                if (thread) {
                    return;
                }

                _threads[threadID] = {
                    id: threadID,
                    name: contact.jid,
                    lastMessage: null
                };
            }, this);



}}

var ThreadStore = assign({}, EventEmitter.prototype, {

  init: function(rawMessages) {
      if (typeof rawMessages != 'undefined'){
        console.log(rawMessages);
          rawMessages.forEach(function (message) {
              if (message.type === "chat") {

                if (message.from.parts === undefined){
                  var threadID = message.from;
                  if (threadID === app.me)
                  {
                    if ((typeof message.to) === "object")
                    {
                    threadID = message.to.jid
                  }
                  else{
                    threadID = message.to
                  }
                  }
                }
                else{
                  var threadID = message.from.parts.bare;
                  if (threadID === app.me)
                  {
                    threadID = message.to.parts.bare;
                  }
                }


                  var thread = _threads[threadID];
                  if (thread && thread.lastTimestamp > message.created) {
                      return;
                  }
                  _threads[threadID] = {
                      id: threadID,
                      name: threadID ,
                      lastMessage: ChatMessageUtils.convertDbMessage(message, _currentID)
                  };
              }}, this);


          if  (_currentID && _threads[_currentID] && typeof _threads[_currentID].lastMessage != null ) {
              _threads[_currentID].lastMessage.isRead = true;
          }
      }
  },



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

  /**
   * @param {string} id
   */
  get: function(id) {
    return _threads[id];
  },


  getAll: function() {
    return _threads;
  },

  getAllChrono: function() {
    var orderedThreads = [];
    for (var id in _threads) {
      var thread = _threads[id];
      orderedThreads.push(thread);
    }
    orderedThreads.sort(function(a, b) {
        if (!a.lastMessage === null) {

            if (a.lastMessage._created < b.lastMessage._created) {
                return -1;
            } else if (a.lastMessage._created > b.lastMessage._created) {
                return 1;
            }
        }else{
            return -1;
        }
      return 0;

    });
    return orderedThreads;
  },

  getCurrentID: function() {
    return _currentID;
  },

  getCurrent: function() {
    return this.get(this.getCurrentID());
  }

});

ThreadStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
    ChatAppDispatcher.waitFor([ContactStore.dispatchToken,MucStore.dispatchToken]);
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CLICK_THREAD:
        _currentID = action.threadID;
        if (typeof _threads[_currentID] != 'undefined') {
            if (_threads[_currentID].lastMessage) {
                _threads[_currentID].lastMessage.isRead = true;
            }
        }
      ThreadStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      ThreadStore.init(action.rawMessages);
      ThreadStore.emitChange();
      break;

      case ActionTypes.RECEIVE_RAW_MESSAGE:
        msg=action.msg;
        var message = ChatMessageUtils.convertDbMessage(msg,{});
        thread=_threads[message.from]
        thread.lastMessage=message;
        _threads[message.from]=thread;

        ThreadStore.emitChange();
        break;

      case ActionTypes.RECEIVE_RAW_CONTACTS:
          var roster= action.rawContacts;
          _addToThread(roster);
          ThreadStore.emitChange();
          break;

    default:
      // do nothing
  }

});
ThreadStore.setMaxListeners(0);
module.exports = ThreadStore;
