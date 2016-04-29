
import  MessageSection from './MessageSection.react';
var React = require('react');
import ThreadSection from './ThreadSection.react';
import ChannelSection from './channels/ChannelSection.react';

import * as  ChatActions from '../../actions/chatActions';

import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

import {currentThreadMessagesSelector} from '../../selectors';

var ChatApp = React.createClass({

      propTypes: {
       messages: React.PropTypes.array.isRequired,
       actions: React.PropTypes.object.isRequired,
       router: React.PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },


  render: function() {
      const {messages,actions,channels,threads,currentChat,dispatch,threadMessages} = this.props;
    return (
      <div className="layer-container">
          <div className=" fade in active" id="messages">


          <div className="col-md-4">





                          <ChannelSection actions={actions} channels={channels} currentChat={currentChat} dispatch={dispatch} />
                          <ThreadSection actions={actions} threads={threads} currentChat={currentChat} dispatch={dispatch} />



              </div>

          <div className="">

        <MessageSection actions={actions} messages={messages} currentChat={currentChat} threadMessages={threadMessages} />
              </div>
      </div>
          </div>




    );
  }

});





function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChatActions, dispatch),
      dispatch:dispatch
  }
}


const mapStateToProps = (state) => ({
    messages: state.messages,
    channels: state.rooms,
    contacts: state.contacts,
    currentChat: state.currentChat,
    threads:state.threads,
    threadMessages: currentThreadMessagesSelector(state)
});



export default connect(mapStateToProps,  mapDispatchToProps)(ChatApp);

