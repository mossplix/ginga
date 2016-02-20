XmppServerActionCreators = require("../actions/XmppServerActionCreators");
XmppActionCreators = require("../actions/XmppActionCreators");
var _ = require('underscore');
var crypto = require('crypto');


module.exports={
    createContact:function(){},

    getRoster:function(){

        client.getRoster(function (err, resp) {
            resp = resp.toJSON();

            if (resp.roster && resp.roster.items && resp.roster.items.length) {
                app.storage.roster.clear(function () {
                    //me.rosterVer = resp.roster.ver;

                });

                _.each(resp.roster.items, function (item) {

                    var storageId = crypto.createHash('sha1').update(item.owner + '/' + item.jid.jid).digest('hex');
                    var data = {
                        storageId: storageId,
                        owner:resp.to.bare,
                        jid: item.jid.jid,
                        nickname: item.local,
                        name: item.name,
                        groups: item.groups,
                        subscription: item.subscription,
                        avatarID: "",
                        resources: {},
                        offlineStatus:{}
                    };
                    app.storage.roster.add(data);
                });

                var caps = client.updateCaps();
                app.storage.disco.add(caps.ver, caps.discoInfo, function () {

                    client.sendPresence();
                    client.enableCarbons();
                });

            }});

            app.storage.roster.getAll(app.me,function(err,roster){ XmppServerActionCreators.receiveContacts(roster);});


    }



}