const ActionTypes = require('../constants');

module.exports = (messageListByQuery = {}, action) => {
  const messageList = messageListByQuery[action.query];
  switch (action.type) {
    case ActionTypes.LOAD_MESSAGES:
      if (messageList) {
        return {
          ...messageListByQuery,
          [action.query]: {
            ...messageList,
            isFetching: true,
          },
        };
      }

      return {
        ...messageListByQuery,
        [action.query]: {
          messageIDs: [],
          nextPageToken: null,
          resultSizeEstimate: null,
          isFetching: true,
        },
      };

    case ActionTypes.LOAD_MESSAGES_SUCCESS:
      const newmessageIDs = action.messages.map(message => message.id);
      return {
        ...messageListByQuery,
        [action.query]: {
          messageIDs: [...messageList.messageIDs, ...newmessageIDs],
          nextPageToken: action.nextPageToken,
          resultSizeEstimate: action.resultSizeEstimate,
          isFetching: false,
        },
      };

    case ActionTypes.REFRESH:
      console.log('clearing the store')
      return {};
    case ActionTypes.MESSAGE_SENT:


        return {...messageListByQuery,[action.message.id]:action.message};


    case ActionTypes.MESSAGES_ARCHIVE_REQUEST:
      return removemessage(messageListByQuery, action.messageID, /in\:\s*inbox/);


    case ActionTypes.MESSAGES_UNSTAR_REQUEST:
      return removemessage(
        messageListByQuery,
        action.messageID,
        /is\:\s*starred/
      );
  }
  return messageListByQuery;
};

function removemessage(messageListByQuery, messageIDToRemove, queryRegex) {
  return Object.keys(messageListByQuery)
    .reduce((newmessageListByQuery, query) => {
      if (queryRegex.test(query)) {
        const existingmessageList = messageListByQuery[query];
        const newmessageIDs = existingmessageList.messageIDs.filter(
          messageID => messageID !== messageIDToRemove
        );
        if (newmessageIDs.length < existingmessageList.messageIDs.length) {
          newmessageListByQuery[query] = {
            ...existingmessageList,
            messageIDs: newmessageIDs,
          };
        } else {
          newmessageListByQuery[query] = existingmessageList;
        }
      }

      return newmessageListByQuery;
    }, {});
}

function removeMatchingQueries(messageListByQuery, queryRegex) {
  return Object.keys(messageListByQuery)
    .reduce((newmessageListByQuery, query) => {
      if (!queryRegex.test(query)) {
        newmessageListByQuery[query] = messageListByQuery[query];
      }

      return newmessageListByQuery;
    }, {});
}
