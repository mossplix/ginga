import  types  from '../constants';


export function addTask(text) {
  return { type: types.ADD_TASK, text }
}

export function deleteTask(id) {
  return { type: types.DELETE_TASK, id }
}

export function editTask(id, text) {
  return { type: types.EDIT_TASK, id, text }
}

export function completeTask(id) {
  return { type: types.COMPLETE_TASK, id }
}

export function completeAll() {
  return { type: types.COMPLETE_ALL }
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED }
}
