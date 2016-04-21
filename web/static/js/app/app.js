import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  useRouterHistory,
    browserHistory,
    RouteHandler
} from 'react-router';
//import AppRoutes from './AppRoutes';
import configRoutes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHashHistory} from 'history';
import configureStore           from './store';
import Root                     from './containers/root';
import {  push } from 'react-router-redux'





window.push =push;
var localStorage = require('localStorage');

var _ = require('lodash');
var async = require('async');
var StanzaIO = require('stanza.io');

var Notify = require('notify.js');
var Desktop = require('./helpers/desktop');
var AppCache = require('./helpers/cache');
var crypto = require('crypto');


var MessageSchema = require("./models/message");
var jQuery=require('jquery');
var request = require('superagent');
require('superagent-as-promised')(request);
var Backbone = require('backbone');
import { syncHistoryWithStore } from 'react-router-redux';
//var injectTapEventPlugin = require("react-tap-event-plugin");

var moment = require("moment");
import { Provider }                 from 'react-redux';



//ChatExampleData.init(); // load example data into localstorage

//ChatWebAPIUtils.getAllMessages();

//Helpers for debugging
window.React = React;
window._=_;
window.Perf = require('react-addons-perf');
window.moment=moment;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();



const store = configureStore(browserHistory);
window.store=store;
const history = syncHistoryWithStore(browserHistory, store);

const target = document.getElementById('main_container');
const node = <Root routerHistory={history} store={store} />;

ReactDOM.render(node, target);

