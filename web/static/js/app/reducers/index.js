import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';
import session              from './sessionReducer';
import registration         from './registrationReducer';
import boards               from './boardReducer';
import currentBoard         from './currentBoardReducer';
import currentCard          from './currentCardReducer';
import header               from './headerReducer';
import xmpp                from './xmppReducer'
import app                from './appReducer'
import calls                from './callReducer'
import currentChat                from './currentChatReducer'
import contacts                from './contactReducer'
import loading                from './loadingReducer'
import messages                from './messageReducer'
import resources                from './resourceReducer'
import rooms                from './roomReducer'
import threads                from './threadReducer'
import task                from './taskReducer'
import unreadThread                from './unreadThreadReducer'
import unreadRoom                from './unreadRoomReducer'
import user                from './userReducer'
import tasks from './taskreducer'

import MessageListReducer from './MessageListReducer';

export default combineReducers({
  routing: routerReducer,
  session: session,
  registration: registration,
  boards: boards,
  currentBoard: currentBoard,
  currentCard: currentCard,
    currentChat:currentChat,
  header: header,
    tasks:tasks,
    xmpp: xmpp,
    messages:messages,
    loading: loading,
    user: user,
    unreadRoom: unreadRoom,
    unreadThread:unreadThread,
    threads: threads,
    rooms: rooms,
    contacts: contacts,
    calls:calls,
    resources: resources,
    app:app,
     messageListByQuery: MessageListReducer,



});
