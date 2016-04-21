import  ActionTypes   from '../constants';

const initialState = {
    contact: '',
    jingleSession: {},
    state:  'inactive',
    multiUser:  false,
    calls:[]
};

 function getAllForThread(threadID) {
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
    }


   function  getAllForCurrentThread(thread_id) {
        return getAllForThread(thread_id);
    }



export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.REGISTRATIONS_ERROR:
      return { ...state, errors: action.errors };

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

            return { ...state, contact: contact, state: 'incoming', jingleSession: session };
    case ActionTypes.CLIENT_ON_JINGLE_OUTGOING:
        var contact = Contact.get(session.peer);
        var call = new Call({
            contact: contact,
            state: 'outgoing',
            jingleSession: session
        });
        contact.jingleCall = call;
        _calls.push(call);
        return { ...state, contact: contact, state: 'incoming', jingleSession: session };

    case ActionTypes.CLIENT_ON_JINGLE_TERMINATED:
        var contact = Contact.get(session.peer);
        contact.callState = '';
        contact.jingleCall = null;
        contact.onCall = false;
        if (me.calls.length == 1) { // this is the last call
            client.jingle.stopLocalMedia();
            client.jingle.localStream = null;
        }

        return { ...state, contact: contact, state: 'incoming', jingleSession: session };
    case ActionTypes.CLIENT_ON_JINGLE_ACCEPTED:
        var contact = Contact.get(session.peer);
        contact.callState = 'activeCall';
        contact.onCall = true;
        return { ...state, contact: contact, state: 'incoming', jingleSession: session };
    case ActionTypes.CLIENT_ON_JINGLE_LOCALSTREAM_ADDED:
        me.stream = stream;
        return { ...state, contact: contact, state: 'incoming', jingleSession: session };
    case ActionTypes.CLIENT_ON_JINGLE_LOCALSTREAM_REMOVED:
        me.stream = null;
        return { ...state, contact: contact, state: 'incoming', jingleSession: session };
    case ActionTypes.CLIENT_ON_JINGLE_REMOTESTREAM_REMOVED:
        var contact = Contact.get(session.peer);
        contact.stream = null;

        return { ...state, contact: contact, state: 'incoming', jingleSession: session };
    case ActionTypes.CLIENT_ON_JINGLE_REMOTESTREAM_ADDED:
        var contact = Contact.get(session.peer);
        if (!contact) {
            contact.resources.add({id: session.peer});
            me.contacts.add(contact);
        }
        contact.stream = session.streams[0];
        return { ...state, contact: contact, state: 'incoming', jingleSession: session };
    case ActionTypes.CLIENT_ON_JINGLE_RINGING:
        var contact = Contact.get(session.peer);
        contact.callState = 'ringing';

        return { ...state, contact: contact, state: 'incoming', jingleSession: session };

    default:
      return state;
  }
}