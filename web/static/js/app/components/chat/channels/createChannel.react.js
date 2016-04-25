
var React = require('react');
var cx = require('react/lib/cx');
var Router = require('react-router');
import { connect } from 'react-redux'

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


  createChannel: function (event) {
    event.preventDefault();
    var channel=this.props.addNewMuc({
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


export default createChannel;
