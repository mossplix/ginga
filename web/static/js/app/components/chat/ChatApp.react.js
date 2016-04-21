
var MessageSection = require('./MessageSection.react');
var React = require('react');
var ThreadSection = require('./ThreadSection.react');
var ChannelSection = require('./channels/ChannelSection.react');
var AppActionCreators = require('../../actions/AppActionCreators');


var ChatApp = React.createClass({
  componentDidMount: function() {
    AppActionCreators.appLoaded("chat","Chat App","Chat With your Team");

  },

  render: function() {
    return (
      <div className="layer-container">
          <div className=" fade in active" id="messages">


          <div className="col-md-4">





                          <ChannelSection />
                          <ThreadSection />



              </div>

          <div className="">

        <MessageSection />
              </div>
      </div>
          </div>




    );
  }

});

module.exports = ChatApp;
