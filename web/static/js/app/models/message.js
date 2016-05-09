module.exports= function() {return {

    mid: '',
    owner: '',
    to: '',
    from: '',
    body: '',
    type: 'normal',
    acked:  false,
    requestReceipt:  false,
    receipt:  false,
    archivedId: '',
    oobURIs: [],
    created: '',
    _edited: '',
    _mucMine: '',
    receiptReceived:  false,
    edited:  false,
    delay: '',
    mentions:  '',
    from_full:'',
    to_full:'',

    isMine: function(){
        var xmpp=store.getState().xmpp;
      var mereg = new RegExp(xmpp.jid);
        if (this.type === 'groupchat'){
            return this.from_full.resource === xmpp.nickname

        }else {

            if (this.from_full.parts === undefined){
                return mereg.test(this.from);
            }
            else {
                return mereg.test(this.from_full.parts.bare);
            }
        }

},

    mine: function () {
            return this.isMine();
        },

    sender:  function () {
           var xmpp=store.getState().xmpp;
           var _contacts = store.getState().contacts;
            if (this.mine()) {
                return _contacts[xmpp.jid];
            } else {
                if (this.type === 'groupchat'){
                    return this.from_full.resource;

                }

                return _contacts[this.from];
            }

    },
    getSenderAvatar: function(){
        var sender=this.sender();
        if (typeof(sender) === "string")
        {
            return ""
        }
        else if(typeof(sender) === "undefined"){
            return "";
        }
        else{
            return sender.avatar

        }

    },
    delayed: function () {
            return !!this.delay;
        }
    ,
    getCreated: function () {
            if (this.delay && this.delay.stamp) {
                return this.delay.stamp;
            }
            if (this.created ==='')
            {
            return new Date(this.timestamp);
          }else{
            return new Date(this.created);
          }

    },
    timestamp: function () {
            if (this._edited && !isNaN(this._edited.valueOf())) {
                return this._edited;
            }
            return this.getCreated();

    },
    formattedTime:  function () {
            if (this.getCreated()) {
              //moment().format("h:mm");
              function timeTodayDateElse(date){
                  moment.locale('en', {
        'calendar' : {
            'lastDay' : 'D MMMM',
             'sameDay' : 'h:mmA',
            'nextDay' : 'D MMMM',
            'lastWeek' : 'D MMMM',
            'nextWeek' : 'D MMMM',
            'sameElse' : 'D MMMM'
       }
    });

    return moment(date).calendar();
}

              return timeTodayDateElse(this.getCreated());
            }
            return undefined;

    },
    pending: function () {
            return !this.acked;

    },
    nickname: function () {
            var _contacts=store.getState().contacts;
            if (this.type === 'groupchat') {
                return this.from_full.resource;
            }
            if (this.mine()) {
                return 'me';
            }
            if (this.from_full.bare === undefined)
            {
            return _contacts[this.from].displayName();
          }
          else{
            return _contacts[this.from].displayName();

          }

    },
    processedBody:  function () {
            var body = this.body;
            if (this.meAction) {
                body = body.substr(4);
            }
            body = htmlify.toHTML(body);
            if (this.mentions) {
                var existing = htmlify.toHTML(this.mentions);
                var parts = body.split(existing);
                body = parts.join('<span class="mention">' + existing + '</span>');
            }
            return body;

    }

}}
