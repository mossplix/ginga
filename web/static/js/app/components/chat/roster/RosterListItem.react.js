
var React = require('react');
var cx = require('react/lib/cx');
import { connect } from 'react-redux'

var ReactPropTypes = React.PropTypes;

var ChannelListItem = React.createClass({



    render: function() {
        const {channel,actions} = this.props;
        return (



            <li className={cx({
            'thread-list-item': true,
            'active': thread.id === this.props.currentThreadID
    })}
onClick={() => actions.clickChannel(channel.id)}>
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
        //ChatChannelActionCreators.clickChannel(this.props.channel.jid);
    }

});

export default ThreadListItem;

