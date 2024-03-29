/*global me, app, client*/
"use strict";

var _ = require('underscore');
var async = require('async');
var crypto = require('crypto');
var bows = require('bows');
var uuid = require('node-uuid');
var XmppUtils = require("../utils/XmppUtils");

var contactSchema = require("../models/contact");
var messageSchema = require("../models/message");
var mucSchema = require("../models/muc");
var uuid = require('node-uuid');


var Muc=new mucSchema();
var Message = new messageSchema();
var Contact = new contactSchema();


import ActionTypes  from '../constants';
import { httpGet, httpPost, httpDelete }  from '../utils';


var log = bows('Otalk');
var ioLogIn = bows('<< in');
var ioLogOut = bows('>> out');

export function discoCapsQueue(pres)
{
    async.queue(function (pres, cb) {
    var jid = pres.from;
    var caps = pres.caps;


    var resource = Resource.get(jid);

    client.getDiscoInfo(jid, caps.node + '#' + caps.ver, function (err, result) {
        if (err) {
            log.error('Couldnt get info for ' + caps.ver);
            return cb();
        }
        if (client.verifyVerString(result.discoInfo, caps.hash, caps.ver)) {
            log.info('Saving info for ' + caps.ver);
            var data = result.discoInfo;
        } else {
            log.info('Couldnt verify info for ' + caps.ver + ' from ' + jid);
            cb();
        }
    });
})}

export function loadRooms(){
     return (dispatch, getState) =>
    {
          httpGet('/api/v1/rooms')
         .then((data) => {
        dispatch({
          type:ActionTypes.LOAD_ROOMS,
          rooms: data,
        });


      });

    }


}


export function leaveRoom(){
     return (dispatch, getState) => {
        var {user,jid} = store.getState().xmpp;
        var nick="";
        if(user){
            nick=user.first_name;
        }

            client.leaveRoom(jid, nick);

    }


}



function convMessage(msg){
      var ts = Date.now();
      var timestamp;
      if (msg.delay){
          timestamp=msg.delay.stamp;
      }
    else{
          timestamp=ts;
      }
      var data = {
          archivedId: msg.id || uuid.v4(),
          owner: msg.owner||msg.from.bare,
          to: msg.to.bare,
          text:msg.body,
          from: msg.from.bare,
          body: msg.body,
          type: msg.type,
          delay: msg.delay,
          edited: msg.edited,
          created: msg.timestamp||timestamp,
          from_full: msg.from,
          to_full:msg.to
      };
      return Object.assign({},Message,msg,data);

}

export function   getAllMessages() {

    return (dispatch, getState) =>
    {

        const {xmpp} = getState();
        const client = xmpp.client;
        const jid = xmpp.jid;



    }

}





export function   getRoster(){

        client.getRoster(function (err, resp) {
            

            if (resp.roster && resp.roster.items && resp.roster.items.length) {


                _.each(resp.roster.items, function (item) {
                    var data = {
                        owner:resp.to.bare,
                        jid: item.jid.jid,
                        nickname: item.local,
                        name: item.name,
                        groups: item.groups,
                        subscription: item.subscription,
                        avatarID: "",
                        resources: {},
                        offlineStatus:{}
                    };

                });

                var caps = client.updateCaps();

                    client.sendPresence();
                    client.enableCarbons();

            }});

    }




    export function receiveContacts(rawContacts) {
        dispatch({
            type: ActionTypes.RECEIVE_RAW_CONTACTS,
            rawContacts: rawContacts
        });
    }


   export function fetchHistory(jid){
    const client = store.getState().xmpp.client;

     return dispatch => {



     client.searchHistory({
                with: jid,
                rsm: {max: 500, before: true},
                complete: false
            }, function (err, res) {
                if (err){
                    return;
                }
                if (res.mamResult) {
                    var items = res.mamResult.items || [];
                }else{
                    var items=[];
                }

                var msgList = items.map(function (x) {
                    return Object.assign(Message, x.forwarded.message, {
                        id: x.forwarded.message.id,
                        from: x.forwarded.message.from.bare,
                        to: x.forwarded.message.to.bare,
                        created: x.forwarded.delay.stamp,
                        text:x.forwarded.message.body
                    })
                });

                dispatch({
                    type: ActionTypes.LOAD_MESSAGES,
                    messages: msgList,

                });
            });
}}



    export function receiveCreatedContact(createdContact) {
        dispatch({
            type: ActionTypes.RECEIVE_RAW_CREATED_CONTACTS,
            createdContact: createdContact
        });
    }

    export function receiveMucs(rawMucs) {
        dispatch({
            type: ActionTypes.RECEIVE_RAW_MUCS,
            rawMucs: rawMucs
        });
    }



    export function  receiveCreatedMuc(createdMuc) {
        dispatch({
            type: ActionTypes.RECEIVE_RAW_CREATED_MUC,
            createdMuc: createdMuc
        });
    }



