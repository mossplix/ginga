

var React = require('react');
var MessageStore = require('../stores/MessageStore');
var ThreadListItem = require('../components/ThreadListItem.react');
var ThreadStore = require('../stores/ThreadStore');
var ChatTypeStore = require('../stores/ChatTypeStore');
var Router = require('react-router');
var UnreadThreadStore = require('../stores/UnreadThreadStore');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;

function getStateFromStores() {
  return {
    threads: ThreadStore.getAllChrono(),
    currentThreadID: ThreadStore.getCurrentID(),
    unreadCount: UnreadThreadStore.getCount(),
      chat:ChatTypeStore.getCurrent()
  };
}

var ThreadSection = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    ThreadStore.addChangeListener(this._onChange);
    UnreadThreadStore.addChangeListener(this._onChange);
      ChatTypeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ThreadStore.removeChangeListener(this._onChange);
    UnreadThreadStore.removeChangeListener(this._onChange);
      ChatTypeStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var threadListItems = this.state.threads.map(function(thread) {
      return (

        <ThreadListItem
          key={thread.id}
          thread={thread}
          currentThreadID={this.state.currentThreadID}
            chat={this.state.chat}
            params={thread}
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
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = ThreadSection;
