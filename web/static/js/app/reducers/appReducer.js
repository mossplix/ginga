import ActionTypes  from '../constants';

const initialState = {
  fetching: false,
    header: "",
    app: "",
    xmpp_connected:false,
    searchQuery:""
};

  function markInactive   () {
        if (this.focused) {
            return this.markActive();
        }

        _active = false;
        _idleSince = new Date(Date.now());
    }

export default function reducer(state = initialState, action = {}) {
     switch (action.type) {

         case ActionTypes.CLIENT_ON_DISCONNECTED:

            return { ...state, xmpp_connected:true  };

        case  ActionTypes.CLIENT_ON_STREAM_MANAGEMENT_RESUMED:

            return { ...state, xmpp_connected:true  };
        case ActionTypes.CLIENT_ON_SESSION_STARTED:

            return { ...state, xmpp_connected:true  };

        case ActionTypes.SEARCH:
          return {
            ...state,
            searchQuery: action.searchQuery,
          };


    default:
      return state;
  }
}

