var MessageActionCreators = require("../../actions/ChatMessageActionCreators");
var fetchAvatar=require('../../helpers/fetchAvatar');
var crypto = require('crypto');
module.exports= function(){return {

    id: '',
    avatarID: '',
    groups:  [],
    inRoster:  false,
    jid: true,
    name:  '',
    owner:  '',
    storageId:  '',
    subscription: 'none',
    activeContact:  false,
    avatar: '',
    avatarSource: '',
    lastInteraction: '',
    lastHistoryFetch: '',
    lastSentMessage: '',
    lockedResource: '',
    offlineStatus:  '',
    topResource: '',
    unreadCount:  0,
    _forceUpdate:  0,
    onCall:  false,
    stream: {},

    streamUrl: function () {
            if (!this.stream) return '';
            return URL.createObjectURL(this.stream);

    },
    displayName: function () {
            return this.name || this.jid;

    },
    displayUnreadCount: function() {
            if (this.unreadCount > 0) {
                return this.unreadCount.toString();
            }
            return '';

    },
    formattedTZO: function () {
          var localTime = new Date();
            if (!this.timezoneOffset) {
              this.timezoneOffset=localTime.getTimezoneOffset();
            };


            var localTZO = localTime.getTimezoneOffset();
            var diff = Math.abs(localTZO  % (24 * 60) - this.timezoneOffset % (24 * 60));
            var remoteTime = new Date(Date.now() + diff * 60000);


            var day = remoteTime.getDate();
            var hour = remoteTime.getHours();
            var minutes = remoteTime.getMinutes();

            var days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

            var dow = days[remoteTime.getDay()];
            var localDow = days[localTime.getDay()];

            var m = (hour >= 12) ? ' PM' : ' AM';

            hour = hour % 12;
            if (hour === 0) {
                hour = 12;
            }

            var strDay = (day < 10) ? '0' + day : day;
            var strHour = (hour < 10) ? '0' + hour : hour;
            var strMin = (minutes < 10) ? '0' + minutes: minutes;

            if (localDow == dow) {
                return strHour + ':' + strMin + m;
            } else {
                return dow + ' ' + strHour + ':' + strMin + m;
            }

    },
    status: function () {
            var resource = _.get(this.resources,this.lockedResource) || _.get(this.resources,this.topResource) || {};
            return resource.status || '';

    },
    show: function () {
            if (this.resources.length === 0) {
                return 'offline';
            }
            var resource = _.get(this.resources,this.lockedResource) || _.get(this.resources,this.topResource) || {};
            return resource.show || 'online';

    },
    timezoneOffset: function () {
            var resource = _.get(this.resources,this.lockedResource) || _.get(this.resources,this.topResource) || {};
            return resource.timezoneOffset || undefined;

    },
    idleSince:  function () {
            var resource = _.get(this.resources,this.lockedResource) || _.get(this.resources,this.topResource) || {};
            return resource.idleSince || undefined;

    },
    idle: function () {
            return this.idleSince && !isNaN(this.idleSince.valueOf());

    },
    chatState: function () {
            var states = {};
            this.resources.forEach(function (resource) {
                states[resource.chatState] = true;
            });

            if (states.composing) return 'composing';
            if (states.paused) return 'paused';
            if (states.active) return 'active';
            if (states.inactive) return 'inactive';
            return 'gone';

    },
    supportsReceipts: function () {
            if (!this.lockedResource) return false;
            var res = this.resources.get(this.lockedResource);
            return res.supportsReceipts;

    },
    supportsChatStates:  function () {
            if (!this.lockedResource) return false;
            var res = this.resources.get(this.lockedResource);
            return res.supportsChatStates;

    },
    hasUnread: function () {
            return this.unreadCount > 0;

    },
    jingleResources:  function () {
            return this.resources.filter(function (res) {
                return res.supportsJingleMedia;
            });

    },
    callable: function () {
            return !!this.jingleResources.length;

    },
    callObject: function () {
            return app.calls.where('contact', this);
        },
    fetchHistory: function () {
        return ;
        var self = this;
        var url="http://localhost:4000/chat/messages/?from="+self.jid+"&to="+app.me;


        request.get(url).then(function(res){

          var results = JSON.parse(res.text);
          _.each(results,function (message) {
            message.archivedId=message.id;
            message.owner = message.from;


            message.acked = true;
            MessageActionCreators.receiveRawMessage(message);

          });

        });

    },
    save: function () {
        contact=this;

        var storageId = crypto.createHash('sha1').update(contact.owner + '/' + contact.jid.jid).digest('hex');
        var data = {
            storageId: storageId,
            owner: contact.owner,
            jid: contact.jid,
            name: contact.name,
            groups: contact.groups,
            subscription: contact.subscription,
            avatarID: contact.avatarID
        };
        app.storage.roster.add(data);
    },



    setAvatar: function () {
        var self=this;
        var contact = self;
        var type = 'image/png';
        var source='vcard';
        self=this;
        id=self.avatarID||" ";
        fetchAvatar(contact.jid, id, type, source, function (avatar) {
            if (source == 'vcard' && self.avatarSource == 'pubsub') return;
            contact.avatarID = avatar.id;
            contact.avatar = avatar.uri;
            contact.avatarSource = source;
            _contacts[self.jid]=contact;
            contact.save();
        });
    }


}}
