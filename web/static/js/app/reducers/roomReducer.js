import ActionTypes  from '../constants';
import {fetchHistory}  from '../actions/xmppActions';

const initialState = {
  fetching: true
};

var local={
    initialized: !1,
    user_state: "active",
    active_type: "",
    profile_jids: [],
    sent_msg_ids: [],
    participants: [],
    received_mids: [],
    history_fetch_id: 0,
    chat_states: ["active", "inactive", "composing", "gone"]
};

var defaults = {
    room: {
        admins: [],
        participants: {
            members: [],
            guests: []
        },
        files: [],
        links: [],
        is_archived: "0",
        history_fetch_ids: [],
        show_join_messages: !1,
        guest_mention_regex: null,
        presence: {
            show: "",
            status: "",
            seconds: "",
            idleTime: ""
        }
    },
    roster: {
        presence: {
            show: "unknown",
            status: "",
            seconds: "",
            idleTime: ""
        }
    }
};





function addMessage(id,message, notify) {
        muc=_mucs[id];
        message.owner = app.me;

        var mine = message.from.resource === muc.nick;

        if (mine) {
            message._mucMine = true;
        }
        if (!mine && message.body.toLowerCase().indexOf(muc.nick.toLowerCase()) >= 0) {
            message.mentions = this.nick;
        }

        if (notify && (!this.activeContact || (this.activeContact && !app.state.focused)) && !mine) {
            muc.unreadCount++;
            if (message.mentions) {
                app.notifications.create(muc.displayName, {
                    body: message.body,
                    icon: muc.avatar,
                    tag: muc.id
                    //onclick: _.bind(app.navigate, app, '/groupchat/' + this.jid)
                });
            }
        }

        message.acked = true;
        message.save();

        if (mine) {
            muc.lastSentMessage = message;
        }

        //this.messages.add(message);

        var newInteraction = new Date(message.created);
        if (!muc.lastInteraction || this.lastInteraction < newInteraction) {
            muc.lastInteraction = newInteraction;
        }
    }






 function joinAndBookmark(rooms) {
        var upRooms =[];
        const {client,user} = store.getState().xmpp;

         if(!client){
             return;
         }

        if(user){

            var nick=user.first_name;
        }else{

            var nick=""

        }

     _.toArray(rooms).forEach(function (room) {
            upRooms.push({
                name: room.name,
                jid: room.jid,
                nick: room.name,
                autoJoin: true
            });
             client.joinRoom(room.jid, nick, {
                history: {
                    maxstanzas: 200
                    //since: this.lastInteraction
                }
        });
          store.dispatch(fetchHistory(room.jid));
        });
        client.setBookmarks({conferences: upRooms});


    }



export default function reducer(rooms = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.CLIENT_SESSION_STARTED:

            return {...rooms};

    case ActionTypes.LOAD_ROOMS:

        var allRooms = action.rooms.reduce(
        (newRooms, room) => {
          newRooms[room.jid] = room
          return newRooms;
        },
        rooms
      );
        joinAndBookmark(allRooms);
        return allRooms;


    case ActionTypes.CLICK_CHANNEL:
        var _currentID = action.channelID;

        return { ...rooms};

    case ActionTypes.CHANNEL_RECEIVE_RAW_MESSAGES:
        //MucStore.init(action.rawMessages);

        return { ...rooms};
    case ActionTypes.RECEIVE_RAW_MUCS:
        _addChannels(action.rawMucs);

        return { ...rooms};

    default:
      return rooms;
  }
}