import ActionTypes  from '../constants';

const initialState = {
  fetching: true
};

 function getCount() {
        var threads = MucStore.getAll();
        var unreadCount = 0;
        //use xmpp
        return unreadCount;
    }

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.CLICK_CHANNEL:

            return { ...state };

    case ActionTypes.MUC_RECEIVE_RAW_MESSAGES:

        return { ...state };

    default:
      return state;
  }
}