export function xmppSession(client,dispatch,jid) {

    client.on('*', function (name, data) {
        if (name === 'raw:incoming') {
            ioLogIn.debug(data.toString());
        } else if (name === 'raw:outgoing') {
            ioLogOut.debug(data.toString());
        }
    });

    client.on('credentials:update', function (creds) {
        client.config.credentials = creds;
            dispatch({
             type: ActionTypes.CLIENT_ON_CREDENTIALS_UPDATE,
                creds:creds
          });

    });

    client.on('disconnected', function (err) {

        dispatch(
            {
             type: ActionTypes.CLIENT_ON_DISCONNECTED,
              err: err
            }
        );

    });

    client.on('auth:failed', function () {

        dispatch(
            {
            type: ActionTypes.CLIENT_ON_AUTHFAILED
        }
        );

    });

    client.on('stream:management:resumed', function () {
        dispatch({
           type: ActionTypes.CLIENT_ON_STREAM_MANAGEMENT_RESUMED
        });

    });

    client.on('session:started', function (jid) {

        client.sendPresence();
         var caps = client.updateCaps();

                client.sendPresence({
                    status: '',
                    caps: client.disco.caps
                });
                client.enableCarbons();




         client.searchHistory({
                to: jid.bare,
                rsm: {max: 500, before: true},
                complete: false
            }, function (err, res) {
                if (res && res.mamResult) {
                    var items = res.mamResult.items || [];
                }else{
                    var items=[];
                }

                var messages = items.map(function (x) {
                    return Object.assign({},Message, x.forwarded.message, {
                        id:  x.forwarded.message.id,
                        from: x.forwarded.message.from.bare,
                        to: x.forwarded.message.to.bare,
                        created: x.forwarded.delay.stamp,
                        text:x.forwarded.message.body
                    })
                });

                dispatch({
                    type: ActionTypes.LOAD_MESSAGES,
                    messages: messages,

                });
            });

            client.searchHistory({
                from: jid.bare,
                rsm: {max: 500, before: true},
                complete: false
            }, function (err, res) {
                var mamResult = res.mamResult;
                var itemList = mamResult.items || [];

                var msgList = itemList.map(function (x) {
                    return Object.assign({},Message, x.forwarded.message, {
                        id:  x.forwarded.message.id,
                        from: x.forwarded.message.from.bare,
                        to: x.forwarded.message.to.bare,
                        created: x.forwarded.delay.stamp,
                        text:x.forwarded.message.body,
                    })
                });

                dispatch({
                    type: ActionTypes.LOAD_MESSAGES,
                    messages: msgList,

                });
            });

        client.getRoster(function (err, resp) {
            if (resp.roster && resp.roster.items && resp.roster.items.length) {

                var items = resp.roster.items;

                var contacts= items.map(function (item) {
                    return Object.assign({},Contact, {
                        owner:resp.to.bare,
                        jid: item.jid.bare,
                        nickname: item.jid.local,
                        name: item.name,
                        groups: item.groups,
                        subscription: item.subscription,
                        avatarID: "",
                        resources: {},
                        offlineStatus:{}
                    });

                });

                dispatch({
                    type: ActionTypes.LOAD_CONTACTS,
                    contacts: contacts,

                });
            }





        });

         client.getBookmarks(function (err, res) {
                if (err) return;

                var mucs = res.privateStorage.bookmarks.conferences || [];

             dispatch({
                    type: ActionTypes.LOAD_MUCS,
                    mucs: mucs,

                });

            });



        dispatch({
            type: ActionTypes.CLIENT_ON_SESSION_STARTED,
            jid: jid,
            client: client
        });

        });




    client.on('roster:update', function (iq) {
        iq = iq;
         dispatch({
            type: ActionTypes.CLIENT_ON_ROSTER_UPDATE,
            iq:iq
        });

    });

    client.on('subscribe', function (pres) {
        dispatch({
            type: ActionTypes.CLIENT_ON_SUBSCRIBE,
            pres:pres
        });

    });

    client.on('available', function (pres) {
        
        dispatch({
            type: ActionTypes.CLIENT_ON_AVAILABLE,
            pres: pres
        });

    });

    client.on('unavailable', function (pres) {
        
        dispatch({
            type: ActionTypes.CLIENT_ON_UNAVALILABLE,
            pres: pres
        });

    });

    client.on('avatar', function (info) {
        dispatch({
            type: ActionTypes.CLIENT_ON_AVATAR,
            info: info
        });

    });

    client.on('chatState', function (info) {
        dispatch({
            type: ActionTypes.CLIENT_ON_CHAT_STATE,
            info: info
        });

    });

    client.on('chat', function (msg) {

        
         dispatch({
            type: ActionTypes.CLIENT_ON_CHAT,
            msg: convMessage(msg)
        });

    });

    client.on('groupchat', function (msg) {
        
         dispatch({
            type: ActionTypes.CLIENT_ON_GROUPCHAT,
            msg: convMessage(msg)
        });


    });

    client.on('groupchat:subject', function (msg) {
        dispatch({
            type: ActionTypes.CLIENT_ON_GROUPCHAT_SUBJECT,
            msg: convMessage(msg)
        });


    });

    client.on('replace', function (msg) {
        
        dispatch({
            type: ActionTypes.CLIENT_ON_REPLACE,
            msg: convMessage(msg)
        });


    });

    client.on('receipt', function (msg) {
        
        dispatch({
            type: ActionTypes.CLIENT_ON_RECEIPT,
            msg: convMessage(msg)
        });


    });

    client.on('carbon:received', function (carbon) {

        var mereg = new RegExp(jid);
        if (!mereg.test(jid)) return ;

        dispatch({
            type: ActionTypes.CLIENT_ON_CARBON_RECEIVED,
            carbon: carbon
        });



    });

    client.on('carbon:sent', function (carbon) {
        var mereg = new RegExp(jid);
        if (!mereg.test(jid)) return ;
         dispatch({
            type: ActionTypes.CLIENT_ON_CARBON_SENT,
            carbon: carbon
        });


    });

    client.on('disco:caps', function (pres) {
         dispatch({
            type: ActionTypes.CLIENT_ON_DISCO_CAPS,
            pres: pres
        });
        if (pres.caps.hash) {
            log.info('Caps from ' + pres.from + ' ver: ' + pres.caps.ver);
            discoCapsQueue(pres);
        }
    });

    client.on('stanza:acked', function (stanza) {
        dispatch({
            type: ActionTypes.CLIENT_ON_STANZA_ACKED,
            stanza: stanza
        });

    });

    client.on('jingle:incoming', function (session) {
         dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_INCOMING,
            session: session
        });

    });

    client.on('jingle:outgoing', function (session) {

         dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_OUTGOING,
            session: session
        });

    });

    client.on('jingle:terminated', function (session) {
        dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_TERMINATED,
            session: session
        });

    });

    client.on('jingle:accepted', function (session) {
         dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_ACCEPTED,
            session: session
        });

    });

    client.on('jingle:localstream:added', function (stream) {
        dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_LOCALSTREAM_ADDED,
            stream: stream
        });

    });

    client.on('jingle:localstream:removed', function () {
         dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_LOCALSTREAM_REMOVED
        });


    });

    client.on('jingle:remotestream:added', function (session) {
       dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_REMOTESTREAM_ADDED,
            session: session
        });

    });

    client.on('jingle:remotestream:removed', function (session) {
        dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_REMOTESTREAM_REMOVED
        });

    });

    client.on('jingle:ringing', function (session) {
       dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_RINGING,
            session: session
        });

    });
};
