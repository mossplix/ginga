

var ChatServerActionCreators = require('../actions/ChatServerActionCreators');
var XmppServerActionCreators = require('../actions/XmppServerActionCreators');
var StanzaIO = require('stanza.io');
var uuid = require('node-uuid');

module.exports = {
    init:function(){


        /*client = StanzaIO.createClient({
            jid: localStorage.getItem('jid'),
            password:localStorage.getItem('password'),
            wsURL: localStorage.getItem('jid'),
            transports: "websockets"
        });*/


        var client = StanzaIO.createClient({jid:"mossplix@localhost",password:"mosespass",wsURL:"ws://127.0.0.1:8052/websocket",transports:"websocket"});



    },


  getAllMessages: function() {

      app.storage.archive.getAll(app.me,function(err,archive){ChatServerActionCreators.receiveAll(archive)});
  },


    getAllChannels:function(){
        var mucs=[{jid:"test_room@conference.localhost",name:"#test_room"},{jid:"spark@conference.localhost",name:"#spark"},{jid:"test_chat@conference.localhost",name:"#test_chat"},{jid:"spark2@conf.localhost",name:"#spark2"}];

        XmppServerActionCreators.receiveMucs(mucs);
    },

  createMessage: function(msg) {
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
      app.storage.archive.add(data);
      return data;
  }

};
