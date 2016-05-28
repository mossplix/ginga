import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List';
import ReactDOM from 'react-dom';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

var React = require('react');

var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');
import twemoji from 'twemoji';
import {intlShape, injectIntl, defineMessages, FormattedMessage} from 'react-intl';
import * as TextFormatting from '../../utils/text_formatting';
import ChatConstants from '../../constants/chat_constants'
var MessageListItem = React.createClass({

  propTypes: {
    //message: ReactPropTypes.object
  },

    parseEmojis:function() {
        twemoji.parse(ReactDOM.findDOMNode(this), {
            className: 'emoticon',
            base: '',
            folder: ChatConstants.EMOJI_PATH
        });
    },
  componentDidMount: function(){
        this.parseEmojis();
    },

  render: function() {
    var message = this.props.message;

      var p_message = (
                <span
                    dangerouslySetInnerHTML={{__html: TextFormatting.formatText(this.props.message.text)}}
                />
            );
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
    return (

      <div className={cx({
        'message': true,
        'left': message.isMine(),
        'right':!message.isMine()
      })}

          key={"msg_"+this.props.message.id}



    >

               <ListItem
                      key={"messages2_"+this.props.ident}
                      ref={"messages2_"+this.props.ident}


                      leftAvatar={<Avatar src={message.getSenderAvatar()} />}
                      rightIconButton={rightIconMenu}
                      primaryText={<p>{message.nickname()} <span style={{color: lightBlack}}>{message.formattedTime()}</span></p>}
                      secondaryText={
                        <p>
                          {p_message}
                        </p>
                      }
                      secondaryTextLines={2}
             />
                           <Divider inset={true} />

            </div>

    );
  }

});

export default MessageListItem;
