import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';

const SelectableList = MakeSelectable(List);

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
    const url = '/versions.json';
    const request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        self.setState({
          muiVersions: JSON.parse(request.responseText),
          version: JSON.parse(request.responseText)[0],
        });
      }
    };

    request.open('GET', url, true);
    request.send();
  },

  firstNonPreReleaseVersion: function() {
    let version;
    for (let i = 0; i < this.state.muiVersions.length; i++) {
      version = this.state.muiVersions[i];
      // If the version doesn't contain '-' and isn't 'HEAD'
      if (!/-/.test(version) && version !== 'HEAD') {
        break;
      }
    }
    return version;
  },

  handleVersionChange: function(event, index, value) {
    if (value === this.firstNonPreReleaseVersion()) {
      window.location = 'http://www.material-ui.com/';
    } else {
      window.location = `http://www.material-ui.com/${value}`;
    }
  },

  currentVersion: function() {
    if (window.location.hostname === 'localhost') return this.state.muiVersions[0];
    if (window.location.pathname === '/') {
      return this.firstNonPreReleaseVersion();
    } else {
      return window.location.pathname.replace(/\//g, '');
    }
  },

  handleRequestChangeLink(event, value) {
    window.location = value;
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




          <ListItem
            primaryText="Chat"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Prerequisites" value="/get-started/prerequisites" />,
              <ListItem primaryText="Installation" value="/get-started/installation" />,
              <ListItem primaryText="Usage" value="/get-started/usage" />,
              <ListItem primaryText="Server Rendering" value="/get-started/server-rendering" />,
              <ListItem primaryText="Examples" value="/get-started/examples" />,
            ]}
          />
          <ListItem
            primaryText="Tasks"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Themes" value="/customization/themes" />,
              <ListItem primaryText="Inline Styles" value="/customization/inline-styles" />,
              <ListItem primaryText="Colors" value="/customization/colors" />,
            ]}
          />
          <ListItem
            primaryText="Projects"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="App Bar" value="/components/app-bar" />,
              <ListItem primaryText="Auto Complete" value="/components/auto-complete" />,
              <ListItem primaryText="Avatar" value="/components/avatar" />,
              <ListItem primaryText="Badge" value="/components/badge" />,
              <ListItem
                primaryText="Buttons"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem primaryText="Flat Button" value="/components/flat-button" />,
                  <ListItem primaryText="Raised Button" value="/components/raised-button" />,
                  <ListItem primaryText="Floating Action Button" value="/components/floating-action-button" />,
                  <ListItem primaryText="Icon Button" value="/components/icon-button" />,
                ]}
              />,
              <ListItem primaryText="Card" value="/components/card" />,
              <ListItem primaryText="Date Picker" value="/components/date-picker" />,
              <ListItem
                primaryText="Icons"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem primaryText="Font Icon" value="/components/font-icon" />,
                  <ListItem primaryText="SVG Icon" value="/components/svg-icon" />,
                ]}
              />,
              <ListItem primaryText="List" value="/components/list" />,
              <ListItem
                primaryText="Menus"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem primaryText="Menu" value="/components/menu" />,
                  <ListItem primaryText="Icon Menu" value="/components/icon-menu" />,
                  <ListItem primaryText="Drop Down Menu" value="/components/dropdown-menu" />,
                ]}
              />,
              <ListItem primaryText="Paper" value="/components/paper" />,
              <ListItem primaryText="Popover" value="/components/popover" />,
              <ListItem
                primaryText="Progress"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem primaryText="Circular Progress" value="/components/circular-progress" />,
                  <ListItem primaryText="Linear Progress" value="/components/linear-progress" />,
                  <ListItem primaryText="Refresh Indicator" value="/components/refresh-indicator" />,
                ]}
              />,
              <ListItem primaryText="Select Field" value="/components/select-field" />,
              <ListItem primaryText="Slider" value="/components/slider" />,
              <ListItem
                primaryText="Switches"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem primaryText="Checkbox" value="/components/checkbox" />,
                  <ListItem primaryText="Radio Button" value="/components/radio-button" />,
                  <ListItem primaryText="Toggle" value="/components/toggle" />,
                ]}
              />,
              <ListItem primaryText="Snackbar" value="/components/snackbar" />,
              <ListItem primaryText="Stepper" value="/components/stepper" />,

            ]}
          />
          <ListItem
            primaryText="Discover More"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Community" value="/discover-more/community" />,
              <ListItem primaryText="Contributing" value="/discover-more/contributing" />,
              <ListItem primaryText="Showcase" value="/discover-more/showcase" />,
              <ListItem primaryText="Related projects" value="/discover-more/related-projects" />,
            ]}
          />
        </SelectableList>

      </Drawer>
    );
  },
});

export default AppNavDrawer;
