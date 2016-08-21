'use strict';

// import socket from "./socket"
var React = require('react');
var Router = require('react-router');

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect = Router.Redirect;

var jQuery = require("./common/jquery");
var Soko = require('./common/soko');
var Libs = require('./common/libs');

//var Phoenix = require('./common/phoenix');

var localStorage = require('localStorage');

var _ = require('lodash');
var async = require('async');
var Backbone = require('backbone');
var StanzaIO = require('stanza.io');

var Storage = require('./storage');
var xmppEventHandlers = require('./helpers/xmppEventHandlers');
var pushNotifications = require('./helpers/pushNotifications');
var Notify = require('notify.js');
var Desktop = require('./helpers/desktop');
var AppCache = require('./helpers/cache');
var AppState = require('./stores/stateStore');
var userStore = require('./stores/userStore');
var contactUtils = require('./utils/contactUtils');
var crypto = require('crypto');
var Routes = require('./config/Routes.react');

var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');

var MessageSchema = require("./stores/schema/message");
var jQuery = require('jquery');
var request = require('superagent');
require('superagent-as-promised')(request);
//var injectTapEventPlugin = require("react-tap-event-plugin");

var moment = require("moment");
window.moment = moment;

window.React = React; // export for http://fb.me/react-devtools

//ChatExampleData.init(); // load example data into localstorage

//ChatWebAPIUtils.getAllMessages();

module.exports = {
    launch: function launch() {
        var self = window.app = this;
        var config = {
            jid: "mossplix@localhost",
            wsURL: "ws://127.0.0.1:5280/websocket",
            transport: "websocket",
            nickname: "mmoses",
            credentials: {
                password: "mosespass"
            } };
        localStorage.config = JSON.stringify(config);

        //localStorage.mucs  = JSON.stringify(muc_list);
        app.jid = app.me = config.jid;
        app.config = config;
        window._ = _;
        window.request = request;

        config.useStreamManagement = true;

        _.extend(this, Backbone.Events);

        var profile = {};
        async.series([function (cb) {
            app.notifications = new Notify();
            app.desktop = new Desktop();
            app.cache = new AppCache();
            app.storage = new Storage();
            app.storage.open(cb);
            app.crypto = crypto;
            window.MessageSchema = MessageSchema;
        }, function (cb) {
            app.storage.profiles.get(config.jid, function (err, res) {
                if (res) {
                    profile = res;
                    profile.jid = { full: config.jid, bare: config.jid };
                    config.rosterVer = res.rosterVer;
                }
                cb();
            });
        }, function (cb) {

            window.onbeforeunload = function () {
                if (app.api.sessionStarted) {
                    app.api.disconnect();
                }
            };

            self.api = window.client = StanzaIO.createClient(config);
            client.enableKeepAlive({ interval: 30 });
            client.use(pushNotifications);
            xmppEventHandlers(self.api, self);

            self.api.once('session:started', function () {
                app.hasConnected = true;
                cb();
            });
            self.api.connect();
        }, function (cb) {

            ChatWebAPIUtils.getAllMessages();
            ChatWebAPIUtils.getAllChannels();

            Router.run(Routes, function (Handler) {
                React.render(React.createElement(Handler, null), document.getElementById('container'));
            });
        }]);
    }

};

module.exports.launch();