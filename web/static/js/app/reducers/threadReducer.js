import ActionTypes  from '../constants';

const initialState = {
  fetching: true
};

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


function init(rawMessages) {
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
  }


function getAllChrono() {
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


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.CLICK_THREAD:
        _currentID = action.threadID;
        if (typeof _threads[_currentID] != 'undefined') {
            if (_threads[_currentID].lastMessage) {
                _threads[_currentID].lastMessage.isRead = true;
            }
        }
      return { ...state };

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      return { ...state };

      case ActionTypes.RECEIVE_RAW_MESSAGE:
        var msg=action.msg;
        var message = msg;//ChatMessageUtils.convertDbMessage(msg,{});
        thread=_threads[message.from]
        thread.lastMessage=message;
        _threads[message.from]=thread;

        return { ...state };

      case ActionTypes.RECEIVE_RAW_CONTACTS:
          var roster= action.rawContacts;
          _addToThread(roster);
          return { ...state };

    default:
      return state;
  }
}