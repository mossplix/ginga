import ActionTypes  from '../constants';
var _contacts={};
var contactSchema = require('../models/contact');
const ContactSchema = {
    fetching: true,
    id: '',
    avatarID: '',
    groups:  [],
    inRoster:  false,
    jid: true,
    name:  '',
    owner:  '',
    storageId:  '',
    subscription: 'none',
    activeContact:  false,
    avatar: '',
    avatarSource: '',
    lastInteraction: '',
    lastHistoryFetch: '',
    lastSentMessage: '',
    lockedResource: '',
    offlineStatus:  '',
    topResource: '',
    unreadCount:  0,
    _forceUpdate:  0,
    onCall:  false,
    stream: {},
};


function chatState() {
            var states = {};
            this.resources.forEach(function (resource) {
                states[resource.chatState] = true;
            });

            if (states.composing) return 'composing';
            if (states.paused) return 'paused';
            if (states.active) return 'active';
            if (states.inactive) return 'inactive';
            return 'gone';

    }

       function formattedTZO() {
          var localTime = new Date();
            if (!this.timezoneOffset) {
              this.timezoneOffset=localTime.getTimezoneOffset();
            };


            var localTZO = localTime.getTimezoneOffset();
            var diff = Math.abs(localTZO  % (24 * 60) - this.timezoneOffset % (24 * 60));
            var remoteTime = new Date(Date.now() + diff * 60000);


            var day = remoteTime.getDate();
            var hour = remoteTime.getHours();
            var minutes = remoteTime.getMinutes();

            var days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

            var dow = days[remoteTime.getDay()];
            var localDow = days[localTime.getDay()];

            var m = (hour >= 12) ? ' PM' : ' AM';

            hour = hour % 12;
            if (hour === 0) {
                hour = 12;
            }

            var strDay = (day < 10) ? '0' + day : day;
            var strHour = (hour < 10) ? '0' + hour : hour;
            var strMin = (minutes < 10) ? '0' + minutes: minutes;

            if (localDow == dow) {
                return strHour + ':' + strMin + m;
            } else {
                return dow + ' ' + strHour + ':' + strMin + m;
            }

    }

 function call() {
        if (this.jingleResources.length) {
            var peer = this.jingleResources[0];
            this.callState = 'starting';
            app.api.call(peer.id);
        } else {
            logger.error('no jingle resources for this user');
        }
    }

    function onResourceChange () {
        this.resources.sort();
        this.topResource = (this.resources.first() || {}).id;
        this._forceUpdate++;
    }
    function onResourceListChange() {
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
    }



 function setAvatar() {
        var self=this;
        var contact = self;
        var type = 'image/png';
        var source='vcard';
        self=this;
        id=self.avatarID||" ";
        fetchAvatar(contact.jid, id, type, source, function (avatar) {
            if (source == 'vcard' && self.avatarSource == 'pubsub') return;
            contact.avatarID = avatar.id;
            contact.avatar = avatar.uri;
            contact.avatarSource = source;
            _contacts[self.jid]=contact;
            contact.save();
        });
    }







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

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
      case ActionTypes.CURRENT_USER:
          var ct= new contactSchema();
          var jid = action.currentUser.jid;
          var me =Object.assign({},ct,action.currentUser);
          return { ...state, [jid]:me  };
    case ActionTypes.LOAD_CONTACTS:
            var roster= action.contacts;


          return action.contacts.reduce(
        (contactsByID, contact) => {
          contactsByID[contact.jid] = contact
          return contactsByID;
        },
        {...state}
      );



      case ActionTypes.CLIENT_ON_CONTACT:
            return { ...state };
      case ActionTypes.CLIENT_ON_JINGLE_INCOMING:

          return { ...state };


        case ActionTypes.CLIENT_ON_SESSION_STARTED:
            //contactUtils.getRoster();
             return { ...state};

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

             return { ...state};

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
                       // ResourceStore.set(pres.from.bare,"pres",pres);
                    } else {


                        //XmppUtils.createResource(pres,pres.from.bare);
                    }

                    var muc = pres.muc || {};
                    if (muc.codes && muc.codes.indexOf('110') >= 0) {
                        contact.joined = true;
                    }

                    _contacts[pres.from.bare]=contact;

                }


             return { ...state};

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
                 return { ...state};

                case ActionTypes.CLIENT_ON_AVATAR:
                    var info = action.info;


                    var contact = state[info.jid.bare];

                    var id = '';
                    var type = 'image/png';
                    if (info.avatars.length > 0) {
                        id = info.avatars[0].id;
                        type = info.avatars[0].type || 'image/png';
                    }



                 return { ...state,[action.jid]: state[action.jid] || null,};
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
                     return { ...state};


    default:
      return state;
  }
}