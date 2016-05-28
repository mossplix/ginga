import ActionTypes  from '../constants';
import { push }           from 'react-router-redux';
var StanzaIO = require('stanza.io');
var htmlify = require('../helpers/htmlify');
var messageSchema = require("../models/message");

var Message = new messageSchema();

import {getSelection,getMatchedPretext} from '../reducers/suggestionsReducer';
export function clickChannel(channelID) {

    return dispatch => {
        dispatch({
            type: ActionTypes.CLICK_CHANNEL,
            channelID: channelID
        });

    dispatch(push(`/chat/channels/${channelID}`));
    }}





function promise(callback){
    return dispatch => {
        console.log(dispatch);
        dispatch(callback);
         return Promise.resolve();
    }

}


export function clickThread(threadID) {
    return dispatch => {
    dispatch({
      type: ActionTypes.CLICK_THREAD,
      threadID: threadID
    });

    dispatch(push(`/chat/threads/${threadID}`));


  }}


export function createMessage(text, chat) {
    return (dispatch, getState) =>
    {
        dispatch({
            type: ActionTypes.CREATE_MESSAGE,
            message: message,
            chat: chat,

        });
    }
  }



export function sendMessage(text, chat_type,to,edit=false) {
    return (dispatch, getState) =>

    {
        const client = getState().xmpp.client;
        var links = _.map(htmlify.collectLinks(text), function (link) {
                return {url: link};
            });
        var message =  {
                id: client.nextId(),
                to: new StanzaIO.JID(to),
                type: chat_type,
                body: text,
                requestReceipt: true,
                oobURIs: links,
                chatState: 'active',
            };

        if (edit) {
                 message.replace = getState().currentChat.lastSentMessage.id;
            }


        client.sendMessage(message);
         message.from = getState().xmpp.jid;
        message.to=to;
        message.text=message.body;

        var ts = Date.now();

        var t_message=Object.assign(Message, message, {
                        from: getState().xmpp.jid,
                        created: ts
                    });
        dispatch({
            type: ActionTypes.MESSAGE_SENT,
            message: t_message,
            to: to,
            chat_type:chat_type

        });
    }
  }


export function joinRoom(room, nick) {
    return (dispatch, getState) =>

    {
        const client = getState().xmpp.client;


         client.joinRoom(room, nick, {
            joinMuc: {
                history: {
                    maxstanzas: 50
                }
            }
        });
        dispatch({
            type: ActionTypes.JOIN_ROOM,
            room: room,
            nick: nick,

        });
    }
  }


export function publishAvatar(data) {
    if (!data || data.indexOf('https://') != -1) return;
    return (dispatch, getState) =>

    {
        const client = getState().xmpp.client;

        var resampler = new Resample(data, 80, 80, function (data) {
            var b64Data = data.split(',')[1];
            var id = crypto.createHash('sha1').update(atob(b64Data)).digest('hex');
            client.publishAvatar(id, b64Data, function (err, res) {
                if (err) return;
                client.useAvatars([{
                  id: id,
                  width: 80,
                  height: 80,
                  type: 'image/png',
                  bytes: b64Data.length
                }]);
            });
        });



        dispatch({
            type: ActionTypes.PUBLISH_AVATAR,
            data: data,

        });
    }
  }


export function removeContact(jid) {
    return (dispatch, getState) =>

    {
        const client = getState().xmpp.client;


        client.removeRosterItem(jid, function(err, res) {
             dispatch({
            type: ActionTypes.CONTACT_REMOVED,
            jid: jid

        });

        });

    }
  }


export function addContact(jid) {
    return (dispatch, getState) =>

    {
        const client = getState().xmpp.client;


       client.sendPresence({to: jid, type: 'subscribe'});

        dispatch({
            type: ActionTypes.CONTACT_ADDED,
            jid: jid

        });

    }
  }


export function updateIdlePresence(state) {
    return (dispatch, getState) =>

    {
        const client = getState().xmpp.client;

        var update = {
            status: state,
            caps: client.disco.caps
        };

        if (!getState().appState.active) {
            update.idle = {since: getState().appState.idleSince};
        }



         client.sendPresence(update);
        dispatch({
            type: ActionTypes.SEND_PRESENCE,
            state:state,

        });
    }
  }

export function sendPresence(state) {
    return (dispatch, getState) =>

    {
        const client = getState().xmpp.client;


         client.sendPresence(state);
        dispatch({
            type: ActionTypes.SEND_PRESENCE,
            state:state,

        });
    }
  }










