import ActionTypes  from '../constants';
var messageSchema = require("../models/message");

var Message = new messageSchema();

const initialState = {
  fetching: true
};

function convMessage(msg){
      var ts = Date.now();
      var timestamp;
      if (msg.delay){
          timestamp=msg.delay.stamp;
      }
    else{
          timestamp=ts;
      }
      var data = {
          archivedId: msg.id || uuid.v4(),
          owner: msg.owner||msg.from.bare,
          to: msg.to.bare,
          text:msg.body,
          from: msg.from.bare,
          body: msg.body,
          type: msg.type,
          delay: msg.delay,
          edited: msg.edited,
          created: msg.timestamp||timestamp,
          from_full: msg.from,
          to_full:msg.to
      };
      return Object.assign({},Message,msg,data);

}

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



export  const draftStore = function  reducer(state = {message: '', uploadsInProgress: [], previews: []}, action = {}) {
     switch (action.type) {

         case ActionTypes.CLIENT_ON_DISCONNECTED:

            return { ...state, xmpp_connected:true  };

        case  ActionTypes.CLIENT_ON_STREAM_MANAGEMENT_RESUMED:

            return { ...state, xmpp_connected:true  };
        case ActionTypes.CLIENT_ON_SESSION_STARTED:

            return { ...state, xmpp_connected:true  };

        case ActionTypes.SEARCH:
          return {
            ...state,
            searchQuery: action.searchQuery,
          };


    default:
      return state;
  }
}


export const   messageStore = function reducer(state = {lastPost:null}, action = {}) {
     switch (action.type) {

         case ActionTypes.CLIENT_ON_DISCONNECTED:

            return { ...state, xmpp_connected:true  };

        case  ActionTypes.CLIENT_ON_STREAM_MANAGEMENT_RESUMED:

            return { ...state, xmpp_connected:true  };
        case ActionTypes.CLIENT_ON_SESSION_STARTED:

            return { ...state, xmpp_connected:true  };

        case ActionTypes.SEARCH:
          return {
            ...state,
            searchQuery: action.searchQuery,
          };


    default:
      return state;
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
      case ActionTypes.MESSAGE_SENT:

          return [...allMessages,action.message];

      case ActionTypes.CREATE_MESSAGE:

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
          var msg = convMessage(carbon.carbonSent.forwarded.message);

          return [...allMessages,msg];


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
