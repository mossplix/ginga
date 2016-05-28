import ActionTypes  from '../constants';




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

function getThread(message){
     var jid=store.getState().xmpp.jid;
      var threadID = message.from;
      if (threadID === jid)
      {
        threadID = message.to
      }
    return threadID;

}


function toThreads(messages) {
      if (typeof messages != 'undefined'){

          var jid=store.getState().xmpp.jid;
          var _currentID = store.getState().currentChat.id;
          var _threads={};

          messages.forEach(function (message) {
              if (message.type === "chat") {

                  var threadID = message.from;
                  if (threadID === jid)
                  {

                    threadID = message.to

                  }


                  var thread = _threads[threadID];
                  if (thread && thread.lastTimestamp > message.created) {
                      return;
                  }
                  _threads[threadID] = {
                      id: threadID,
                      name: threadID ,
                      lastMessage: message
                  };
              }});


          if  (_currentID && _threads[_currentID] && typeof _threads[_currentID].lastMessage != null ) {
              _threads[_currentID].lastMessage.isRead = true;
          }
      }
    return _threads;
  }


function getAllChrono(_threads) {
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
  }



  function getCurrentID() {
    return _currentID;
  }

  function getCurrent() {
    return this.get(this.getCurrentID());
  }


export default function reducer(state = {}, action = {}) {
  switch (action.type) {
      case ActionTypes.CLICK_THREAD:
        var thread= state[action.threadID]
        if (typeof thread  != 'undefined') {
            if (thread.lastMessage) {
                thread.lastMessage.isRead = true;
            }
        }
      return { ...state,[action.threadID]:thread };

    case ActionTypes.LOAD_MESSAGES:
      var th=toThreads(action.messages);

      return {...state,...th};

      case ActionTypes.RECEIVE_RAW_MESSAGE:
        var msg=action.msg;
        var message = msg;//ChatMessageUtils.convertDbMessage(msg,{});
        thread=_threads[message.from]
        thread.lastMessage=message;
        _threads[message.from]=thread;

        return { ...state };

      case ActionTypes.LOAD_CONTACTS:
          var roster= action.rawContacts;
          _addToThread(roster);
          return { ...state };
       case ActionTypes.CLIENT_ON_CHAT:
            var msg = action.msg;
            var id = getThread(msg);

            return {...state,[id]:{id:id,name:id,lastMessage:action.msg}};


      case ActionTypes.CLIENT_ON_GROUPCHAT:
          var msg=action.msg;
           var id = getThread(msg);

           return {...state,[id]:{id:id,name:id,lastMessage:action.msg}};

      case ActionTypes.MESSAGE_SENT:
          var msg=action.message;
          var id = getThread(msg);

          return {...state,[id]:{id:id,name:id,lastMessage:action.message}};

    default:
      return state;
  }
}