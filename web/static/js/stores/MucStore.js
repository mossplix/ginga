var ChatAppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var ThreadStore = require('../stores/ThreadStore');
var XmppUtils = require('../utils/XmppUtils');
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'muc_change';
window._mucs={};
_currentID = null;

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


var MucStore = assign({}, EventEmitter.prototype, {

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
        return _mucs[id];
    },

    getCurrent: function(){
        return _mucs[_currentID];
    },

    addNewMuc: function(channel){
      channel.id=channel.name+"@"+app.host;

      return channel;
    },



    getAll: function() {
        var toret = [];
        for (var id in _mucs) {
                toret.push(_mucs[id]);
        }
        return toret;
    }

    ,
    addMessage: function (id,message, notify) {
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
    },
    getCurrentChannelId:function(){
        return _currentID;

    },
    leave: function () {
        this.resources.reset();
        client.leaveRoom(this.jid, this.nick);
    },

    fetchAll: function () {
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
    },
    saveAll: function (cb) {
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





});

MucStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case ActionTypes.CLIENT_SESSION_STARTED:
            MucStore.emitChange();
            break;
        case ActionTypes.CLICK_CHANNEL:
            _currentID = action.channelID;
            MucStore.emitChange();
            break;

        case ActionTypes.CHANNEL_RECEIVE_RAW_MESSAGES:
            MucStore.init(action.rawMessages);
            MucStore.emitChange();
            break;
        case ActionTypes.RECEIVE_RAW_MUCS:
            _addChannels(action.rawMucs);
            MucStore.emitChange();
            break;


        default:
        // do nothing
    }

});
MucStore.setMaxListeners(0);
module.exports = MucStore;
