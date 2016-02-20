var React = require('react');
var Router = require('react-router');
var Dashboard = require('./Dashboard.react');
var AppDashboard = React.createClass({


  getInitialState: function () {
    return {

    };
  },

  setStateOnAuth: function (loggedIn) {
    this.setState({

    });
  },

  componentWillMount: function () {

  },

  render: function () {

      return (<Dashboard/>);



  }
});

module.exports = AppDashboard;
