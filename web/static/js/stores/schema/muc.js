module.exports= function(){ return {

    id: '',
    name: '',
    autoJoin: false,
    nick: '',
    jid: '',
    subject: '',
    activeContact: false,
    lastInteraction: '',
    lastSentMessage: null,
    unreadCount:  0,
    joined: true,

    displayName: function () {
            return this.name || this.jid;

    },
    displayUnreadCount: function () {
            if (this.unreadCount > 0) {
                return this.unreadCount.toString();
            }
            return '';

    },
    displaySubject: function () {
            return htmlify.toHTML(this.subject);
        }
    ,
    hasUnread:  function () {
            return this.unreadCount > 0;
        }


}};