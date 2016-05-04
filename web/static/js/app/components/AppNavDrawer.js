import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';

import {  push } from 'react-router-redux'

const SelectableList = MakeSelectable(List);

import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import TaskIcon from 'material-ui/svg-icons/action/assignment-turned-in';


import ProjectIcon from 'material-ui/svg-icons/action/view-quilt';
import IconButton from 'material-ui/IconButton';


import ListsIcon from 'material-ui/svg-icons/action/view-list';

import AccountIcon from 'material-ui/svg-icons/action/account-box';
import PrefsIcon from 'material-ui/svg-icons/action/build';

import SearchIcon from 'material-ui/svg-icons/action/search';
import HomeIcon from 'material-ui/svg-icons/action/home';

import callIcon from 'material-ui/svg-icons/communication/phone';




const AppNavDrawer = React.createClass({

  propTypes: {
    docked: React.PropTypes.bool.isRequired,
    location: React.PropTypes.object.isRequired,
    onRequestChangeList: React.PropTypes.func.isRequired,
    onRequestChangeNavDrawer: React.PropTypes.func.isRequired,
    open: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  },

  getInitialState: () => {
    return ({
      muiVersions: [],
    });
  },

  componentDidMount: function() {
    const self = this;

  },







  handleTouchTapHeader() {
    this.context.router.push('/');
    this.props.onRequestChangeNavDrawer(false);
  },

  styles: {
    logo: {
      cursor: 'pointer',
      fontSize: 24,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: cyan500,
      paddingLeft: spacing.desktopGutter,
      marginBottom: 8,
    },
    version: {
      paddingLeft: spacing.desktopGutterLess,
      fontSize: 16,
    },
  },

  render() {
    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      onRequestChangeList,
      open,
      style,
    } = this.props;

    return (
      <Drawer
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeNavDrawer}
        containerStyle={{zIndex: zIndex.navDrawer - 100}}
      >
        <div style={this.styles.logo} onTouchTap={this.handleTouchTapHeader}>
         Plug Apps
        </div>



        <SelectableList
          valueLink={{value: location.pathname, requestChange: onRequestChangeList}}
        >


<ListItem  leftIcon={<HomeIcon />} primaryText="Dashboard" value="boards" />
<ListItem leftIcon={<ProjectIcon />} primaryText="Boards" value="boards" />
               <ListItem primaryText="All" value="/" />

              <ListItem leftIcon={<CommunicationChatBubble />} primaryText="Chat" value="/chat" />
              <ListItem leftIcon={<TaskIcon />} primaryText="Tasks" value="/tasks" />
    <ListItem leftIcon={<ListsIcon />} primaryText="Lists" value="/tasks" />
    <ListItem leftIcon={<PrefsIcon />} primaryText="Prefferences" value="/tasks" />



        </SelectableList>

      </Drawer>
    );
  },
});

export default AppNavDrawer;
