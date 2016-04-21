import React, { Component, PropTypes } from 'react'
import Task from './Task'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/TaskFilters'

const TASK_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: task => !task.completed,
  [SHOW_COMPLETED]: task => task.completed
}

class MainSection extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { filter: SHOW_ALL }
  }

  handleClearCompleted() {
    this.props.actions.clearCompleted()
  }

  handleShow(filter) {
    this.setState({ filter })
  }

  renderToggleAll(completedCount) {
    const { tasks, actions } = this.props
    if (tasks.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === tasks.length}
               onChange={actions.completeAll} />
      )
    }
  }

  renderFooter(completedCount) {
    const { tasks } = this.props
    const { filter } = this.state
    const activeCount = tasks.length - completedCount

    if (tasks.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      )
    }
  }

  render() {
    const { tasks, actions } = this.props
    const { filter } = this.state

    const filteredTasks = tasks.filter(TASK_FILTERS[filter])
    const completedCount = tasks.reduce((count, task) =>
      task.completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="task-list">
          {filteredTasks.map(task =>
            <Task key={task.id} task={task} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}

MainSection.propTypes = {
  tasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection
