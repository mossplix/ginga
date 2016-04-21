import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from './Header'
import MainSection from './MainSection'
import * as TaskActions from '../../actions/taskActions'

class TasksApp extends Component {

  render() {
    const { tasks, actions } = this.props
    return (
      <div>
        <Header addTask={actions.addTask} />
        <MainSection tasks={tasks} actions={actions} />
      </div>
    )
  }
}

TasksApp.propTypes = {
  tasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
}


TasksApp.contextTypes = {
    router: React.PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    tasks: state.tasks
});


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskActions, dispatch)
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksApp)
