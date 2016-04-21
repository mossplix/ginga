var MessageSchema = require("../stores/schema/message");
var uuid = require('node-uuid');
var htmlify = require("../helpers/htmlify");



module.exports = {

  convertDbMessage: function(rawMessage, chat) {



       if((typeof rawMessage.from) === "object")

       {
         var from = rawMessage.from.parts.bare;
      }
      else{

          var from = rawMessage.from;

      }

      if((typeof rawMessage.to) === "object")

      {


        if (rawMessage.to.parts.bare === undefined)
        {
          var to = rawMessage.to.bare;
        }
        else {

          var to = rawMessage.to.parts.bare;

        }
     }
     else{
         var to = rawMessage.to
     }

      var c = chat || {};
      var schema = new MessageSchema();

      //console.log(schema);
      var data = {
          id: rawMessage.archivedId,
          threadID: from,
          from: from,
          to: to,
          authorName: rawMessage.authorName,
          text: rawMessage.body,
          isRead: from === c.id,
          type: rawMessage.type,
          edited: rawMessage.edited,
          owner: rawMessage.owner,
          acked: rawMessage.acked,




      };

      var toret = _.assign(schema, rawMessage,data);
      return toret;
  },

getRawMessageData: function(msg,chat) {
  var timestamp = Date.now();
  var links = _.map(htmlify.collectLinks(msg), function (link) {
      return {url: link};
  });


    var data = {
        id:client.nextId(),
        to: client.JID(chat.id),
        body: msg,
        type: chat.chattype,
        requestReceipt: true,
        chatState: 'active',
        oobURIs: links

    };
    return data;
  },



  getCreatedMessageData: function(text, currentThreadID,author) {
    var timestamp = Date.now();
    return {
      id: 'm_' + timestamp,
      threadID: currentThreadID,
      authorName: author, // hard coded for the example
      date: new Date(timestamp),
      text: text,
      isRead: true
    };
  }

};
