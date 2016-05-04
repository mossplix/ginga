

var React = require('react');
import ThreadListItem from './ThreadListItem.react';
var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;
import { connect } from 'react-redux'

import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';

const SelectableList = MakeSelectable(List);


function wrapState(ComposedComponent) {
  const StateWrapper = React.createClass({
    getInitialState() {
      return {selectedIndex: 1};
    },
    handleUpdateSelectedIndex(event, index) {
      this.setState({
        selectedIndex: index,
      });
    },
    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          valueLink={{value: this.state.selectedIndex, requestChange: this.handleUpdateSelectedIndex}}
        />
      );
    },
  });
  return StateWrapper;
}

var SelectableList2 = wrapState(SelectableList);

var ThreadSection = React.createClass({


  render: function() {
      const {actions,threads,currentChat,dispatch} = this.props;
    var threadListItems = _.toArray(this.props.threads).map(function(thread) {
      return (


        <ThreadListItem
          id={thread.id}
          thread={thread}
            currentChat={currentChat}
            params={thread}
                actions={actions}
                    dispatch={dispatch}
                        key={thread.id}

        />



      );
    }, this);
    return (

<div>


      <SelectableList2
        key="thread_list"

        >

<Subheader>

<h4>Recent Chats  <IconButton key="thread" style={{ marginLeft: '50%'}} tooltip="Start New Chat" touch={true} tooltipPosition="bottom-center"><ContentAdd/> </IconButton></h4>
    </Subheader>
    <Divider />





          {threadListItems}
          </SelectableList2>


      </div>

    );
  }



});






export default ThreadSection;