/*
call: function () {
        if (this.jingleResources.length) {
            var peer = this.jingleResources[0];
            this.callState = 'starting';
            app.api.call(peer.id);
        } else {
            logger.error('no jingle resources for this user');
        }
    }






handleAcceptClick: function (e) {
        e.preventDefault();
        var self = this;

        this.$('button.accept').prop('disabled', true);
        if (this.model.jingleCall.jingleSession.state == 'pending') {
            if (!client.jingle.localStream) {
                client.jingle.startLocalMedia(null, function (err) {
                    if (err) {
                        self.model.jingleCall.end({
                            condition: 'decline'
                        });
                    } else {
                        client.sendPresence({ to: new StanzaIo.JID(self.model.jingleCall.jingleSession.peer) });
                        self.model.jingleCall.jingleSession.accept();
                    }
                });
            } else {
                client.sendPresence({ to: new StanzaIo.JID(this.model.jingleCall.jingleSession.peer) });
                this.model.jingleCall.jingleSession.accept();
            }
        }
        return false;
    }

      handleEndClick: function (e) {
        e.preventDefault();
        var condition = 'success';
        if (this.model.jingleCall) {
            if (this.model.jingleCall.jingleSession && this.model.jingleCall.jingleSession.state == 'pending') {
                condition = 'decline';
            }
            this.model.jingleCall.end({
                condition: condition
            });
        }
        return false;
    },

    handleCallStateChange: function (model, callState) {
        var state = callState || this.model.state;
        // hide all
        this.$buttons.hide();

        var map = {
            incoming: '.ignore, .answer',
            outgoing: '.cancel',
            accepted: '.end, .mute',
            terminated: '',
            ringing: '.cancel',
            mute: '.end, .unmute',
            unmute: '.end, .mute',
            //hold: '',
            //resumed: ''
        };

        console.log('map[state]', map[state]);

        this.$(map[state]).show();
    }
});

    */








// contact requests



export function approveContactRequest(jid) {
    return (dispatch, getState) =>

    {
        const client = getState().xmpp.client;

        client.sendPresence({
            to: jid,
            type: 'subscribed'
        });
        client.sendPresence({
          to: jid,
          type: 'subscribe'
        });


        dispatch({
            type: ActionTypes.CONTACT_REQUEST_APPROVED,
            jid: jid

        });
    }
  }



export function denyContactRequest(jid) {
    return (dispatch, getState) =>

    {
        const client = getState().xmpp.client;

        client.sendPresence({
            to: jid,
            type: 'unsubscribed'
        });

        dispatch({
            type: ActionTypes.CONTACT_REQUEST_DENIED,
            jid: jid,


        });
    }
  }





export function leaveRoom(room_jid,nick) {
    return (dispatch, getState) =>

    {
        const client = getState().xmpp.client;
        client.leaveRoom(room_jid, nick);
        dispatch({
            type: ActionTypes.LEAVE_ROOM,
            room_jid: room_jid,
            nick: nick,

        });
    }
  }






export function    receiveRawMessage(msg) {
    return (dispatch, getState) =>
    {
        dispatch({
            type: ActionTypes.RECEIVE_RAW_MESSAGE,
            msg: msg

        });
    }
    }

export function receiveAll(rawMessages) {
    return (dispatch, getState) =>
    {
        dispatch({
            type: ActionTypes.RECEIVE_RAW_MESSAGES,
            rawMessages: rawMessages
        });
    }
  }



  export function receiveCreatedMessage(createdMessage) {
    return (dispatch, getState) =>
    {
        dispatch({
            type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
            rawMessage: createdMessage
        });
    }
  }




export function selectNextSuggestion(suggestionId) {
    return (dispatch, getState) =>
    {
        return new Promise((resolve) => { dispatch({
            type: ActionTypes.SUGGESTION_SELECT_NEXT,
            id: suggestionId
        });resolve(false);}).then(() => dispatch({
                        type: ActionTypes.SUGGESTIONS_CHANGED,
                        id:suggestionId

                        })   );

}}

export function selectPreviousSuggestion(suggestionId) {
    return (dispatch, getState) =>
    {
        return new Promise((resolve) => { dispatch({
            type: ActionTypes.SUGGESTION_SELECT_PREVIOUS,
            id: suggestionId
        }); resolve(false);} ).then(() => dispatch({
                        type: ActionTypes.SUGGESTIONS_CHANGED,
                        id:suggestionId,

                        })  );
    }
}



export function suggestionChanged(suggestionId){
     return (dispatch, getState) =>
    {


        return dispatch({
            type: ActionTypes.SUGGESTIONS_CHANGED,
            id: suggestionId,

        });



    }

}

