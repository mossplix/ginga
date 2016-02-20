module.exports=function(){return {

    id: '',
    status: '',
    show: '',
    priority: 0,
    chatState:  'gone',
    idleSince: '',
    discoInfo: '',
    timezoneOffset: 0,

    mucDisplayName:  function () {
            return this.id.split('/')[1] || '';

    },
    idle:  function () {
            return this.idleSince && !isNaN(this.idleSince.valueOf());

    },
    supportsReceipts:  function () {
            if (!this.discoInfo) return false;
            var features = this.discoInfo.features || [];
            return features.indexOf('urn:xmpp:receipts') >= 0;

    },
    supportsChatStates: function() {
            if (!this.discoInfo) return false;
            var features = this.discoInfo.features || [];
            return features.indexOf('http://jabber.org/protocol/chatstate') >= 0;

    },
    supportsJingleMedia:  function () {
            if (!this.discoInfo) return false;
            var features = this.discoInfo.features || [];
            if (features.indexOf('urn:xmpp:jingle:1') === -1) {
                return false;
            }

            if (features.indexOf('urn:xmpp:jingle:apps:rtp:1') === -1) {
                return false;
            }

            if (features.indexOf('urn:xmpp:jingle:apps:rtp:audio') === -1) {
                return false;
            }

            if (features.indexOf('urn:xmpp:jingle:apps:rtp:video') === -1) {
                return false;
            }

            return true;

    },
    supportsJingleFiletransfer:  function () {
            if (!this.discoInfo) return false;
            var features = this.discoInfo.features || [];
            if (features.indexOf('urn:xmpp:jingle:1') === -1) {
                return false;
            }

            if (features.indexOf('urn:xmpp:jingle:apps:file-transfer:3') === -1) {
                return false;
            }

            if (features.indexOf('urn:xmpp:jingle:transports:ice-udp:1') === -1) {
                return false;
            }

            if (features.indexOf('urn:xmpp:jingle:transports:dtls-sctp:1') === -1) {
                return false;
            }

            return true;

    },

    fetchDisco: function () {
        var self = this;

        if (self.discoInfo) return;


            client.getDiscoInfo(self.id, '', function (err, res) {
                if (err) return;
                if (typeof res.error != 'undefined') return;
                self.discoInfo = res.discoInfo.toJSON();
            });

    },
    fetchTimezone: function () {
        var self = this;

        if (self.timezoneOffset) return;


            client.getTime(self.id, function (err, res) {
                if (err) return;
                if (typeof res.error != 'undefined') return;
                self.timezoneOffset = res.time.tzo;
            });

    }

}}
