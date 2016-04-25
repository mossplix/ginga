


var React = require('react');
var cx = require('react/lib/cx');

var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;

import { connect } from 'react-redux'

var ThreadListItem = React.createClass({

  propTypes: {
    thread: ReactPropTypes.object,
    currentChat: ReactPropTypes.object,
    params: ReactPropTypes.object

  },
  contextTypes: {
    router: React.PropTypes.func
  },

 _handleClick() {

    this.props.actions.clickThread(this.props.thread.id);

  },


  render: function() {
      const {thread,actions} = this.props;
    var lastMessage = thread.lastMessage;

      if (lastMessage != null)
      {

    return (
      <div>


      <li key={thread.id} className={cx({
        'has-action-left has-action-right': true,
        'active ': thread.id === this.props.currentChat.id
      })}
      onClick={::this._handleClick} >
      <Link to={`/chat/threads/${thread.id}`}   className="visible" params={thread}>
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
                      'active': thread.id === this.props.currentChat.id
                  })}
                   onClick={::this._handleClick} >
                  <div className="list-content2">
                      <span className="title">{thread.name}</span>

                  </div>




                  </li>
          );
      }
  }



});



export default ThreadListItem;
