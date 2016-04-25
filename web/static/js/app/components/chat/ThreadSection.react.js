

var React = require('react');
import ThreadListItem from './ThreadListItem.react';
var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;
import { connect } from 'react-redux'


var ThreadSection = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },



  render: function() {
      const {actions,threads,currentChat,dispatch} = this.props;
    var threadListItems = _.toArray(this.props.threads).map(function(thread) {
      return (

        <ThreadListItem
          id={thread.id}
          thread={thread}
            currentChat={currentChat}
            params={thread}
                actions={actions}
                    dispatch={dispatch}
        />

      );
    }, this);
    return (

        <div className="card">

          <div className="card-footer card-head">
  						<a href="javascript:void(0)" className="pull-left">Conversations</a>
  						
  					</div>
        <ul className="list-material conv-list message-list">

          {threadListItems}

        </ul>

      </div>

    );
  }



});






export default ThreadSection;

