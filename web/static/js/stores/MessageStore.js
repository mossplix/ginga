

var ChatAppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/Constants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var ThreadStore = require('../stores/ThreadStore');
var MucStore = require('../stores/MucStore');
var ChatTypeStore = require('../stores/ChatTypeStore');
var assign = require('object-assign');
var ChatWebApiUtils = require('../utils/ChatWebAPIUtils');


var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'message_change';

window._messages = {};

function _addMessages(rawMessages) {
    if (typeof rawMessages != 'undefined') {

        rawMessages.forEach(function (message) {
            if (!_messages[message.archivedId]) {
                _messages[message.archivedId] = ChatMessageUtils.convertDbMessage(
                    message,
                ChatTypeStore.getCurrent()
                );
            }
        });
    }
}

function _markAllInThreadRead(threadID) {
  for (var id in _messages) {
    if (_messages[id].threadID === threadID) {
      _messages[id].isRead = true;
    }
  }
}

var MessageStore = assign({}, EventEmitter.prototype, {

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

  get: function(id) {
    return _messages[id];
  },

  getAll: function() {
    return _messages;
  },

  /**
   * @param {string} threadID
   */
  getAllForThread: function(threadID) {
    from_messages=_.where(_messages,{from:threadID,to:app.me});
    my_messages=_.where(_messages,{from:app.me,to:threadID});
    from_messages.concat(my_messages)
    return _.sortByOrder(_.flatten([from_messages,my_messages]),["_created"],[true]);
  },

  getAllForCurrentThread: function() {
    return this.getAllForThread(ChatTypeStore.getCurrent().id);
  },

    correct: function (msg) {
        if (this.from.full !== msg.from.full) return false;

        delete msg.id;

        this.set(msg);
        this._edited = new Date(Date.now());
        this.edited = true;

        this.save();

        return true;
    },
    save: function (msg) {


        var data = {
            archivedId: msg.archivedId || uuid.v4(),
            owner: msg.owner,
            to: msg.to,
            from: msg.from,
            created: msg.created,
            body: msg.body,
            type: msg.type,
            delay: msg.delay,
            edited: msg.edited

        };
        app.storage.archive.add(data);
    },
    shouldGroupWith: function (previous) {
        if (this.type === 'groupchat') {
            return previous && previous.from.full === this.from.full;
        } else {
            return previous && previous.from.bare === this.from.bare;
        }
    },

    getCreatedMessageData: function(text) {
        var timestamp = Date.now();
        return {
            id: 'm_' + timestamp,
            threadID: ThreadStore.getCurrentID(),
            archivedId: this.archivedId || uuid.v4(),
            owner: this.owner,
            to: this.to,
            from: this.from,
            created: this.created,
            body: this.body,
            type: this.type,
            delay: this.delay,
            edited: this.edited
        };
    }

});

MessageStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
  var action = payload.action;
    ChatAppDispatcher.waitFor([ThreadStore.dispatchToken,MucStore.dispatchToken,ChatTypeStore.dispatchToken]);

  switch(action.type) {

    case ActionTypes.CLICK_THREAD:
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      _markAllInThreadRead(ThreadStore.getCurrentID());
      MessageStore.emitChange();
      break;




      case ActionTypes.RECEIVE_RAW_MESSAGE:
          var msg = action.msg;
          var message = ChatWebApiUtils.createMessage(msg);

          _messages[message.archivedId] = ChatMessageUtils.convertDbMessage(
              message,
              ChatTypeStore.getCurrent()
          );
          MessageStore.emitChange();

          break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      _addMessages(action.rawMessages);

      _markAllInThreadRead(ThreadStore.getCurrentID());
      MessageStore.emitChange();
      break;

      case ActionTypes.CLIENT_ON_CHAT:
          var msg = action.msg;

          var thread = ThreadStore.get(msg.from.bare);
          if (thread && !msg.replace) {
              var message = ChatWebApiUtils.createMessage(msg);

              _messages[message.archivedId] = ChatMessageUtils.convertDbMessage(
                  message,
                  ChatTypeStore.getCurrent()
              );
              console.log(
                ChatMessageUtils.convertDbMessage(
                    message,
                    ChatTypeStore.getCurrent()
                )
              );
              MessageStore.emitChange();
              ThreadStore.emitChange();

          }

          break;
      case ActionTypes.CLIENT_ON_GROUPCHAT:
          var msg=action.msg;

          var muc = MucStore.get(msg.from.bare);
          if (muc) {
              var message = ChatWebApiUtils.createMessage(msg);
              //message.acked = true;
              conv_message = ChatMessageUtils.convertDbMessage(
                  message,
                  ChatTypeStore.getCurrent()
              );
              _messages[message.archivedId] = conv_message;
              MessageStore.emitChange();

          }

          break;
      case ActionTypes.CLIENT_ON_REPLACE:
          var msg=action.msg;
          var message = ChatWebApiUtils.createMessage(msg);
          //message.acked = true;
          _messages[message.archivedId] = ChatMessageUtils.convertDbMessage(
              message,
              ChatTypeStore.getCurrent()
          );

          break;
      case ActionTypes.CREATE_MESSAGE:
          var msg=action.message;
          var chat = action.chat;
          res=client.sendMessage(msg);

          if (msg.type === "chat")
          {

          var timestamp = Date.now();
          var data = {
              archivedId: msg.id,
              owner: app.me,
              to: msg.to.jid,
              from: app.me,
              body: msg.body,
              type: msg.type,
              delay: {},
              edited: msg.edited,
              _created: timestamp
          };
          var message = ChatWebApiUtils.createMessage(data);
          //message.acked = true;
          var conv_message = ChatMessageUtils.convertDbMessage(
              message,
              chat
          );


          _messages[message.archivedId] =conv_message;




          MessageStore.emitChange();
        }


          break;
      case ActionTypes.CLIENT_ON_RECEIPT:
          var msg=action.msg;
          break;
      case ActionTypes.CLIENT_ON_CARBON_RECEIVED:
          var carbon = action.carbon;
          var msg = carbon.carbonReceived.forwarded.message;
          var delay = carbon.carbonReceived.forwarded.delay || {};

          if (!delay.stamp) {
              delay.stamp = new Date(Date.now());
          }

          if (!msg._extensions || !msg._extensions.delay) {
              msg.delay = delay;
          }

          var message = ChatWebApiUtils.createMessage(msg);
          //message.acked = true;
          _messages[message.archivedId] = ChatMessageUtils.convertDbMessage(
              message,
              ChatTypeStore.getCurrent()
          );
          MessageStore.emitChange();

          break;
      case ActionTypes.CLIENT_ON_CARBON_SENT:
          var carbon = action.carbon;
          var msg = carbon.carbonSent.forwarded.message;
          var delay = carbon.carbonSent.forwarded.delay || {};
          if (!delay.stamp) {
              delay.stamp = new Date(Date.now());
          }

          if (!msg._extensions || !msg._extensions.delay) {
              msg.delay = delay;
          }

          var message = ChatWebApiUtils.createMessage(msg);
          //message.acked = true;
          _messages[message.archivedId] = ChatMessageUtils.convertDbMessage(
              message,
              ChatTypeStore.getCurrent()
          );
          MessageStore.emitChange();

          break;




    default:
      // do nothing
  }

});
MessageStore.setMaxListeners(0);

module.exports = MessageStore;
