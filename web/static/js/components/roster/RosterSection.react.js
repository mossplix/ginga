
var React = require('react');
var MessageStore = require('../stores/MessageStore');
var ChannelListItem = require('../components/channels/ChannelListItem.react');
var ThreadStore = require('../stores/ThreadStore');
var UnreadThreadStore = require('../stores/UnreadThreadStore');

function getStateFromStores() {
    return {
        channels: MucStore.getAll(),
        currentChannel: MucStore.getCurrentChannel(),
        unreadCount: UnreadMucStore.getCount()
    };
}

var ChannelSection = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        ThreadStore.addChangeListener(this._onChange);
        UnreadThreadStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ThreadStore.removeChangeListener(this._onChange);
        UnreadThreadStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var threadListItems = this.state.threads.map(function(thread) {
            return (
                <ChannelListItem
                    key={thread.id}
                    thread={thread}
                    currentThreadID={this.state.currentThreadID}
                />
            );
        }, this);
        var unread =
            this.state.unreadCount === 0 ?
                null :
                <span>Unread threads: {this.state.unreadCount}</span>;
        return (
            <div className="thread-section">
                <div className="thread-count">
          {unread}
                </div>
                <ul className="thread-list">
          {threadListItems}
                </ul>
            </div>
        );
    },

    /**
     * Event handler for 'change' events coming from the stores
     */
    _onChange: function() {
        this.setState(getStateFromStores());
    }

});

module.exports = ThreadSection;
