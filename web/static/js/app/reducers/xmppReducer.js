import types  from '../constants';

var _ = require('underscore');
var async = require('async');
var crypto = require('crypto');
var bows = require('bows');


const initialState = {
    client: null,
    user: null,
    jid:null,
    rooms:null,
    config:null,
    client: null

};





export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case types.CURRENT_USER:

      return { ...state, user: action.currentUser,jid: action.currentUser.jid,vhost: action.currentUser.vhost  };

     case types.CLIENT_ON_SESSION_STARTED:
        return { ...state, client: action.client };


    default:
      return state;
  }
}



