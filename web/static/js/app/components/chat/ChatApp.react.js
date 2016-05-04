
import  MessageSection from './MessageSection.react';
var React = require('react');
import ThreadSection from './ThreadSection.react';
import ChannelSection from './channels/ChannelSection.react';
import MessageComposer from './MessageComposer.react';

import * as  ChatActions from '../../actions/chatActions';

import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

import {currentThreadMessagesSelector} from '../../selectors';

import Paper from 'material-ui/paper';

var ChatApp = React.createClass({

      propTypes: {
       messages: React.PropTypes.array.isRequired,
       actions: React.PropTypes.object.isRequired,
       router: React.PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },
    handleUpdateSelectedIndex(event, index) {
      this.setState({
        selectedIndex: index,
      });
    },


  render: function() {
      const {messages,actions,channels,threads,currentChat,dispatch,threadMessages,location} = this.props;
    return (
      <div className="layer-container">
          <div className=" fade in active" id="messages">


          <div className="col-md-4">
           <Paper zDepth={2}>


                          <ChannelSection location={location} actions={actions} channels={channels} currentChat={currentChat} dispatch={dispatch} />
                          <ThreadSection location={location}  actions={actions} threads={threads} currentChat={currentChat} dispatch={dispatch} />

              </Paper>



              </div>

          <div className="col-md-8">

        <MessageSection actions={actions} messages={messages} currentChat={currentChat} threadMessages={threadMessages} />
           <MessageComposer currentChat={currentChat}  actions={actions}/>
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


const mapStateToProps = (state,ownProps) => ({
    messages: state.messages,
    currentMessage: state.currentMessage,
    channels: state.rooms,
    contacts: state.contacts,
    currentChat: state.currentChat,
    threads:state.threads,
    location: ownProps.location,
    threadMessages: currentThreadMessagesSelector(state)

});



export default connect(mapStateToProps,  mapDispatchToProps)(ChatApp);