function emitCompleteWordSuggestion(suggestionId, term = ''){

    return (dispatch, getState) =>
    {
        var suggestions =getState().suggestions;
        var suggestion =suggestions[suggestionId];
        return dispatch({
            type: ActionTypes.SUGGESTION_COMPLETE_WORD,
            id: suggestionId,
            term: term
        });

}}

function completeWord(suggestionId, term = ''){
    return (dispatch, getState) =>
    {
    return dispatch({
                        type: ActionTypes.COMPLETE_WORD,
                        id:suggestionId,
                        term: term

                        });
}}

export function completeWordSuggestion(suggestionId, term = '') {
    return (dispatch, getState) =>
    {
        var suggestions =getState().suggestions;
        var suggestion =suggestions[suggestionId];
        var term_t=term
        return  new Promise((resolve) => { dispatch({
            type: ActionTypes.SUGGESTION_COMPLETE_WORD,
            id: suggestionId,
            term: term
        });resolve(false); }).then(() =>  dispatch({
                        type: ActionTypes.COMPLETE_WORD,
                        id:suggestionId,
                        term: term_t

                        })).then(() => dispatch({
                        type: ActionTypes.SUGGESTIONS_CHANGED,
                        id:suggestionId

                        })   );
    }
}




export function registerSuggestions(suggestionId){
     return {type: ActionTypes.REGISTER_SUGGESTION_BOX,id: suggestionId}



    }


export function unregisterSuggestions(suggestionId){
    return (dispatch, getState) =>
    {
        dispatch({type: ActionTypes.UNREGISTER_SUGGESTION_BOX,id: suggestionId});



    }
}

export function clearSuggestions(suggestionId){
    return (dispatch, getState) =>
    {
        return new Promise((resolve) => { dispatch({type: ActionTypes.SUGGESTION_CLEAR_SUGGESTIONS,id: suggestionId});resolve(false);}).then(() => dispatch({
                        type: ActionTypes.SUGGESTIONS_CHANGED,
                        id:suggestionId

                        })   );



    }
}


export function suggestionPretextChanged(suggestionId,pretext){
    return (dispatch, getState) =>
    {
        return  new Promise((resolve) => { dispatch({type: ActionTypes.SUGGESTION_PRETEXT_CHANGED,
                  id: suggestionId,
                  pretext:pretext});

         resolve(false); }).then(() => dispatch({
                        type: ActionTypes.PRETEXT_CHANGED,
                        id:suggestionId,
                        pretext:pretext

                         })


        ).then(() => dispatch({
                        type: ActionTypes.SUGGESTIONS_CHANGED,
                        id:suggestionId

                        }   ));



    }
}


export function handlePretextChanged(suggestionId,pretext)
{

    return (dispatch, getState) =>
        {
            if (pretext.startsWith('/')) {

          httpGet(`/api/v1/commands/${CommandSuggestion}/`)
          .then((data) => {

                      var matches = [];
                data.forEach((cmd) => {
                    if (('/' + cmd.trigger).indexOf(command) === 0) {
                        let s = '/' + cmd.trigger;
                        let hint = '';
                        if (cmd.auto_complete_hint && cmd.auto_complete_hint.length !== 0) {
                            hint = cmd.auto_complete_hint;
                        }
                        matches.push({
                            suggestion: s,
                            hint,
                            description: cmd.auto_complete_desc
                        });
                    }
                });

                matches = matches.sort((a, b) => a.suggestion.localeCompare(b.suggestion));

                // pull out the suggested commands from the returned data
                const terms = matches.map((suggestion) => suggestion.suggestion);

                if (terms.length > 0) {
                    return dispatch({
                        type: ActionTypes.SUGGESTION_RECEIVED_SUGGESTIONS,
                        id: suggestionId,
                        matchedPretext: command,
                        terms:terms,
                        items: matches,
                        component:component
                    }).then( () => {

                        dispatch({
                            type: ActionTypes.SUGGESTIONS_CHANGED,
                            id: suggestionId

                        })
                }
                    );
                }


          });
        }
            }






}

export function setMatchedPretext(suggestionId, text){

    return (dispatch, getState) =>
    {
        dispatch({type: ActionTypes.SET_MATCHED_PRETEXT,id: suggestionId,text: text});



    }

}

export function addSuggestions(suggestionId,  terms, items, component){

    return (dispatch, getState) =>
    {
        dispatch({type: ActionTypes.ADD_SUGGESTIONS,id: suggestionId,terms:terms, items: items, component:component});



    }

}

export function clearSelection(suggestionId){

    return (dispatch, getState) =>
    {
        dispatch({type: ActionTypes.CLEAR_SELECTION,id: suggestionId});



    }

}




