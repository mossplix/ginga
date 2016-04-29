


var React = require('react');
var cx = require('react/lib/cx');
import { connect } from 'react-redux'

var Router = require('react-router');

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;

var ReactPropTypes = React.PropTypes;


var ChannelListItem = React.createClass({



    render: function() {
        var channel = this.props.channel;
        var chat = this.props.currentChat;
        return (
          <div>



            <Link to={`/chat/channels/${channel.jid}`}   onClick={() => this.props.actions.clickChannel(channel.jid)}  key={"link_"+channel.jid} params={{id: channel.jid}}>



            <li className={cx({
            'channels has-action-left has-action-right': true,
            'active': channel.jid === this.props.currentChat.id

    })}


>

                        <div className="list-content">
                            <span className="title">{channel.name}</span>
                            <span className="caption">{channel.unread}</span>
                        </div>




</li>
</Link>

</div>


        );
    }



});



export default ChannelListItem;
