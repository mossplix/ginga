var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'app_change';

_app={};
_header={};
var ApplicationStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getCurrent:function(){
      return _app;
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getCurrent: function() {
        return _app;
    },
    setCurrent: function(header){
      _header=header;
    }



});

ApplicationStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.CLIENT_ON_DISCO_CAPS:
            var pres = action.pres;
            if (pres.caps.hash) {
                log.info('Caps from ' + pres.from + ' ver: ' + pres.caps.ver);
                discoCapsQueue.push(pres);
            }


            break;
      case ActionTypes.APP_LOADED:
        var app=action.app;
        _app.header=action.title;
        _app.desc = action.desc;

        ApplicationStore.emitChange();
        break;


        default:
        // do nothing
    }

});
ApplicationStore.setMaxListeners(0);
module.exports = ApplicationStore;
