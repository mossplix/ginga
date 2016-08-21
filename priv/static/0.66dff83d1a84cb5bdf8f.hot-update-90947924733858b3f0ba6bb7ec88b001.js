webpackHotUpdate(0,{

/***/ 309:
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	    return {
	
	        mid: '',
	        owner: '',
	        to: '',
	        from: '',
	        body: '',
	        type: 'normal',
	        acked: false,
	        requestReceipt: false,
	        receipt: false,
	        archivedId: '',
	        oobURIs: [],
	        created: '',
	        _edited: '',
	        _mucMine: '',
	        receiptReceived: false,
	        edited: false,
	        delay: '',
	        mentions: '',
	        from_full: '',
	        to_full: '',
	
	        isMine: function isMine() {
	            var xmpp = store.getState().xmpp;
	            var mereg = new RegExp(xmpp.jid);
	            if (this.type === 'groupchat') {
	                return this.from_full.resource === xmpp.nickname;
	            } else {
	
	                if (this.from_full.parts === undefined) {
	                    return mereg.test(this.from);
	                } else {
	                    return mereg.test(this.from_full.parts.bare);
	                }
	            }
	        },
	
	        mine: function mine() {
	            return this.isMine();
	        },
	
	        sender: function sender() {
	            var xmpp = store.getState().xmpp;
	            var _contacts = store.getState().contacts;
	            if (this.mine()) {
	                return _contacts[xmpp.jid];
	            } else {
	                if (this.type === 'groupchat') {
	                    return this.from_full.resource;
	                }
	
	                return _contacts[this.from];
	            }
	        },
	        getSenderAvatar: function getSenderAvatar() {
	            var sender = this.sender();
	        },
	        delayed: function delayed() {
	            return !!this.delay;
	        },
	
	        getCreated: function getCreated() {
	            if (this.delay && this.delay.stamp) {
	                return this.delay.stamp;
	            }
	            if (this.created === '') {
	                return new Date(this.timestamp);
	            } else {
	                return new Date(this.created);
	            }
	        },
	        timestamp: function timestamp() {
	            if (this._edited && !isNaN(this._edited.valueOf())) {
	                return this._edited;
	            }
	            return this.getCreated();
	        },
	        formattedTime: function formattedTime() {
	            if (this.getCreated()) {
	                //moment().format("h:mm");
	
	                var timeTodayDateElse = function timeTodayDateElse(date) {
	                    moment.locale('en', {
	                        'calendar': {
	                            'lastDay': 'D MMMM',
	                            'sameDay': 'h:mmA',
	                            'nextDay': 'D MMMM',
	                            'lastWeek': 'D MMMM',
	                            'nextWeek': 'D MMMM',
	                            'sameElse': 'D MMMM'
	                        }
	                    });
	
	                    return moment(date).calendar();
	                };
	
	                return timeTodayDateElse(this.getCreated());
	            }
	            return undefined;
	        },
	        pending: function pending() {
	            return !this.acked;
	        },
	        nickname: function nickname() {
	            var _contacts = store.getState().contacts;
	            if (this.type === 'groupchat') {
	                return this.from_full.resource;
	            }
	            if (this.mine()) {
	                return 'me';
	            }
	            if (this.from_full.bare === undefined) {
	                return _contacts[this.from].displayName();
	            } else {
	                return _contacts[this.from].displayName();
	            }
	        },
	        processedBody: function processedBody() {
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
	
	    };
	};

/***/ }

})
//# sourceMappingURL=0.66dff83d1a84cb5bdf8f.hot-update.js.map