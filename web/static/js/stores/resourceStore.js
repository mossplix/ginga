var ChatAppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'resource_change';
window._resources={};

var ResourceStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
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

    get: function(id) {
        return _resources[id];
    },
    set:function(id,key,value){
      resource=_resources[id];
        resource[key] = value;
        _resources[id]=resource;

    },

    getAll: function() {
        return _resources;
    },
    fetchTimezone: function (id) {
        var self = _resources[id];

        if (self.timezoneOffset) return;


        client.getTime(self.id, function (err, res) {
            if (err) return;
            self.timezoneOffset = res.time.tzo;
        });
        _resources[id]=self;

    },
    fetchDisco: function (id) {
        var self = _resources[id];

        if (self.discoInfo) return;

        client.getDiscoInfo(self.id, '', function (err, res) {
            if (err) return;
            self.discoInfo = res.discoInfo.toJSON();
        });

        _resources[id]=self;


    },
    comparator: function (res1, res2) {
        if (res1.priority > res2.priority) {
            return -1;
        }
        if (res1.priority < res2.priority) {
            return 1;
        }
        if (res1.show === res2.show) {
            if (!!res1.idleSince && !!res2.idleSince) {
                return 0;
            }
            if (res1.idleSince && !!res2.idleSince) {
                return 1;
            }
            return -1;

        }

        var ranking = {
            xa: 0,
            away: 1,
            '': 2,
            chat: 3,
            dnd: 3
        };
        var r1 = ranking[res1.show];
        var r2 = ranking[res2.show];

        if (r1 === r2) {
            return 0;
        }
        if (r1 > r2) {
            return -1;
        }
        return 1;
    }


});

ResourceStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.CREATE_RESOURCE:

            resource = {};
            resource.id = pres.from.full;

            _resources[pres.from.bare]=resource;

            if (!pres.caps) {
                fetchDisco(pres.from.bare);
            }
            fetchTimezone(pres.from.bare);
            break;



        default:
        // do nothing
    }

});

module.exports = ResourceStore;
