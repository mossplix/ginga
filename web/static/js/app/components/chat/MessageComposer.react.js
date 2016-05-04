
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
            channelId: this.props.currentChat.id,
            messageText: draft.messageText,
            uploadsInProgress: draft.uploadsInProgress,
            previews: draft.previews,
            submitting: false,
            initialText: draft.messageText,
            ctrlSend: false,
            showTutorialTip: false,
            showPostDeletedModal: false


    };
  },



   getFileCount(channelId) {

   },
    handleSubmit(e) {
        e.preventDefault();

        if (this.state.uploadsInProgress.length > 0 || this.state.submitting) {
            return;
        }

        const post = {};
        post.filenames = [];
        post.message = this.state.messageText;

        if (post.message.trim().length === 0 && this.state.previews.length === 0) {
            return;
        }


        this.setState({submitting: true, serverError: null});

        if (post.message.indexOf('/') === 0) {
            /*Client.executeCommand(
                this.state.channelId,
                post.message,
                false,
                (data) => {
                    PostStore.storeDraft(this.state.channelId, null);
                    this.setState({messageText: '', submitting: false, postError: null, previews: [], serverError: null});

                    if (data.goto_location && data.goto_location.length > 0) {
                        browserHistory.push(data.goto_location);
                    }
                },
                (err) => {
                    if (err.sendMessage) {
                        this.sendMessage(post);
                    } else {
                        const state = {};
                        state.serverError = err.message;
                        state.submitting = false;
                        this.setState(state);
                    }
                }
            );*/
        } else {
            this.sendMessage(post);
        }
    },
    sendMessage(post) {
            post.channel_id = this.state.channelId;
            post.filenames = this.state.previews;

            const time = Utils.getTimestamp();
            const userId = store.getState.session.currentUser.id;
            post.pending_post_id = `${userId}:${time}`;
            post.user_id = userId;
            post.create_at = time;
            post.parent_id = this.state.parentId;

            const channel = this.props.currentChat.channel;

            GlobalActions.emitUserPostedEvent(post);

            this.setState({messageText: '', submitting: false, postError: null, previews: [], serverError: null});


        },
    postMsgKeyPress(e) {
            if (this.state.ctrlSend && e.ctrlKey || !this.state.ctrlSend) {
                if (e.which === KeyCodes.ENTER && !e.shiftKey && !e.altKey) {
                    e.preventDefault();
                    ReactDOM.findDOMNode(this.refs.textbox).blur();
                    this.handleSubmit(e);
                }
            }

            GlobalActions.emitLocalUserTypingEvent(this.state.channelId, '');
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
       handleUserInput(messageText) {
        this.setState({messageText});

    },
   handleUploadClick() {
        this.focusTextbox();
    },
    handleUploadStart(clientIds, channelId) {
        const draft = PostStore.getDraft(channelId);

        draft.uploadsInProgress = draft.uploadsInProgress.concat(clientIds);
        PostStore.storeDraft(channelId, draft);

        this.setState({uploadsInProgress: draft.uploadsInProgress});

        // this is a bit redundant with the code that sets focus when the file input is clicked,
        // but this also resets the focus after a drag and drop
        this.focusTextbox();
    },
    handleFileUploadComplete(filenames, clientIds, channelId) {
        const draft = PostStore.getDraft(channelId);

        // remove each finished file from uploads
        for (let i = 0; i < clientIds.length; i++) {
            const index = draft.uploadsInProgress.indexOf(clientIds[i]);

            if (index !== -1) {
                draft.uploadsInProgress.splice(index, 1);
            }
        }

        draft.previews = draft.previews.concat(filenames);
        PostStore.storeDraft(channelId, draft);

        this.setState({uploadsInProgress: draft.uploadsInProgress, previews: draft.previews});
    },
     handleUploadClick() {
        this.focusTextbox();
    },
    handleUploadError(err, clientId) {
        let message = err;
        if (message && typeof message !== 'string') {
            // err is an AppError from the server
            message = err.message;
        }

        if (clientId !== -1) {
            const draft = PostStore.getDraft(this.state.channelId);

            const index = draft.uploadsInProgress.indexOf(clientId);
            if (index !== -1) {
                draft.uploadsInProgress.splice(index, 1);
            }

            PostStore.storeDraft(this.state.channelId, draft);

            this.setState({uploadsInProgress: draft.uploadsInProgress});
        }

        this.setState({serverError: message});
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
    handleKeyDown(e) {
        if (this.state.ctrlSend && e.keyCode === KeyCodes.ENTER && e.ctrlKey === true) {
            this.postMsgKeyPress(e);
            return;
        }

        if (e.keyCode === KeyCodes.UP && this.state.messageText === '') {
            e.preventDefault();

            const channelId = this.props.currentChat.id;
            const lastPost = this.props.message.lastPost;
            if (!lastPost) {
                return;
            }
            const {formatMessage} = this.props.intl;
            var type = (lastPost.root_id && lastPost.root_id.length > 0) ? formatMessage(holders.comment) : formatMessage(holders.post);

            store.dispatch({
                        type: ActionType.MESSAGE_CREATED_EDITED,
                        refocusId: '#post_textbox',
                         title: type,
                         message: lastPost.message,
                         postId: lastPost.id,
                         channelId: lastPost.channel_id,
                        });

        }
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

            <div>


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


            </div>





                <div className='help__text'>
                    {helpText}
                    {previewLink}
                    <a
                        target='_blank'
                        href='/help/getting-started/messaging-basics.html'
                        className='textbox-help-link'
                    >
                        <FormattedMessage
                            id='textbox.help'
                            defaultMessage='Help'
                        />
                    </a>
                </div>



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
focusTextbox() {
        if (!Utils.isMobile()) {
            this.refs.textbox.focus();
        }
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
