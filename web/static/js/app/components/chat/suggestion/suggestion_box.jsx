// Copyright (c) 2016 Sparkplug, Inc. All Rights Reserved.

import $ from 'jquery';
import ReactDOM from 'react-dom';

import ActionTypes from '../../../constants';
import ChatConstants from '../../../constants'

import * as Utils from '../../../utils/general';

import TextareaAutosize from 'react-textarea-autosize';
import * as ChatActions from '../../../actions/chatActions';

const KeyCodes = ChatConstants.KeyCodes;

import React from 'react';

export default class SuggestionBox extends React.Component {
    constructor(props) {
        super(props);

        this.handleDocumentClick = this.handleDocumentClick.bind(this);

        this.handleChange = this.handleChange.bind(this);
        //this.handleCompleteWord = this.handleCompleteWord.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
       // this.handlePretextChanged = this.handlePretextChanged.bind(this);

        this.suggestionId = Utils.generateId();
        this.state={term:'',pretext:''};
    }

    componentDidMount() {

        const {actions,dispatch} = this.props;

        dispatch(actions.registerSuggestions(this.suggestionId));


        $(document).on('click', this.handleDocumentClick);


       // this.handleCompleteWord(this.props);



       // SuggestionStore.addCompleteWordListener(this.suggestionId, this.handleCompleteWord);
        //SuggestionStore.addPretextChangedListener(this.suggestionId, this.handlePretextChanged);
    }

    componentWillUnmount() {
        //SuggestionStore.removeCompleteWordListener(this.suggestionId, this.handleCompleteWord);
        //SuggestionStore.removePretextChangedListener(this.suggestionId, this.handlePretextChanged);

         const {actions,dispatch} = this.props;

        dispatch(actions.unregisterSuggestions(this.suggestionId));


        $(document).off('click', this.handleDocumentClick);
    }

    getTextbox() {
        // this is to support old code that looks at the input/textarea DOM nodes
        let textbox = this.refs.textbox;

        if (!(textbox instanceof HTMLElement)) {
            textbox = ReactDOM.findDOMNode(textbox);
        }

        return textbox;
    }

    handleDocumentClick(e) {
        const container = $(ReactDOM.findDOMNode(this));
        if (!(container.is(e.target) || container.has(e.target).length > 0)) {
            // we can't just use blur for this because it fires and hides the children before
            // their click handlers can be called


            const {actions,dispatch} = this.props;

        dispatch(actions.clearSuggestions(this.suggestionId));
        }
    }

    handleChange(e) {
        const textbox = ReactDOM.findDOMNode(this.refs.textbox);
        const caret = Utils.getCaretPosition(textbox);
        const pretext = textbox.value.substring(0, caret);


         const {actions,dispatch} = this.props;

        dispatch(actions.suggestionPretextChanged(this.suggestionId,pretext));



        if (this.props.onUserInput) {
            this.props.onUserInput(textbox.value);
        }

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    componentWillReceiveProps(nextProps) {

        if (this.state.term !==  nextProps.selectedSuggestion.matched_term){
             this.handleCompleteWord(nextProps);
            this.setState({
                term:nextProps.selectedSuggestion.matched_term
            });

        }

         if (this.state.pretext !==  nextProps.selectedSuggestion.pretext){
             this.handlePretextChanged(nextProps.selectedSuggestion.pretext);
            this.setState({
                pretext:nextProps.selectedSuggestion.pretext
            });

        }





 }

    handleCompleteWord(props) {

        const term = props.selectedSuggestion.matched_term||"";
        const textbox = ReactDOM.findDOMNode(this.refs.textbox);
        const caret = Utils.getCaretPosition(textbox);
        const pretext = props.selectedSuggestion.matchedPretext||[];

        const text = this.props.value;
        const prefix = text.substring(0, caret - pretext.length);
        const suffix = text.substring(caret);

        if (this.props.onUserInput) {
            this.props.onUserInput(prefix + term + ' ' + suffix);
        }

        // set the caret position after the next rendering
        window.requestAnimationFrame(() => {
            Utils.setCaretPosition(textbox, prefix.length + term.length + 1);
        });

     store.dispatch(ChatActions.clearSelection(this.suggestionId));
       store.dispatch(ChatActions.clearSuggestions(this.suggestionId));
    }

    handleKeyDown(e) {
         const {actions,dispatch} = this.props;
        if (this.props.selectedSuggestion.hasSuggestions) {
            if (e.which === KeyCodes.UP) {

                dispatch(actions.selectPreviousSuggestion(this.suggestionId));
                e.preventDefault();
            } else if (e.which === KeyCodes.DOWN) {
                dispatch(actions.selectNextSuggestion(this.suggestionId));
                e.preventDefault();
            } else if (e.which === KeyCodes.ENTER || e.which === KeyCodes.TAB) {


                dispatch(actions.completeWordSuggestion(this.suggestionId));

                e.preventDefault();
            } else if (this.props.onKeyDown) {
                this.props.onKeyDown(e);
            }
        } else if (this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }
    }

    handlePretextChanged(pretext) {
        for (const provider of this.props.providers) {
            provider.handlePretextChanged(this.suggestionId, pretext);
        }
    }



    render() {
        const newProps = Object.assign({}, this.props, {
            onChange: this.handleChange,
            onKeyDown: this.handleKeyDown
        });

        let textbox = null;
        if (this.props.type === 'input') {
            textbox = (
                <input
                    ref='textbox'
                    type='text'
                    {...newProps}
                />
            );
        } else if (this.props.type === 'search') {
            textbox = (
                <input
                    ref='textbox'
                    type='search'
                    {...newProps}
                />
            );
        } else if (this.props.type === 'textarea') {
            textbox = (
                <TextareaAutosize
                    id={this.suggestionId}
                    ref='textbox'
                    {...newProps}
                />
            );
        }

        const SuggestionListComponent = this.props.listComponent;

        return (
            <div>
                {textbox}
                <SuggestionListComponent suggestionId={this.suggestionId} actions={this.props.actions} selectedSuggestion={this.props.selectedSuggestion} dispatch={this.props.dispatch} currentSuggestion={this.props.currentSuggestion}/>
            </div>
        );
    }
}

SuggestionBox.defaultProps = {
    type: 'input'
};

SuggestionBox.propTypes = {
    listComponent: React.PropTypes.func.isRequired,
    type: React.PropTypes.oneOf(['input', 'textarea', 'search']).isRequired,
    value: React.PropTypes.string.isRequired,
    onUserInput: React.PropTypes.func,
    providers: React.PropTypes.arrayOf(React.PropTypes.object),

    // explicitly name any input event handlers we override and need to manually call
    onChange: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onHeightChange: React.PropTypes.func
};
