


var React = require('react');
var cx = require('react/lib/cx');
import { connect } from 'react-redux'

var Router = require('react-router');
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';


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



        <ListItem
        primaryText={channel.name}

        rightAvatar={<Badge
      badgeContent={channel.unread}
      secondary={true}
          value={`/chat/channels/${channel.jid}`}
    />}
        onClick={() => this.props.actions.clickChannel(channel.jid)}  key={"link_"+channel.jid} params={{id: channel.jid}}
      />
    <Divider  />




</div>


        );
    }



});



export default ChannelListItem;
