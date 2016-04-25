
var React = require('react');

import ChannelListItem from '../components/channels/ChannelListItem.react';

import { connect } from 'react-redux'


var ChannelSection = React.createClass({



    render: function() {
        var threadListItems = this.props.threads.map(function(thread) {
            return (
                <ChannelListItem
                    key={thread.id}
                    thread={thread}
                    currentThreadID={this.props.currentThreadID}
                />
            );
        }, this);
        var unread =
            this.props.unreadCount === 0 ?
                null :
                <span>Unread threads: {this.props.unreadCount}</span>;
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

    }

});



export default ThreadSection;
