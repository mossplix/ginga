var ChatAppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var ThreadStore = require('../stores/ThreadStore');
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'call_change';

window._calls=[];
var CallStore = assign({}, EventEmitter.prototype, {

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
        return _calls[id];
    },

    getAll: function() {
        return _calls;
    },

    /**
     * @param {string} threadID
     */
    getAllForThread: function(threadID) {
        var threadMessages = [];
        for (var id in _calls) {
            if (_calls[id].threadID === threadID) {
                threadMessages.push(_calls[id]);
            }
        }
        threadMessages.sort(function(a, b) {
            if (a.date < b.date) {
                return -1;
            } else if (a.date > b.date) {
                return 1;
            }
            return 0;
        });
        return threadMessages;
    },

    getAllForCurrentThread: function() {
        return this.getAllForThread(ThreadStore.getCurrentID());
    }

});

CallStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case ActionTypes.CLIENT_ON_JINGLE_INCOMING:
            var session=action.session;
            var contact = ContactStore.get(session.peer);
            if (!contact) {
                contact = new Contact({jid: client.JID(session.peer).bare});
                contact.resources.add({id: session.peer});
                ContactStore.add(contact);
            }

            var call = new Call({
                contact: contact,
                state: 'incoming',
                jingleSession: session
            });
            contact.jingleCall = call;
            contact.callState = 'incoming';
            _calls.push(call);

            break;
        case ActionTypes.CLIENT_ON_JINGLE_OUTGOING:
            var contact = Contact.get(session.peer);
            var call = new Call({
                contact: contact,
                state: 'outgoing',
                jingleSession: session
            });
            contact.jingleCall = call;
            _calls.push(call);
            break;

        case ActionTypes.CLIENT_ON_JINGLE_TERMINATED:
            var contact = Contact.get(session.peer);
            contact.callState = '';
            contact.jingleCall = null;
            contact.onCall = false;
            if (me.calls.length == 1) { // this is the last call
                client.jingle.stopLocalMedia();
                client.jingle.localStream = null;
            }

            break;
        case ActionTypes.CLIENT_ON_JINGLE_ACCEPTED:
            var contact = Contact.get(session.peer);
            contact.callState = 'activeCall';
            contact.onCall = true;
            break;
        case ActionTypes.CLIENT_ON_JINGLE_LOCALSTREAM_ADDED:
            me.stream = stream;
            break;
        case ActionTypes.CLIENT_ON_JINGLE_LOCALSTREAM_REMOVED:
            me.stream = null;
            break;
        case ActionTypes.CLIENT_ON_JINGLE_REMOTESTREAM_REMOVED:
            var contact = Contact.get(session.peer);
            contact.stream = null;

            break;
        case ActionTypes.CLIENT_ON_JINGLE_REMOTESTREAM_ADDED:
            var contact = Contact.get(session.peer);
            if (!contact) {
                contact.resources.add({id: session.peer});
                me.contacts.add(contact);
            }
            contact.stream = session.streams[0];
            break;
        case ActionTypes.CLIENT_ON_JINGLE_RINGING:
            var contact = Contact.get(session.peer);
            contact.callState = 'ringing';

            break;





        default:
        // do nothing
    }

});

CallStore.setMaxListeners(0);

module.exports = CallStore;
