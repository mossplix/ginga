

var React = require('react');
import ChannelListItem from './ChannelListItem.react';
var Router = require('react-router');

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;
import { connect } from 'react-redux'



var ChannelSection = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },


    render: function() {
        var channelListItems = _.toArray(this.props.channels).map(function(channel) {
            return (
                <ChannelListItem
                    key={channel.jid}
                    channel={channel}
                    currentChat={this.props.currentChat}
                    actions = {this.props.actions}
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
    }



});



export default ChannelSection;
