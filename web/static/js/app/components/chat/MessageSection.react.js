
var MessageComposer = require('./MessageComposer.react');
var MessageListItem = require('./MessageListItem.react');
var MessageStore = require('../../stores/messageStore');

var React = require('react');
var ThreadStore = require('../../stores/ThreadStore');
var ChatTypeStore = require('../../stores/ChatTypeStore');
var MucStore = require('../../stores/MucStore');


function getStateFromStores() {
  return {

      messages: MessageStore.getAllForCurrentThread(),
      chat: ChatTypeStore.getCurrent()

  };
}

function getMessageListItem(message) {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  );
}

var MessageSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    this._scrollToBottom();
    MessageStore.addChangeListener(this._onChange);
    ThreadStore.addChangeListener(this._onChange);
      MucStore.addChangeListener(this._onChange);
      ChatTypeStore.addChangeListener(this._onChange);


  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    ThreadStore.removeChangeListener(this._onChange);
      MucStore.removeChangeListener(this._onChange);
      ChatTypeStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var messageListItems = _.map(this.state.messages,getMessageListItem);
    return (
      <div className="col-md-8">
        <div className="message-send-container">
          <h3 className="message-thread-heading">{this.state.chat.type}</h3>
          <div className="messages message_list" ref="messageList">

            {messageListItems}

            <MessageComposer chat={this.state.chat} />

          </div>


        </div>
      </div>
    );
  },

  componentDidUpdate: function() {
    this._scrollToBottom();
  },

  _scrollToBottom: function() {
    var ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  },

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = MessageSection;
