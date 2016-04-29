import { connect } from 'react-redux'

var React = require('react');

var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var MessageListItem = React.createClass({

  propTypes: {
    message: ReactPropTypes.object
  },

  render: function() {
    var message = this.props.message;
    return (

      <div className={cx({
        'message': true,
        'left': message.isMine(),
        'right':!message.isMine()
      })}

          key={"msg_"+this.props.message.id}



    >



        <div className="message-text">{message.text}


              <div className="list-action-right">
                <span className="top">{message.nickname()}</span>
                  &nbsp;&nbsp;
                  <time className="meta">{message.formattedTime()}</time>


              </div>
        </div>
          <img src={message.getSenderAvatar()} className="user-picture" alt={message.nickname()}>
          </img>





      </div>

    );
  }

});

export default MessageListItem;
