

var React = require('react');
var MessageStore = require('../../../stores/MessageStore');
var UnreadMucStore= require('../../../stores/UnreadMucStore');
var ChannelListItem = require('./ChannelListItem.react');
var MucStore = require('../../../stores/MucStore');
var ChatTypeStore = require('../../../stores/ChatTypeStore');
var UnreadThreadStore = require('../../../stores/UnreadThreadStore');
var Router = require('react-router');

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;
function getSectionStateFromStores() {

    return {
        channels: MucStore.getAll(),
        currentMucID: MucStore.getCurrentChannelId(),
        unreadCount: UnreadMucStore.getCount(),
        chat: ChatTypeStore.getCurrent()
    };
}

var ChannelSection = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

    getInitialState: function() {
        return getSectionStateFromStores();
    },

    componentDidMount: function() {
        MucStore.addChangeListener(this._onChange);
        UnreadMucStore.addChangeListener(this._onChange);
        ChatTypeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        MucStore.removeChangeListener(this._onChange);
        UnreadMucStore.removeChangeListener(this._onChange);
        ChatTypeStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var channelListItems = this.state.channels.map(function(channel) {
            return (
                <ChannelListItem
                    key={channel.jid}
                    channel={channel}
                    currentMucID={this.state.currentMucID}
                    chat={this.state.chat}
                    params={channel}
                />
            );
        }, this);

        return (
      <div className="card">
        <div className="card-footer card-head">
						<a href="javascript:void(0)" className="pull-left">Channels</a>
						<Link to="create_muc"> <button className="btn btn-xs btn-blue pull-right btn-ripple">Create Channel</button></Link>
					</div>


          <ul className="list-material channel-list message-list">


          {channelListItems}
        </ul>
      </div>


        );
    },

    /**
     * Event handler for 'change' events coming from the stores
     */
    _onChange: function() {
        this.setState(getSectionStateFromStores());
    }

});

module.exports = ChannelSection;
