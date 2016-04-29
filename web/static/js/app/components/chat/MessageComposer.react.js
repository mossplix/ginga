
import { connect } from 'react-redux'
var React = require('react');
var ENTER_KEY_CODE = 13;

import $ from 'jquery';
import AtMentionProvider from './suggestion/at_mention_provider';
import CommandProvider from './suggestion/command_provider';
import EmoticonProvider from './suggestion/emoticon_provider';
import SuggestionList from './suggestion/suggestion_list';
import SuggestionBox from './suggestion/suggestion_box';

import * as TextFormatting from '../../utils/text_formatting';

const PreReleaseFeatures = Constants.PRE_RELEASE_FEATURES;

import {intlShape, injectIntl, defineMessages, FormattedHTMLMessage,FormattedMessage} from 'react-intl';


const Preferences = Constants.Preferences;
const TutorialSteps = Constants.TutorialSteps;
const ActionTypes = Constants.ActionTypes;


import MsgTyping from './msg_typing.jsx';

import FileUpload from './files/file_upload.jsx';
import FilePreview from './files/file_preview.jsx';

import TutorialTip from '../tutorial/tutorial_tip';
import * as ChatActions from '../../actions/chatActions';
import * as Utils from '../../utils/general';
import Constants from '../../constants/chat_constants';


var  KeyCodes = require("../../utils/keyCode");

const holders = defineMessages({
    comment: {
        id: 'create_post.comment',
        defaultMessage: 'Comment',
        description: "comment"
    },
    post: {
        id: 'create_post.post',
        defaultMessage: 'Post',
         description: "post"
    },
    write: {
        id: 'create_post.write',
        defaultMessage: 'Write a message...',
         description: "message"
    }
});




