import ActionTypes  from '../constants';
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



function _addChannels(rawChannels) {
    if (typeof rawChannels != 'undefined') {
        rawChannels.forEach(function (channel) {
            XmppUtils.joinMUC(channel);
            if (!_mucs[channel.jid]) {
                channel.contacts=[];
                _mucs[channel.jid] = channel

            }
        });
    }
}


function addNewMuc(channel){
      channel.id=channel.name+"@"+app.host;

      return channel;
    }


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

   function  getCurrentChannelId(){
        return _currentID;

    }

   function  leave () {
        this.resources.reset();
        client.leaveRoom(this.jid, this.nick);
    }

    function fetchAll() {
        var self = this;
        client.getBookmarks(function (err, res) {
            if (err) return;

            var mucs = res.privateStorage.bookmarks.conferences;
            mucs.forEach(function (muc) {
                self.add(muc);
                if (muc.autoJoin) {
                    self.get(muc.jid).join();
                }
            });
        });
    }


 function saveAll(cb) {
        var self = this;

        var models = [];
        self.models.forEach(function (model) {
            models.push({
                name: model.name,
                jid: model.jid,
                nick: model.nick,
                autoJoin: model.autoJoin
            });
        });
        client.setBookmarks({conferences: models}, cb);

    }



export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.CLIENT_SESSION_STARTED:

            return { ...state };

    case ActionTypes.LOAD_ROOMS:
            var roster= action.rooms;


          return action.rooms.reduce(
        (roomsByID, room) => {
          roomsByID[room.jid] = room
          return roomsByID;
        },
        {...state}
      );

    case ActionTypes.CLICK_CHANNEL:
       // _currentID = action.channelID;

        return { ...state };

    case ActionTypes.CHANNEL_RECEIVE_RAW_MESSAGES:
        //MucStore.init(action.rawMessages);

        break;
    case ActionTypes.RECEIVE_RAW_MUCS:
        _addChannels(action.rawMucs);

        return { ...state };

    default:
      return state;
  }
}