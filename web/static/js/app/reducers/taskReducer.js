import types  from '../constants'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TASK:
      return [
        {
          id: state.reduce((maxId, task) => Math.max(task.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }, 
        ...state
      ]

    case types.DELETE_TASK:
      return state.filter(task =>
        task.id !== action.id
      )

    case types.EDIT_TASK:
      return state.map(task =>
        task.id === action.id ?
          Object.assign({}, task, { text: action.text }) :
          task
      )

    case types.COMPLETE_TASK:
      return state.map(task =>
        task.id === action.id ?
          Object.assign({}, task, { completed: !task.completed }) :
          task
      )

    case types.COMPLETE_ALL:
      const areAllMarked = state.every(task => task.completed)
      return state.map(task => Object.assign({}, task, {
        completed: !areAllMarked
      }))

    case types.CLEAR_COMPLETED:
      return state.filter(task => task.completed === false)

    default:
      return state
  }
}
