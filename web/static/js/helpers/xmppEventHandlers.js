/*global me, app, client*/
"use strict";

var _ = require('underscore');
var async = require('async');
var crypto = require('crypto');
var bows = require('bows');
var uuid = require('node-uuid');
var Contact = require('../stores/contactStore');
var Resource = require('../stores/resourceStore');
var Message = require('../stores/messageStore');
var me = require('../stores/userStore');
var Call = require('../stores/callStore');
var Mucs =  require('../stores/mucStore');
var XmppActionCreators = require('../actions/XmppActionCreators');
var XmppUtils = require("../utils/XmppUtils");


var log = bows('Otalk');
var ioLogIn = bows('<< in');
var ioLogOut = bows('>> out');


var discoCapsQueue = async.queue(function (pres, cb) {
    var jid = pres.from;
    var caps = pres.caps;

    log.info('Checking storage for ' + caps.ver);

    var resource = Resource.get(jid);


    app.storage.disco.get(caps.ver, function (err, existing) {
        if (existing) {
            log.info('Already found info for ' + caps.ver);
            if (resource) resource.discoInfo = existing;
            return cb();
        }
        log.info('getting info for ' + caps.ver + ' from ' + jid);
        client.getDiscoInfo(jid, caps.node + '#' + caps.ver, function (err, result) {
            if (err) {
                log.error('Couldnt get info for ' + caps.ver);
                return cb();
            }
            if (client.verifyVerString(result.discoInfo, caps.hash, caps.ver)) {
                log.info('Saving info for ' + caps.ver);
                var data = result.discoInfo.toJSON();
                app.storage.disco.add(caps.ver, data, function () {
                    if (resource) resource.discoInfo = data;
                    cb();
                });
            } else {
                log.info('Couldnt verify info for ' + caps.ver + ' from ' + jid);
                cb();
            }
        });
    });
});


module.exports = function (client, app) {

    client.on('*', function (name, data) {
        if (name === 'raw:incoming') {
            ioLogIn.debug(data.toString());
        } else if (name === 'raw:outgoing') {
            ioLogOut.debug(data.toString());
        }
    });

    client.on('credentials:update', function (creds) {
        client.config.credentials = creds;
        XmppActionCreators.credentialUpdate(creds);
        
    });

    client.on('disconnected', function (err) {
        XmppActionCreators.disconnected(err);

    });

    client.on('auth:failed', function () {
        XmppActionCreators.authFailed();

    });

    client.on('stream:management:resumed', function () {
        XmppActionCreators.streamManagementResumed();
        app.state.connected = true;
    });

    client.on('session:started', function (jid) {

        XmppActionCreators.sessionStarted(jid);

        });




    client.on('roster:update', function (iq) {
        iq = iq.toJSON();
        XmppActionCreators.rosterUpdate(iq);

    });

    client.on('subscribe', function (pres) {
        XmppActionCreators.subscribe(pres.toJSON());

    });

    client.on('available', function (pres) {
        pres = pres.toJSON();
        XmppActionCreators.available(pres);

    });

    client.on('unavailable', function (pres) {
        pres = pres.toJSON();
        XmppActionCreators.unavailable(pres);

    });

    client.on('avatar', function (info) {
        XmppActionCreators.avatar(info);

    });

    client.on('chatState', function (info) {
        XmppActionCreators.chatState(info);
        
    });

    client.on('chat', function (msg) {

        msg = msg.toJSON();
        XmppActionCreators.chat(msg);

    });

    client.on('groupchat', function (msg) {
        msg = msg.toJSON();
        XmppActionCreators.groupChat(msg);

    });

    client.on('groupchat:subject', function (msg) {
        XmppActionCreators.groupChatSubject(msg.toJSON());

    });

    client.on('replace', function (msg) {
        msg = msg.toJSON();
        XmppActionCreators.replace(msg);


    });

    client.on('receipt', function (msg) {
        msg = msg.toJSON();
        XmppActionCreators.receipt(msg);


    });

    client.on('carbon:received', function (carbon) {

        var mereg = new RegExp(app.jid);
        if (!mereg.test(app.jid)) return ;


        XmppActionCreators.carbonReceived(carbon.toJSON());


    });

    client.on('carbon:sent', function (carbon) {
        var mereg = new RegExp(app.jid);
        if (!mereg.test(app.jid)) return ;
        XmppActionCreators.carbonSent(carbon.toJSON());



    });

    client.on('disco:caps', function (pres) {
        XmppActionCreators.discoCaps(pres.toJSON());
        if (pres.caps.hash) {
            log.info('Caps from ' + pres.from + ' ver: ' + pres.caps.ver);
            discoCapsQueue.push(pres);
        }
    });

    client.on('stanza:acked', function (stanza) {
        XmppActionCreators.stanzaAcked(stanza.toJSON);

    });

    client.on('jingle:incoming', function (session) {
        XmppActionCreators.jingleIncoming(ssession.toJSON);

    });

    client.on('jingle:outgoing', function (session) {
        XmppActionCreators.jingleOutgoing(ssession.toJSON);

    });

    client.on('jingle:terminated', function (session) {
        XmppActionCreators.jingleTerminated(ssession.toJSON);

    });

    client.on('jingle:accepted', function (session) {
        XmppActionCreators.jingleAccepted(ssession.toJSON);

    });

    client.on('jingle:localstream:added', function (stream) {
        XmppActionCreators.jingleLocalstreamAdded(stream);

    });

    client.on('jingle:localstream:removed', function () {
        XmppActionCreators.jingleLocalstreamRemoved();

    });

    client.on('jingle:remotestream:added', function (session) {
        XmppActionCreators.jingleRemotestreamAdded(session);

    });

    client.on('jingle:remotestream:removed', function (session) {
        XmppActionCreators.jingleRemotestreamRemoved();

    });

    client.on('jingle:ringing', function (session) {
        XmppActionCreators.jingleRinging(session);

    });
};
