
import MessageComposer from './MessageComposer.react';
import MessageListItem from './MessageListItem.react';

var React = require('react');

import { connect } from 'react-redux'
import ReactDOM from 'react-dom';




function getMessageListItem(message,actions,index) {
  return (
    <MessageListItem
      key={index}
      message={message}
          actions={actions}
    />
  );
}

var MessageSection = React.createClass({


  componentDidMount: function() {
    this._scrollToBottom();


  },


  render: function() {
    var messageListItems = _.toArray(this.props.threadMessages).map((message,index) => getMessageListItem(message,this.props.actions,index) );
    return (
      <div  >
             <h3 className="message-thread-heading">{this.props.currentChat.type}</h3>
            <div
                    ref='postlist'
                    className='post-list-holder-by-time message-list'
                >
                    <div className='post-list__table'>
                        <div
                            ref='postlistcontent'
                            className='post-list__content'
                        >


        <div className="message-send-container">

          <div className="messages" ref="messageList">

            {messageListItems}



          </div>


        </div>
      </div>


    </div>
    </div>
    </div>

    );
  },

  componentDidUpdate: function() {
    this._scrollToBottom();
  },

  _scrollToBottom: function() {
    var ul = ReactDOM.findDOMNode(this.refs.messageList);

    ul.scrollTop = ul.scrollHeight;
  }



});






export default MessageSection;
