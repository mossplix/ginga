import ActionTypes  from '../constants';

const initialState = {
  fetching: true
};

function stremUrl(){
        return URL.createObjectURL(_me.stream);

    }

function cameraOn() {
        getUserMedia(function (err, stream) {
            if (err) {
                console.error(err);
            } else {
                _me.stream = stream;
            }
        });
}
function cameraOff() {
        if (_me.stream) {
            _me.stream.stop();
            _me.stream = null;
        }
}

function updateIdlePresence() {
        var update = {
            status: _me.status,
            show: _me.show,
            caps: app.api.disco.caps
        };

        if (!app.state.active) {
            update.idle = {since: app.state.idleSince};
        }

        app.api.sendPresence(update);
}


function save() {

    var data = {
        jid: _me.jid.bare,
        avatarID: _me.avatarID,
        status: _me.status,
        rosterVer: _me.rosterVer
    };
    app.storage.profiles.set(data);
}

function load() {


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
}

function setAvatar(id, type, source) {

        fetchAvatar('', id, type, source, function (avatar) {
            _me.avatarID = avatar.id;
            _me.avatar = avatar.uri;
        });
}


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.USER_CHANGE_JID:
            //UserStore.load();
            return { ...state };
        case ActionTypes.USER_CHANGE_ACTIVE:
            //UserStore.updateIdlePresence();
          
            return { ...state };
        case ActionTypes.USER_CHANGE_STATUS:
          
            //UserStore.save();
            return { ...state };
        case ActionTypes.USER_CHANGE_ROSTER_VERSION:
          
            //UserStore.save();
            return { ...state };
        case ActionTypes.USER_CHANGE_AVATARID:
            //UserStore.save();
          

            return { ...state };
        case ActionTypes.CLIENT_ON_SESSION_STARTED:
            //UserStore.load();

            return { ...state };

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



            return { ...state };


    default:
      return state;
  }
}