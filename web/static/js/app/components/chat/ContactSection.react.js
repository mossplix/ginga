

import MessageComposer from './MessageComposer.react';
import MessageListItem from './MessageListItem.react';

var React = require('react');

import { connect } from 'react-redux'


function getMessageListItem(message,actions) {
    return (
        <MessageListItem
            key={message.id}
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
        var messageListItems = this.props.messages.map((message,index)=> getMessageListItem(message,this.props.actions));

        return (
            <div className="message-section">
                <h3 className="message-thread-heading">{this.props.thread.name}</h3>
                <ul className="message-list" ref="messageList">
          {messageListItems}
                </ul>
                <MessageComposer threadID={this.props.thread.id} actions={this.props.actions}/>
            </div>
        );
    },

    componentDidUpdate: function() {
        this._scrollToBottom();
    },

    _scrollToBottom: function() {
        var ul = this.refs.messageList.getDOMNode();
        ul.scrollTop = ul.scrollHeight;
    }



});

export default MessageSection;
