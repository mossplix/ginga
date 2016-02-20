

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/Constants');
var ActionTypes = TodoConstants.ActionTypes;

var TodoActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TODO_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    var id = todo.id;
    if (todo.complete) {
      AppDispatcher.handleViewAction({
        type: ActionTypes.TODO_UNDO_COMPLETE,
        id: id
      });
    } else {
      AppDispatcher.handleViewAction({
        type: ActionTypes.TODO_COMPLETE,
        id: id
      });
    }
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TODO_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TODO_DESTROY_COMPLETED
    });
  }

};

module.exports = TodoActions;
