

var ChatMessageActionCreators = require('../../actions/ChatMessageActionCreators');
var React = require('react');
var ChatTypeStore = require('../../stores/ChatTypeStore');

var ENTER_KEY_CODE = 13;

var MessageComposer = React.createClass({

  propTypes: {
    chat: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {text: ''};
  },

  render: function() {
    return (


    <div className="send-message">
        <div >
          <div className="inputer inputer-blue">
            <div className="input-wrapper">
              <textarea rows="3" id="send-message-input"
                name="message"
                className="form-control  message-composer js-auto-size"
                placeholder="Message"
                value={this.state.text}
                onChange={this._onChange}
                onKeyDown={this._onKeyDown}

                />
            </div>
          </div>

        </div>
      </div>


    );
  },

  _onChange: function(event, value) {
    this.setState({text: event.target.value});
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        ChatMessageActionCreators.createMessage(text, this.props.chat,chat_type=ChatTypeStore.getCurrent());


      }
      this.setState({text: ''});
    }
  }

});

module.exports = MessageComposer;
