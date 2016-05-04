

var React = require('react');
import ChannelListItem from './ChannelListItem.react';
var Router = require('react-router');

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';

var ChannelSection = React.createClass({

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
      <div >



           <List>

<Subheader>

<h4>Channels  <IconButton style={{ marginLeft: '60%'}} tooltip="Add Channel" touch={true} tooltipPosition="bottom-center"><ContentAdd/> </IconButton></h4>
    </Subheader>

                      <Divider />

          {channelListItems}
          </List>

      </div>


        );
    }



});



export default ChannelSection;
