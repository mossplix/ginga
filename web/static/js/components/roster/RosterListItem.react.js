

var ChatChannelActionCreators = require('../actions/ChatChannelActionCreators');
var React = require('react');
var cx = require('react/lib/cx');

var ReactPropTypes = React.PropTypes;

var ChannelListItem = React.createClass({

    propTypes: {
        thread: ReactPropTypes.object,
        currentChannelID: ReactPropTypes.string
    },

    render: function() {
        var channel = this.props.channel;
        return (



            <li className={cx({
            'thread-list-item': true,
            'active': thread.id === this.props.currentThreadID
    })}
onClick={this._onClick}>
        <Link to={channel.link}>chat window</Link>
        <span className="lcb-tab-title">{channel.name}</span>
    <span className="lcb-tab-alerts">
        <span className="lcb-tab-alerts-mentions">{channel.state.unread}</span>
        <span className="lcb-tab-alerts-total"></span>
    </span>
    <span className="lcb-tab-close">×</span>
</Link>
</li>
        );
    },

    _onClick: function() {
        ChatChannelActionCreators.clickChannel(this.props.channel.jid);
    }

});

module.exports = ThreadListItem;

