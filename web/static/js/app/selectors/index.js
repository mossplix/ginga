import {createSelector} from 'reselect';
import _ from 'lodash';

const messageListByQuerySelector = state => state.messageListByQuery;
const threadsByIDSelector = state => state.threadsByID;
const roomsByIDSelector = state => state.roomsByID;
const messagesByIDSelector = state => state.messagesByID;

export const isLoadingSelector = state => state.isLoading;
export const labelsSelector = state => state.labels;
export const searchQuerySelector = state => state.app.searchQuery;
export const selectedMessageIDSelector = state => state.router.params.messageID;
export const selectedThreadIDSelector = state => state.router.params.threadID;
export const selectedRoomIDSelector = state => state.router.params.roomID;


export const threadsSelector = createSelector([
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

export const selectedThreadMessagesSelector = createSelector([
  threadsByIDSelector,
  selectedThreadIDSelector,
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


export const lastMessageInEachThreadSelector = createSelector([
  messagesByIDSelector,
  threadsSelector
], (
  messagesByID,
  threads
) => {
  return threads && threads.map(
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
