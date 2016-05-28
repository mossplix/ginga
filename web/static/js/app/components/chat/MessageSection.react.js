
import MessageComposer from './MessageComposer.react';
import MessageListItem from './MessageListItem.react';

var React = require('react');

import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import * as ChatActions from '../../actions/chatActions';
import {List, ListItem} from 'material-ui/List';



function getMessageListItem(message,actions,index) {
  return (
    <MessageListItem
      message={message}
          actions={actions}
              ident={index}
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
           <List>

            {messageListItems}
          </List>



          </div>


        </div>
      </div>


    </div>
    </div>

     <List>
     </List>

    </div>

    );
  },

  componentDidUpdate: function() {
    this._scrollToBottom();
  },

  _scrollToBottom: function() {
    var ul = ReactDOM.findDOMNode(this.refs.messageList);
      console.log("s");

    ul.scrollTop = ul.scrollHeight;
  }



});






export default MessageSection;
