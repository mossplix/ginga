var React = require('react');
var Router = require('react-router');
var AppActionCreators = require('../../actions/AppActionCreators');

var ProjectApp = React.createClass({


  getInitialState: function () {
    return {

    };
  },

  componentDidMount: function() {
    AppActionCreators.appLoaded("projects","Project Management","");

  },

  componentWillMount: function () {

  },

  render: function () {

      return (<div>Projects</div>);



  }
});
module.exports=ProjectApp;
