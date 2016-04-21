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
    _created: '',
    _edited: '',
    _mucMine: '',
    receiptReceived:  false,
    edited:  false,
    delay: '',
    mentions:  '',
    from_full:'',
    to_full:'',

    isMine: function(){
      var mereg = new RegExp(app.jid);
        if (this.type === 'groupchat'){
            return this.from_full.resource === app.config.nickname

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
            if (this.mine()) {
                return _contacts[app.jid];
            } else {
                if (this.type === 'groupchat'){
                    return _contacts[this.from_full.resource];

                }

                return _contacts[this.from];
            }

    },
    delayed: function () {
            return !!this.delay;
        }
    ,
    created: function () {
            if (this.delay && this.delay.stamp) {
                return this.delay.stamp;
            }
            if (this._created ==='')
            {
            return new Date(this.timestamp);
          }else{
            return new Date(this._created);
          }

    },
    timestamp: function () {
            if (this._edited && !isNaN(this._edited.valueOf())) {
                return this._edited;
            }
            return this.created();

    },
    formattedTime:  function () {
            if (this.created()) {
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

              return timeTodayDateElse(this.created());
            }
            return undefined;

    },
    pending: function () {
            return !this.acked;

    },
    nickname: function () {
            if (this.type === 'groupchat') {
                return this.from_full.resource;
            }
            if (this.mine()) {
                return 'me';
            }
            if (this.from_full.bare === undefined)
            {
            return _contacts[this.from].displayName;
          }
          else{
            return _contacts[this.from].displayName;

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
