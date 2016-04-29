import ActionTypes  from '../constants';

const initialState = {
  fetching: true
};
   function correct(msg) {
        if (this.from.full !== msg.from.full) return false;

        delete msg.id;

        this.set(msg);
        this._edited = new Date(Date.now());
        this.edited = true;

        this.save();

        return true;
    }
    function save(msg) {


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
       // app.storage.archive.add(data);
    }
    function shouldGroupWith(previous) {
        if (this.type === 'groupchat') {
            return previous && previous.from.full === this.from.full;
        } else {
            return previous && previous.from.bare === this.from.bare;
        }
    }




function _markAllInThreadRead(threadID) {
  for (var id in _messages) {
    if (_messages[id].threadID === threadID) {
      _messages[id].isRead = true;
    }
  }
}




export default function reducer(allMessages = [], action = {}) {
  switch (action.type) {
      case ActionTypes.LOAD_MESSAGES:
       var messages=action.messages;
       return  [...allMessages,...messages];


    case ActionTypes.CLICK_THREAD:

     // _markAllInThreadRead(id);

       return [ ...allMessages];


      case ActionTypes.RECEIVE_RAW_MESSAGE:
          var msg = action.msg;
          //var message = ChatWebApiUtils.createMessage(msg);

          //_messages[message.archivedId] = ChatMessageUtils.convertDbMessage(
          //    message,
          //    ChatTypeStore.getCurrent()
          //);


           return [...allMessages];

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      //_addMessages(action.rawMessages);

      //_markAllInThreadRead(ThreadStore.getCurrentID());
       return [...allMessages];

      case ActionTypes.CLIENT_ON_CHAT:
            var msg = action.msg;
            return [...allMessages,msg];


      case ActionTypes.CLIENT_ON_GROUPCHAT:
          var msg=action.msg;

           return [...allMessages,msg];
      case ActionTypes.CLIENT_ON_REPLACE:
          var msg=action.msg;
          var message = ChatWebApiUtils.createMessage(msg);
          //message.acked = true;
          //_messages[message.archivedId] = ChatMessageUtils.convertDbMessage(
          //    message,null
              //ChatTypeStore.getCurrent()
          //);

           return [...allMessages];
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
          //var message = ChatWebApiUtils.createMessage(data);
          //message.acked = true;
          //var conv_message = ChatMessageUtils.convertDbMessage(
          //    message,
          //    chat
          //);


          _messages[message.archivedId] =conv_message;





        }


           return [...allMessages];
      case ActionTypes.CLIENT_ON_RECEIPT:
          var msg=action.msg;
           return [...allMessages];
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

          //var message = ChatWebApiUtils.createMessage(msg);
          //message.acked = true;
         // _messages[message.archivedId] = ChatMessageUtils.convertDbMessage(
         //     message,
         //     ChatTypeStore.getCurrent()
          //);


           return [...allMessages];
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

          //var message = ChatWebApiUtils.createMessage(msg);
          //message.acked = true;
         // _messages[message.archivedId] = ChatMessageUtils.convertDbMessage(
         //     message,
         //     ChatTypeStore.getCurrent()
          //);


           return [...allMessages];


    default:
      return allMessages;
  }
}


function _updateMessagesWhere(allMessages, where, updates) {
  const newallMessages = [...allMessages];
  const updatedMessages = _.filter(allMessages, where)
    .map(message => ({...message, ...updates}))
    .forEach(message => newallMessages[message.id] = message);

  return newallMessages;
}
