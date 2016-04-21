/*global me, app, client*/
"use strict";

var _ = require('underscore');
var async = require('async');
var crypto = require('crypto');
var bows = require('bows');
var uuid = require('node-uuid');
var XmppUtils = require("../utils/XmppUtils");


import ActionTypes  from '../constants';


var log = bows('Otalk');
var ioLogIn = bows('<< in');
var ioLogOut = bows('>> out');

export function discoCapsQueue()
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
            var data = result.discoInfo.toJSON();
        } else {
            log.info('Couldnt verify info for ' + caps.ver + ' from ' + jid);
            cb();
        }
    });
})}

export function getAllChannels(){


}

export function   getAllMessages() {

}
export function  createMessage(msg) {
    // simulate writing to a database
      var timestamp = Date.now();
      var data = {
          archivedId: msg.id || uuid.v4(),
          owner: msg.owner||msg.from||app.me,
          to: msg.to,
          from: msg.from||app.me,
          body: msg.body,
          type: msg.type,
          delay: msg.delay,
          edited: msg.edited,
          _created: msg.timestamp||timestamp,
          from_full: msg.from,
          to_full:msg.to
      };
      return data;
  }


export function   getRoster(){

        client.getRoster(function (err, resp) {
            resp = resp.toJSON();

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
                    app.storage.roster.add(data);
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
        dispatch({
            type: ActionTypes.CLIENT_ON_SESSION_STARTED,
            jid: jid,
            client: client
        });

        });




    client.on('roster:update', function (iq) {
        iq = iq.toJSON();
         dispatch({
            type: ActionTypes.CLIENT_ON_ROSTER_UPDATE,
            iq:iq
        });

    });

    client.on('subscribe', function (pres) {
        dispatch({
            type: ActionTypes.CLIENT_ON_SUBSCRIBE,
            pres:pres.toJSON()
        });

    });

    client.on('available', function (pres) {
        pres = pres.toJSON();
        dispatch({
            type: ActionTypes.CLIENT_ON_AVAILABLE,
            pres: pres
        });

    });

    client.on('unavailable', function (pres) {
        pres = pres.toJSON();
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

        msg = msg.toJSON();
         dispatch({
            type: ActionTypes.CLIENT_ON_CHAT,
            msg: msg
        });

    });

    client.on('groupchat', function (msg) {
        msg = msg.toJSON();
         dispatch({
            type: ActionTypes.CLIENT_ON_GROUPCHAT,
            msg: msg
        });


    });

    client.on('groupchat:subject', function (msg) {
        dispatch({
            type: ActionTypes.CLIENT_ON_GROUPCHAT_SUBJECT,
            msg: msg.toJSON()
        });


    });

    client.on('replace', function (msg) {
        msg = msg.toJSON();
        dispatch({
            type: ActionTypes.CLIENT_ON_REPLACE,
            msg: msg
        });


    });

    client.on('receipt', function (msg) {
        msg = msg.toJSON();
        dispatch({
            type: ActionTypes.CLIENT_ON_RECEIPT,
            msg: msg
        });


    });

    client.on('carbon:received', function (carbon) {

        var mereg = new RegExp(jid);
        if (!mereg.test(jid)) return ;

        dispatch({
            type: ActionTypes.CLIENT_ON_CARBON_RECEIVED,
            carbon: carbon.toJSON()
        });



    });

    client.on('carbon:sent', function (carbon) {
        var mereg = new RegExp(jid);
        if (!mereg.test(jid)) return ;
         dispatch({
            type: ActionTypes.CLIENT_ON_CARBON_SENT,
            carbon: carbon.toJSON()
        });


    });

    client.on('disco:caps', function (pres) {
         dispatch({
            type: ActionTypes.CLIENT_ON_DISCO_CAPS,
            pres: pres.toJSON()
        });
        if (pres.caps.hash) {
            log.info('Caps from ' + pres.from + ' ver: ' + pres.caps.ver);
            discoCapsQueue.push(pres);
        }
    });

    client.on('stanza:acked', function (stanza) {
        dispatch({
            type: ActionTypes.CLIENT_ON_STANZA_ACKED,
            stanza: stanza.toJSON()
        });

    });

    client.on('jingle:incoming', function (session) {
         dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_INCOMING,
            session: session.toJSON()
        });

    });

    client.on('jingle:outgoing', function (session) {

         dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_OUTGOING,
            session: session.toJSON()
        });

    });

    client.on('jingle:terminated', function (session) {
        dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_TERMINATED,
            session: session.toJSON()
        });

    });

    client.on('jingle:accepted', function (session) {
         dispatch({
            type: ActionTypes.CLIENT_ON_JINGLE_ACCEPTED,
            session: session.toJSON()
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
            session: session.toJSON()
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
            session: session.toJSON()
        });

    });
};
