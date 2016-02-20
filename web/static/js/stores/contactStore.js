var ChatAppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var XmppUtils = require('../utils/XmppUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'contact_change';
var contactUtils = require('../utils/contactUtils');
window._contacts = {};
var _rosterVer=null;
var ResourceStore = require('../stores/ResourceStore');
var ContactSchema = require("../stores/schema/contact");

var fetchAvatar=require('../helpers/fetchAvatar');
var crypto = require('crypto');



function _addContacts(rawContacts) {
    if (typeof rawContacts != 'undefined') {
        me=new ContactSchema();
        me.jid=app.me;
        me.name= app.config.nickname;
        me.setAvatar();
        _contacts[app.me]=me;

        rawContacts.forEach(function (cont) {
            contact=_.assign(new ContactSchema(),cont);
            contact.fetchHistory();
            contact.setAvatar();

            if (!_contacts[cont.jid]) {

                _contacts[contact.jid] = contact;

            }
        });
    }
}


var ContactStore = assign({}, EventEmitter.prototype, {



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
        return _contacts[id];
    },

    destroy: function(id) {
    delete _contacts[id];
},

    getAll: function() {
        return _contacts;
    },
    call: function () {
        if (this.jingleResources.length) {
            var peer = this.jingleResources[0];
            this.callState = 'starting';
            app.api.call(peer.id);
        } else {
            logger.error('no jingle resources for this user');
        }
    },

    onResourceChange: function () {
        this.resources.sort();
        this.topResource = (this.resources.first() || {}).id;
        this._forceUpdate++;
    },
    onResourceListChange: function () {
        // Manually propagate change events for properties that
        // depend on the resources collection.
        this.resources.sort();

        var res = this.resources.first();
        if (res) {
            this.offlineStatus = '';
            this.topResource = res.id;
        } else {
            this.topResource = undefined;
        }

        this.lockedResource = undefined;
    },


    setAvatar: function (contact_id,id, type, source) {
        var contact = _contacts[contact_id];
        self=this;
        fetchAvatar(contact.jid, id, type, source, function (avatar) {
            if (source == 'vcard' && self.avatarSource == 'pubsub') return;
            contact.avatarID = avatar.id;
            contact.avatar = avatar.uri;
            contact.avatarSource = source;
            _contacts[contact_id]=contact;
            contact.save();

        });
    },



});

ContactStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case ActionTypes.RECEIVE_RAW_CONTACTS:
            var roster= action.rawContacts;
            _addContacts(roster);
            ContactStore.emitChange();
            break;


        case ActionTypes.CLIENT_ON_SESSION_STARTED:
            contactUtils.getRoster();
            break;

        case ActionTypes.CLIENT_ON_ROSTER_UPDATE:
            var iq=action.iq;
            var roster = iq.roster.items;

            _rosterVer = iq.roster.ver;

            _.each(roster, function (item) {
                var contact = _contacts[item.jid];

                if (item.subscription === 'remove') {
                    if (contact) {
                        delete _contacts[item.jid];
                    }
                    return;
                }});
                ContactStore.emitChange();
            break;

        case ActionTypes.CLIENT_ON_AVAILABLE:
                var pres =action.pres;

                var contact = _contacts[pres.from.bare];

                if (contact) {
                    delete pres.id;
                    pres.show = pres.show || '';
                    pres.status = pres.status || '';
                    pres.priority = pres.priority || 0;

                    var resource = ResourceStore.get(pres.from.bare);
                    if (resource) {
                        pres.from = pres.from.full;
                        // Explicitly set idleSince to null to clear
                        // the model's value.
                        if (!pres.idleSince) {
                            pres.idleSince = null;
                        }
                        ResourceStore.set(pres.from.bare,"pres",pres);
                    } else {


                        XmppUtils.createResource(pres,pres.from.bare);
                    }

                    var muc = pres.muc || {};
                    if (muc.codes && muc.codes.indexOf('110') >= 0) {
                        contact.joined = true;
                    }

                    _contacts[pres.from.bare]=contact;

                }

            ContactStore.emitChange();
            break;

            case ActionTypes.CLIENT_ON_UNAVALILABLE:
                var pres =action.pres;

                var contact = _contacts[pres.from.bare];
                if (contact) {
                    var resource = ResourceStore.get(pres.from.full);
                    if (resource) {
                        if (resource.id === contact.lockedResource) {
                            contact.lockedResource = '';
                        }

                        if (contact.resources.length === 1) {
                            contact.offlineStatus = pres.status;
                        }
                        delete contact.resources[resource.id];
                    }

                    var muc = pres.muc || {};
                    if (muc.codes && muc.codes.indexOf('110') >= 0) {
                        contact.joined = false;
                    }

                    _contacts[pres.from.bare]=contact;
                }
                break;

                case ActionTypes.CLIENT_ON_AVATAR:
                    var info = action.info;


                    var contact = _contacts[info.jid.bare];
                    if (!contact) {
                        if (app.jid === info.jid) {
                            contact = _contacts[app.jid];
                        } else {
                            return;
                        }
                    }

                    var id = '';
                    var type = 'image/png';
                    if (info.avatars.length > 0) {
                        id = info.avatars[0].id;
                        type = info.avatars[0].type || 'image/png';
                    }


                ContactStore.setAvatar(info.jid.bare,id, type, info.source);

                ContactStore.emitChange();

                break;
                case ActionTypes.CLIENT_ON_CHAT_STATE:
                    var info = action.info;
                     var me= new RegExp(app.jid);

                    var contact = _contacts[info.from.bare];
                    if (contact) {
                        var resource = contact.resources[info.from.full];
                        if (resource) {
                            resource.chatState = info.chatState;
                            if (info.chatState === 'gone') {
                                contact.lockedResource = undefined;
                            } else {
                                contact.lockedResource = info.from.full;
                            }



                        }
                    } else if (me.test(info.from.bare)) {
                        if (info.chatState === 'active' || info.chatState === 'composing') {
                            contact = contactStore.get(info.to.bare);
                            if (contact) {
                                contact.unreadCount = 0;
                            }
                        }
                    }
                    _contacts[info.from.bare]=contact;
                    break;



        default:
        // do nothing
    }

});

ContactStore.setMaxListeners(0);

module.exports = ContactStore;
