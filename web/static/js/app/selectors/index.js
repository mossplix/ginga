import {createSelector} from 'reselect';
import _ from 'lodash';

const messageListByQuerySelector = state => state.messageListByQuery;
const threadsByIDSelector = state => state.threads;
const roomsByIDSelector = state => state.rooms;
const messagesByIDSelector = state => state.messages;

export const isLoadingSelector = state => state.isLoading;
export const labelsSelector = state => state.labels;
export const threadsSelector = state => state.threads;
export const searchQuerySelector = state => state.app.searchQuery;
export const selectedMessageIDSelector = state => state.currentChat.messageID;
export const selectedIDSelector = state => state.currentChat.id;

export const selectedRoomIDSelector = state => state.currentChat.roomID;

export const selectedSuggestionBox  = state => state.currentSuggestion.id;
export const suggestionsSelector = state => state.suggestions;



const jidSelector = state => state.xmpp.jid;



export const allThreadsSelector = createSelector([
  searchQuerySelector,
  messageListByQuerySelector,
  threadsByIDSelector,
], (
  searchQuery,
  messageListByQuery,
  threadsByID,
) => {
  const threadList = messageListByQuery[searchQuery];
  return threadList ?
    threadList.threadIDs.map(threadID => threadsByID[threadID]) :
    [];
});


export const currentThreadMessagesSelector = createSelector([
    messagesByIDSelector,
  selectedIDSelector,
        jidSelector
], (
  messages,
  id,
      jid
) => {
     var from_messages=_.filter(messages,{from:id,to: jid});
      var   my_messages=_.filter(messages,{from:jid,to:id});
    const toret= _.uniqBy(from_messages.concat(my_messages), function(elem) { return [elem.from,elem.to,elem.created,elem.text].join(); });
    return _.orderBy(toret,["created"],['desc']);
});


export const selectedThreadMessagesSelector = createSelector([
  threadsByIDSelector,
  selectedIDSelector,
  messagesByIDSelector,
], (
  threadsByID,
  selectedThreadID,
  messagesByID,
) => {
  const selectedThread = threadsByID[selectedThreadID];
  return selectedThread &&
    selectedThread.messageIDs.map(messageID => messagesByID[messageID]);
});



export const selectedSuggestionSelector = createSelector([
  suggestionsSelector,
 selectedSuggestionBox
], (
  suggestions,
  message_box_id
) => {
        var id = message_box_id||null;
  const suggestion = suggestions[id];
  return suggestion;
});


export const chronoThreadsSelector=createSelector([threadsSelector],(threads
    ) => {
        var orderedThreads = [];
    for (var id in threads) {
      var thread = threads[id];
      orderedThreads.push(thread);
    }
    orderedThreads.sort(function(a, b) {
        if (!a.lastMessage === null) {

            if (a.lastMessage._created < b.lastMessage._created) {
                return -1;
            } else if (a.lastMessage._created > b.lastMessage._created) {
                return 1;
            }
        }else{
            return -1;
        }
      return 0;

    });
    return orderedThreads;
    }

);


export const lastMessageInEachThreadSelector = createSelector([
  messagesByIDSelector,
  threadsSelector
], (
  messagesByID,
  threads
) => {
  return threads && _.toArray(threads).map(
    thread => messagesByID[_.last(thread.messageIDs)]
  );
});

export const hasMoreThreadsSelector = createSelector([
  searchQuerySelector,
  messageListByQuerySelector,
], (
  searchQuery,
  messageListByQuery,
) => {
  const threadList = messageListByQuery[searchQuery];
  return !threadList || !!threadList.nextPageToken;
});

export const loadedThreadCountSelector = createSelector([
  searchQuerySelector,
  messageListByQuerySelector,
], (
  searchQuery,
  messageListByQuery,
) => {
  const threadList = messageListByQuery[searchQuery];
  return threadList ? threadList.threadIDs.length : 0;
});

export const nextMessageSelector = createSelector([
  lastMessageInEachThreadSelector,
  selectedMessageIDSelector,
], (
  messages,
  selectedMessageID
) => {
  if (!messages) {
    return null;
  }

  const selectedMessageIndex = selectedMessageID &&
    messages.findIndex(
      msg => msg.id === selectedMessageID
    );

  if (!selectedMessageID) {
    return messages[0];
  } else if (selectedMessageIndex < 0 || selectedMessageIndex === messages.length) {
    return null;
  } else {
    return messages[selectedMessageIndex + 1];
  }
});

export const prevMessageSelector = createSelector([
  lastMessageInEachThreadSelector,
  selectedMessageIDSelector,
], (
  messages,
  selectedMessageID
) => {
  if (!messages) {
    return null;
  }

  const selectedMessageIndex = selectedMessageID &&
    messages.findIndex(
      msg => msg.id === selectedMessageID
    );

  if (!selectedMessageID) {
    return messages[0];
  } else if (selectedMessageIndex < 0 || selectedMessageIndex === 0) {
    return null;
  } else {
    return messages[selectedMessageIndex - 1];
  }
});
