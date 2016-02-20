"use strict";

var jxt = require('jxt');
var stanzaio = require('stanza.io');


jxt.extend(stanzaio.Message, jxt.define({
    name: 'pushNotification',
    namespace: 'urn:xmpp:push:0',
    element: 'push',
    fields: {
        body: jxt.subText('urn:xmpp:push:0', 'body')
    }
}));

jxt.extend(stanzaio.Iq, jxt.define({
    name: 'registerPush',
    namespace: 'urn:xmpp:push:0',
    element: 'register',
    fields: {
        service: jxt.text()
    }
}));

jxt.extend(stanzaio.Iq, jxt.define({
    name: 'unregisterPush',
    namespace: 'urn:xmpp:push:0',
    element: 'unregister',
    fields: {
        service: jxt.text()
    }
}));





module.exports = function (client) {
    client.registerPushService = function (jid, cb) {
        return client.sendIq({
            type: 'set',
            registerPush: {
                service: jid
            }
        }, cb);
    };

    client.getPushServices = function (cb) {
        return client.getDiscoItems('', 'urn:xmpp:push', cb);
    };

    client.unregisterPushService = function (jid, cb) {
        return client.sendIq({
            type: 'set',
            unregisterPush: {
                service: jid
            }
        }, cb);
    };


};
