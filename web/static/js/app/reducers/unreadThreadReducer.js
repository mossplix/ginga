import ActionTypes  from '../constants';

const initialState = {
  fetching: true
};

 function getCount() {
    var threads = ThreadStore.getAll();
    var unreadCount = 0;

    return unreadCount;
  }


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.CLICK_THREAD:
      return { ...state };

    case ActionTypes.RECEIVE_RAW_MESSAGES:
       return { ...state };

    default:
      return state;
  }
}