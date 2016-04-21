import React, { PropTypes, Component } from 'react'
import TaskTextInput from './TaskTextInput'

class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTask(text)
    }
  }

  render() {
    return (
      <header className="header">
          <h1>tasks</h1>
          <TaskTextInput newTask
                         onSave={this.handleSave.bind(this)}
                         placeholder="What needs to be done?" />
      </header>
    )
  }
}

Header.propTypes = {
  addTask: PropTypes.func.isRequired
}

export default Header
