import ActionTypes  from '../constants';

const initialState = {
  fetching: true
};

function fetchTimezone(id) {
        var self = _resources[id];

        if (self.timezoneOffset) return;


        client.getTime(self.id, function (err, res) {
            if (err) return;
            self.timezoneOffset = res.time.tzo;
        });
        _resources[id]=self;

    }

function fetchDisco(id) {
        var self = _resources[id];

        if (self.discoInfo) return;

        client.getDiscoInfo(self.id, '', function (err, res) {
            if (err) return;
            self.discoInfo = res.discoInfo.toJSON();
        });

        _resources[id]=self;


    }
function comparator (res1, res2) {
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




export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
     case ActionTypes.CREATE_RESOURCE:

            resource = {};
            resource.id = pres.from.full;

            _resources[pres.from.bare]=resource;

            if (!pres.caps) {
                fetchDisco(pres.from.bare);
            }
            fetchTimezone(pres.from.bare);
            return { ...state };

    default:
      return state;
  }
}