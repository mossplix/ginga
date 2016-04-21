import { push }                           from 'react-router-redux';
import Constants                          from '../constants';
import { Socket }                         from 'phoenix';
import { httpGet, httpPost, httpDelete }  from '../utils';

var uuid = require('node-uuid');
var StanzaIO = require('stanza.io');

import {xmppSession} from  './xmppActions'
var pushNotifications = require('../helpers/pushNotifications');



export function setupClient(dispatch,user){
    var config = {
            jid: user.jid,
            wsURL: "ws://127.0.0.1:5280/websocket",
            transport: "websocket",
            nickname: user.first_name,
            credentials: {
                password: localStorage.getItem('phoenixAuthToken')
            }};

     const client = StanzaIO.createClient(config);
     client.enableKeepAlive({interval:30});
     client.use(pushNotifications);
     xmppSession(client,dispatch,user.jid);



                client.once('session:started', function () {
                    dispatch({
                        type: Constants.APP_CONNECTED,
                         });
                });
        client.connect()




}

export function setCurrentUser(dispatch, user) {
  const socket = new Socket('/socket', {
    params: { token: localStorage.getItem('phoenixAuthToken') },
    logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); },
  });

  socket.connect();

  const channel = socket.channel(`users:${user.id}`);

  if (channel.state != 'joined') {
    channel.join().receive('ok', () => {
      dispatch({
        type: Constants.CURRENT_USER,
        currentUser: user,
        socket: socket,
        channel: channel,
      });
    });
  }

  channel.on('boards:add', (msg) => {
    dispatch({
        type: Constants.BOARDS_ADDED,
        board: msg.board,
      });
  });
};

const Actions = {
  signIn: (email, password) => {
    return dispatch => {
      const data = {
        session: {
          email: email,
          password: password,
        },
      };

      httpPost('/api/v1/sessions', data)
      .then((data) => {
        localStorage.setItem('phoenixAuthToken', data.jwt);
        setCurrentUser(dispatch, data.user);
        dispatch(push('/'));
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          dispatch({
            type: Constants.SESSIONS_ERROR,
            error: errorJSON.error,
          });
        });
      });
    };
  },

  currentUser: () => {
    return dispatch => {
      const authToken = localStorage.getItem('phoenixAuthToken');

      httpGet('/api/v1/current_user')
      .then(function (data) {
        setCurrentUser(dispatch, data);
              setupClient(dispatch,data);
      })
      .catch(function (error) {
        console.log(error);
        dispatch(push('/sign_in'));
      });
    };
  },

  signOut: () => {
    return dispatch => {
      httpDelete('/api/v1/sessions')
      .then((data) => {
        localStorage.removeItem('phoenixAuthToken');

        dispatch({ type: Constants.USER_SIGNED_OUT, });

        dispatch(push('/sign_in'));

        dispatch({ type: Constants.BOARDS_FULL_RESET });
      })
      .catch(function (error) {
        console.log(error);
      });
    };
  },
};

export default Actions;
