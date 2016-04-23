import ActionTypes  from '../constants';

const initialState = {
  fetching: true,
    header: "",
    messageID:null,
    threadID:null,
    roomID:null,
    app: "",
    type:""
};

export default function reducer(state = initialState, action = {}) {
     switch (action.type) {

         case ActionTypes.CLICK_THREAD:

            return { ...state, type:"chat", id:id };

        case ActionTypes.CLICK_CHANNEL:

            return { ...state, type: "groupchat" };

        case ActionTypes.RECEIVE_RAW_MUCS:

            return { ...state};


    default:
      return state;
  }
}