

var ChatThreadActionCreators = require('../actions/ChatThreadActionCreators');
var React = require('react');
var cx = require('react/lib/cx');

var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;
var ThreadStore = require('../stores/ThreadStore');

var ThreadListItem = React.createClass({

  propTypes: {
    thread: ReactPropTypes.object,
    currentThreadID: ReactPropTypes.string,
      chat: ReactPropTypes.object,
      params: ReactPropTypes.object

  },
  contextTypes: {
    router: React.PropTypes.func
  },
  getThreadStateFromStore: function () {
    var id = this.context.router.getCurrentParams().id;
    if (!id){
      id=this.props.thread.id;
    }


    return {
      thread: ThreadStore.get(id),
    };
  },

  getInitialState: function () {
    return this.getThreadStateFromStore();
  },

  componentDidMount: function () {
    ThreadStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ThreadStore.addChangeListener(this._onChange);
  },

  componentWillReceiveProps: function () {
    ThreadStore.addChangeListener(this._onChange);
  },

  render: function() {
    var thread = this.props.thread;
    var lastMessage = thread.lastMessage;

      if (lastMessage != null)
      {

    return (
      <div>


      <li key={thread.id} className={cx({
        'has-action-left has-action-right': true,
        'active ': thread.id === this.props.chat.id
      })}
      onClick={this._onClick} >
      <Link to="thread" className="visible" params={thread}>
          <div className="list-action-left">
            <img src={lastMessage.sender().avatar} className="face-radius" alt=""></img>
          </div>
          <div className="list-content">
            <span className="title">{thread.name}</span>
            <span className="caption">{lastMessage.text}</span>
          </div>
          <div className="list-action-right">
            <span className="top">{lastMessage.formattedTime()}</span>
            <i className="ion-android-done bottom"></i>
          </div>
        </Link>
      </li>
    </div>




    );}

      else
      {
          return (
              <li
                  className={cx({
                      'has-action-left has-action-right channels': true,
                      'active': thread.id === this.props.chat.id
                  })}
                  onClick={this._onClick}>
                  <div className="list-content2">
                      <span className="title">{thread.name}</span>

                  </div>




                  </li>
          );
      }
  },

  _onClick: function() {
    ChatThreadActionCreators.clickThread(this.props.thread.id);
  },
  _onChange: function() {
    this.setState(this.getThreadStateFromStore());
  }

});

module.exports = ThreadListItem;
