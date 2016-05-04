


var React = require('react');
var cx = require('react/lib/cx');

var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { connect } from 'react-redux'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

var ThreadListItem = React.createClass({

  propTypes: {
    thread: ReactPropTypes.object,
    currentChat: ReactPropTypes.object,
    params: ReactPropTypes.object

  },


 _handleClick() {

    this.props.actions.clickThread(this.props.thread.id);

  },


  render: function() {
      const {thread,actions} = this.props;
    var lastMessage = thread.lastMessage;

      if (lastMessage != null)
      {

    return (
      <div>



            <ListItem
              key={thread.id}
          leftAvatar={<Avatar src={lastMessage.getSenderAvatar()} />}
          primaryText={
            <p>{thread.name} <span style={{color: lightBlack}}>{lastMessage.formattedTime()}</span></p>
          }
          secondaryText={
            <p>
             {lastMessage.text}
            </p>
          }
          secondaryTextLines={2}
               onClick={this._handleClick}
           value={`/chat/threads/${thread.id}`}
        />
        <Divider inset={true} />

    </div>




    );}

      else
      {
          return (

    <ListItem
        primaryText={thread.name}
        onClick={this._handleClick}
        insetChildren={true}
      />


          );
      }
  }



});



export default ThreadListItem;