var MessageComposer = React.createClass({


  getInitialState: function() {
      const draft = this.getCurrentDraft();
    return {messageText: '',
            //channelId: ChannelStore.getCurrentId(),
            messageText: draft.messageText,
            uploadsInProgress: draft.uploadsInProgress,
            previews: draft.previews,
            submitting: false,
            initialText: draft.messageText,
            ctrlSend: false,
            showTutorialTip: false,
            //showPostDeletedModal: false


    };
  },

     handleKeyDown(e) {


     },

   getFileCount(channelId) {

   },
removePreview(id) {
        const previews = Object.assign([], this.state.previews);
        const uploadsInProgress = this.state.uploadsInProgress;

        // id can either be the path of an uploaded file or the client id of an in progress upload
        let index = previews.indexOf(id);
        if (index === -1) {
            index = uploadsInProgress.indexOf(id);

            if (index !== -1) {
                uploadsInProgress.splice(index, 1);
                this.refs.fileUpload.getWrappedInstance().cancelUpload(id);
            }
        } else {
            previews.splice(index, 1);
        }

        const draft = {};//PostStore.getCurrentDraft();
        draft.previews = previews;
        draft.uploadsInProgress = uploadsInProgress;
        //PostStore.storeCurrentDraft(draft);

        this.setState({previews, uploadsInProgress});
    },


        getCurrentDraft() {
        const draft = null;
        const safeDraft = {previews: [], messageText: '', uploadsInProgress: []};

        if (draft) {
            if (draft.message) {
                safeDraft.messageText = draft.message;
            }
            if (draft.previews) {
                safeDraft.previews = draft.previews;
            }
            if (draft.uploadsInProgress) {
                safeDraft.uploadsInProgress = draft.uploadsInProgress;
            }
        }

        return safeDraft;
    },

 createTutorialTip() {
        const screens = [];

        screens.push(
            <div>
                <FormattedHTMLMessage
                    id='create_post.tutorialTip'
                    defaultMessage='<h4>Sending Messages</h4><p>Type here to write a message and press <strong>Enter</strong> to post it.</p><p>Click the <strong>Attachment</strong> button to upload an image or a file.</p>'
                />
            </div>
        );

        return (
            <TutorialTip
                placement='top'
                screens={screens}
                overlayClass='tip-overlay--chat'
            />
        );
    },

  render: function() {
        let serverError = null;
        if (this.state.serverError) {
            serverError = (
                <div className='has-error'>
                    <label className='control-label'>{this.state.serverError}</label>
                </div>
            );
        }

         let postError = null;
        if (this.state.postError) {
            postError = <label className='control-label'>{this.state.postError}</label>;
        }

        let preview = null;
        if (this.state.previews.length > 0 || this.state.uploadsInProgress.length > 0) {
            preview = (
                <FilePreview
                    files={this.state.previews}
                    onRemove={this.removePreview}
                    uploadsInProgress={this.state.uploadsInProgress}
                />
            );
        }
        let postFooterClassName = 'post-create-footer';
        if (postError) {
            postFooterClassName += ' has-error';
        }

       const hasText = this.state.messageText.length > 0;

        let previewLink = null;
        if (Utils.isFeatureEnabled(PreReleaseFeatures.MARKDOWN_PREVIEW)) {
            previewLink = (
                <a
                    onClick={this.showPreview}
                    className='textbox-preview-link'
                >
                    {this.state.preview ? (
                        <FormattedMessage
                            id='textbox.edit'
                            defaultMessage='Edit message'
                        />
                    ) : (
                        <FormattedMessage
                            id='textbox.preview'
                            defaultMessage='Preview'
                        />
                    )}
                </a>
            );
        };
        const helpText = (
            <div
                style={{visibility: hasText ? 'visible' : 'hidden', opacity: hasText ? '0.3' : '0'}}
                className='help__format-text'
            >
                <b>
                    <FormattedMessage
                        id='textbox.bold'
                        defaultMessage='**bold**'
                    />
                </b>
                <i>
                    <FormattedMessage
                        id='textbox.italic'
                        defaultMessage='_italic_'
                    />
                </i>
                <span>
                    {'~~'}
                    <strike>
                        <FormattedMessage
                            id='textbox.strike'
                            defaultMessage='strike'
                        />
                    </strike>
                    {'~~ '}
                </span>
                <code>
                    <FormattedMessage
                        id='textbox.inlinecode'
                        defaultMessage='`inline code`'
                    />
                </code>
                <code>
                    <FormattedMessage
                        id='textbox.preformatted'
                        defaultMessage='```preformatted```'
                    />
                </code>
                <span>
                    <FormattedMessage
                        id='textbox.quote'
                        defaultMessage='>quote'
                    />
                </span>
            </div>
        );
       let tutorialTip = null;
        if (this.state.showTutorialTip) {
            tutorialTip = this.createTutorialTip();
        };

    return (


            <div  ref='wrapper'  className='textarea-wrapper' >
                <SuggestionBox
                    ref='message'
                    className={`form-control custom-textarea ${this.state.connection}`}
                    type='textarea'
                    spellCheck='true'
                    autoComplete='off'
                    autoCorrect='off'
                    maxLength={Constants.MAX_POST_LEN}
                    placeholder={"compose"}
                    value={this.state.messageText}
                    onUserInput={this.props.onUserInput}
                    onKeyPress={this.handleKeyPress}
                    onKeyDown={this.handleKeyDown}
                    onHeightChange={this.handleHeightChange}
                    style={{visibility: this.state.preview ? 'hidden' : 'visible'}}
                    listComponent={SuggestionList}
                    providers={this.suggestionProviders}
                    channelId={this.props.channelId}
                    onUserInput={this.handleUserInput}
                    onKeyPress={this.postMsgKeyPress}
                    onKeyDown={this.handleKeyDown}
                                id='message_textbox'
                                ref='textbox'
                />

                <div
                    ref='preview'
                    className='form-control custom-textarea textbox-preview-area'
                    style={{display: this.state.preview ? 'block' : 'none'}}
                    dangerouslySetInnerHTML={{__html: this.state.preview ? TextFormatting.formatText(this.props.messageText) : ''}}
                >
                </div>

                <div className='help__text'>
                    {helpText}
                    {previewLink}
                    <a
                        target='_blank'
                        href='http://docs.mattermost.com/help/getting-started/messaging-basics.html'
                        className='textbox-help-link'
                    >
                        <FormattedMessage
                            id='textbox.help'
                            defaultMessage='Help'
                        />
                    </a>
                </div>
                                <FileUpload
                                    ref='fileUpload'
                                    getFileCount={this.getFileCount}
                                    onClick={this.handleUploadClick}
                                    onUploadStart={this.handleUploadStart}
                                    onFileUpload={this.handleFileUploadComplete}
                                    onUploadError={this.handleUploadError}
                                    postType='post'
                                    channelId=''
                            />

                                        <a
                            className='send-button theme'
                            onClick={this.handleSubmit}
                        >
                            <i className='fa fa-paper-plane'/>
                        </a>
                        {tutorialTip}


                    <div className={postFooterClassName}>
                        <MsgTyping
                            channelId={this.state.channelId}
                            parentId={''}
                        />
                        {preview}
                        {postError}
                        {serverError}
                    </div>
            </div>


    );
  },

focus() {
        this.refs.message.getTextbox().focus();
    },

showPreview(e) {
        e.preventDefault();
        e.target.blur();
        this.setState({preview: !this.state.preview});
    },

  _onChange: function(event, value) {
    this.setState({text: event.target.value});
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        //ChatMessageActionCreators.createMessage(text, this.props.chat,chat_type=ChatTypeStore.getCurrent());
         this.props.actions.createMessage(text,this.props.currentChat);

      }
      this.setState({text: ''});
    }
  }

});

export default injectIntl(MessageComposer);
