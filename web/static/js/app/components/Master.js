import React from 'react';
import Title from 'react-title-component';
import ClearFix from 'material-ui/internal/ClearFix';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import spacing from 'material-ui/styles/spacing';
import styleResizable from 'material-ui/utils/styleResizable';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ColorManipulator from 'material-ui/lib/utils/colorManipulator';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';



import {darkWhite,
    lightWhite,
    grey900,
    cyan500,
    cyan700,
    grey300,
    darkBlack,
     grey400,
    pinkA200,
    sparkLight,
    sparkDark,
     grey100,
    white,
    fullBlack,
    grey500} from 'material-ui/styles/colors';
import AppNavDrawer from './AppNavDrawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import BoardsActions    from '../actions/boardActions';
import Header           from '../layouts/header';

import { connect }      from 'react-redux';
import { Link }         from 'react-router';
import ReactGravatar    from 'react-gravatar';
import PageClick        from 'react-page-click';
import { push }         from 'react-router-redux';

import SessionActions   from '../actions/sessionActions';
import HeaderActions    from '../actions/headerActions';
import Spinner   from '../utils/Spinner'


const sparkTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
    palette: {
    primary1Color: sparkLight,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: ColorManipulator.fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: ColorManipulator.fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});


 let logo=(
            <div>
        <IconButton>
        <img  src="/images/logo2.png" />
        </IconButton>

            </div>
    );


const Master = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    styleResizable,
  ],

  getInitialState() {
    return {
      muiTheme: sparkTheme,
      navDrawerOpen: false,

    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    this.setState({
      muiTheme: this.state.muiTheme,
    });
  },
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(BoardsActions.fetchBoards());
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  },

  getStyles() {
    const styles = {
        logo:{
          marginTop:'3px'
        },
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      },
      iconButton: {
        color: darkWhite,
      },
    };

    if (this.isDeviceSize(styleResizable.statics.Sizes.MEDIUM) ||
        this.isDeviceSize(styleResizable.statics.Sizes.LARGE)) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  },

  handleTouchTapLeftIconButton() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  },

  handleChangeRequestNavDrawer(open) {
    this.setState({
      navDrawerOpen: open,
    });
  },

  handleRequestChangeList(event, value) {
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false,
    });
  },

  handleChangeMuiTheme(muiTheme) {
    this.setState({
      muiTheme: muiTheme,
    });
  },
_renderCurrentUser() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return false;
    }

    const fullName = [currentUser.first_name, currentUser.last_name].join(' ');

    return (
      <a className="current-user">
        <ReactGravatar className="react-gravatar" email={currentUser.email} https /> {fullName}
      </a>
    );
  },

  _renderSignOutLink() {
    if (!this.props.currentUser) {
      return false;
    }

    return (
      <a href="#" onClick={::this._handleSignOutClick}><i className="fa fa-sign-out"/> Sign out</a>
    );
  },

  _handleSignOutClick(e) {
    e.preventDefault();

    this.props.dispatch(SessionActions.signOut());
  },

  render() {


    const { location,children,currentUser, dispatch, boards, socket, currentBoard } = this.props;

    if (!currentUser) return false;

    let {
      navDrawerOpen,
    } = this.state;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const router = this.context.router;
    const styles = this.getStyles();
    const title =
      router.isActive('/get-started') ? 'Get Started' :
      router.isActive('/customization') ? 'Customization' :
      router.isActive('/components') ? 'Components' :
      router.isActive('/') ? '' : '';



    let docked = false;
    let showMenuIconButton = true;
    let logo2="mdsmdmdm"

    if (this.isDeviceSize(styleResizable.statics.Sizes.LARGE) && title !== '') {
      docked = true;
      navDrawerOpen = true;
      showMenuIconButton = false;

      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      };
      styles.root.paddingLeft = 256;
      styles.footer.paddingLeft = 256;
    }

       const search_bar=(
               <div>
            <input type="text" className="search"/>

        </div>
       );


        const auth_bar=(
                <div>


                        <IconMenu
                        iconButtonElement={
                          <IconButton><MoreVertIcon /></IconButton>
                        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                      >
                        <MenuItem primaryText="Refresh" />
                        <MenuItem primaryText="Help" />
                        <MenuItem primaryText="Sign out" rightIcon={<i className="fa fa-sign-out"/>}  onClick={::this._handleSignOutClick} />
                      </IconMenu>


    </div>

        );



    return (




      <div>
            {this.props.isLoading ? <Spinner /> : null}
        <Title render="Plug Apps" />
        <AppBar
          onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
          title={logo}
          zDepth={1}
          style={styles.appBar}
          children={auth_bar}
          showMenuIconButton={true}
          iconElementRight={search_bar} />
              <ClearFix>
              <div style={prepareStyles(styles.root)}>
          <div style={prepareStyles(styles.content)}>
          {children}

          </div>
          </div>
             </ClearFix>
        <AppNavDrawer
          style={styles.navDrawer}
          location={location}
          docked={docked}
          onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
          onRequestChangeList={this.handleRequestChangeList}
          open={navDrawerOpen}
        />

      </div>
    );
  },
});


const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  socket: state.session.socket,
  channel: state.session.channel,
  boards: state.boards,
  currentBoard: state.currentBoard,
});


export default connect(mapStateToProps)(Master);
