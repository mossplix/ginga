var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;

XmppActions={

    connected: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_CONNECT
        });
    },

    authFailed: function(){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_AUTHFAILED
        });

    },
    credentialUpdate: function(creds){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_CREDENTIALS_UPDATE,
            creds:creds
        });

    },
    disconnected: function(err){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_DISCONNECTED,
            err: err
        });

    },

    streamManagementResumed: function(){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_STREAM_MANAGEMENT_RESUMED
        });

    },
    sessionStarted: function(){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_SESSION_STARTED
        });

    },






    rosterUpdate: function(iq){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_ROSTER_UPDATE,
            iq:iq
        });

    },

    subscribe: function(pres){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_SUBSCRIBE,
            pres:pres
        });

    },
    available: function(pres){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_AVAILABLE,
            pres: pres
        });

    },
    unavailable: function(pres){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_UNAVALILABLE,
            pres: pres
        });

    },
    avatar: function(info){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_AVATAR,
            info: info
        });

    },
    chatState: function(info){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_CHAT_STATE,
            info: info
        });

    },
    chat: function(msg){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_CHAT,
            msg: msg
        });

    },
    groupChat: function(msg){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_GROUPCHAT,
            msg: msg
        });

    },
    groupChatSubject: function(){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_GROUPCHAT_SUBJECT
        });

    },
    replace: function(msg){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_REPLACE,
            msg: msg
        });

    },
    receipt: function(msg){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_RECEIPT,
            msg: msg
        });

    },
    carbonReceived: function(carbon){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_CARBON_RECEIVED,
            carbon: carbon
        });

    },
    carbonSent: function(carbon){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_CARBON_SENT,
            carbon: carbon
        });

    },
    discoCaps: function(pres){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_DISCO_CAPS,
            pres: pres
        });

    },
    stanzaAcked: function(stanza){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_STANZA_ACKED,
            stanza: stanza
        });

    },
    jingleIncoming: function(session){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_JINGLE_INCOMING,
            session: session
        });

    },

    jingleOutgoing: function(session){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_JINGLE_OUTGOING,
            session: session
        });

    },
    jingleTerminated: function(session){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_JINGLE_TERMINATED,
            session: session
        });

    },
    jingleAccepted: function(session){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_JINGLE_ACCEPTED,
            session: session
        });

    },
    jingleLocalstreamAdded: function(stream){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_JINGLE_LOCALSTREAM_ADDED,
            stream: stream
        });

    },
    jingleLocalstreamRemoved: function(){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_JINGLE_LOCALSTREAM_REMOVED
        });

    },
    jingleRemotestreamAdded: function(session){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_JINGLE_REMOTESTREAM_ADDED,
            session: session
        });

    },
    jingleRemotestreamRemoved: function(){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_JINGLE_REMOTESTREAM_REMOVED
        });

    },
    jingleRinging: function(session){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLIENT_ON_JINGLE_RINGING,
            session: session
        });

    },
    rosterUpdated: function(roster){

        AppDispatcher.handleViewAction({
            type: ActionTypes.ROSTER_UPDATED,
            roster: roster
        });
    },
    createResource: function(pres){

        AppDispatcher.handleViewAction({
            type: ActionTypes.CREATE_RESOURCE,
            pres: pres
        });

    }




}

module.exports=XmppActions;