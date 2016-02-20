var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var ThreadStore = require('../stores/ThreadStore');
var assign = require('object-assign');
var _ = require("lodash");
var ContactStore = require('../stores/ContactStore');
var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'user_change';

var _me={};

var fetchAvatar = require('../helpers/fetchAvatar');

var UserStore = assign({}, EventEmitter.prototype, {

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

    get: function() {
        return _me;
    },
    stremUrl: function(){
        return URL.createObjectURL(_me.stream);

    },

    cameraOn: function () {
        getUserMedia(function (err, stream) {
            if (err) {
                console.error(err);
            } else {
                _me.stream = stream;
            }
        });
    },
    cameraOff: function () {
        if (_me.stream) {
            _me.stream.stop();
            _me.stream = null;
        }
    },

    updateIdlePresence: function () {
        var update = {
            status: _me.status,
            show: _me.show,
            caps: app.api.disco.caps
        };

        if (!app.state.active) {
            update.idle = {since: app.state.idleSince};
        }

        app.api.sendPresence(update);
    },


    save: function () {

    var data = {
        jid: _me.jid.bare,
        avatarID: _me.avatarID,
        status: _me.status,
        rosterVer: _me.rosterVer
    };
    app.storage.profiles.set(data);
},

    load: function () {


        var self = this;

        app.storage.profiles.get(app.jid, function (err, profile) {
            if (!err) {
                _me.status = profile.status;
                _me.avatarID = profile.avatarID;
                self.save();

                client.sendPresence({
                    status: _me.status,
                    caps: client.disco.caps
                });
                window.me=_me;
            }

           /*
           put in contacts model
           app.storage.roster.getAll(me.jid.bare, function (err, contacts) {
                if (err) return;

                contacts.forEach(function (contact) {
                    contact = new Contact(contact);
                    contact.owner = self.jid.bare;
                    contact.inRoster = true;
                    contact.save();
                    self.contacts.add(contact);
                });

                self.contacts.trigger('loaded');*/
            });
        },

    setAvatar: function (id, type, source) {

        fetchAvatar('', id, type, source, function (avatar) {
            _me.avatarID = avatar.id;
            _me.avatar = avatar.uri;
        });
}




});

UserStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;
    AppDispatcher.waitFor([ContactStore.dispatchToken]);

    switch(action.type) {

        case ActionTypes.USER_CHANGE_JID:
            UserStore.load();
            UserStore.emitChange();
            break;
        case ActionTypes.USER_CHANGE_ACTIVE:
            UserStore.updateIdlePresence();
            UserStore.emitChange();
            break;
        case ActionTypes.USER_CHANGE_STATUS:
            UserStore.emitChange();
            //UserStore.save();
            break;
        case ActionTypes.USER_CHANGE_ROSTER_VERSION:
            UserStore.emitChange();
            //UserStore.save();
            break;
        case ActionTypes.USER_CHANGE_AVATARID:
            //UserStore.save();
            UserStore.emitChange();

            break;
        case ActionTypes.CLIENT_ON_SESSION_STARTED:
            UserStore.load();

            break;

        case ActionTypes.CLIENT_ON_CREDENTIALS_UPDATE:
            creds=action.creds;
            if (creds.clientKey && creds.serverKey) {
                delete creds.password;
                delete creds.saltedPassword;
            } else if (creds.saltedPassword) {
                delete creds.password;
            }

            localStorage.config = JSON.stringify({
                jid: client.config.jid.bare,
                server: client.config.server,
                wsURL: client.config.wsURL,
                credentials: creds
            });



            break;





        default:
        // do nothing
    }

});

module.exports = UserStore;
