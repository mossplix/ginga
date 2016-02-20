var ChatChannelActionCreators = require('../../actions/ChatChannelActionCreators');
var ChatThreadActionCreators = require('../../actions/ChatThreadActionCreators');
var React = require('react');
var cx = require('react/lib/cx');
var MucStore = require('../../stores/MucStore');
var Router = require('react-router');
var AppActionCreators = require('../../actions/AppActionCreators');

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;

var ReactPropTypes = React.PropTypes;


var createChannel = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function() {
    AppActionCreators.appLoaded("chat","Channels","Create Channel");

  },

  createChannel: function (event) {
    event.preventDefault();
    var channel=MucStore.addNewMuc({
      name: this.refs.name.getDOMNode().value,
      desc: this.refs.description.getDOMNode().value
    });

    this.context.router.transitionTo('channel', { id: channel.id });
  },

  render: function () {
    return (
      <form onSubmit={this.createChannel}>
        <h3>Create Channel</h3>
        <p>
          <input type="text" ref="name" placeholder="Name"/>
        </p>
        <p>
          <input type="text" ref="description" placeholder="Description"/>
        </p>
        <p>
          <button type="submit">Save</button> <Link to="/chat">Cancel</Link>
        </p>
      </form>
    );
  }
});


module.exports = createChannel;
