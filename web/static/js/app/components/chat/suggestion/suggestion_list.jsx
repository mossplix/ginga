// Copyright (c) 2016 Sparkplug, Inc. All Rights Reserved.


import $ from 'jquery';
import ReactDOM from 'react-dom';
import * as ChatActions from '../../../actions/chatActions';
import { connect } from 'react-redux'
import {selectedSuggestionSelector} from '../../../selectors';

import React from 'react';

class SuggestionList extends React.Component {
    constructor(props) {
        super(props);

        this.getContent = this.getContent.bind(this);

        this.handleItemClick = this.handleItemClick.bind(this);

        this.scrollToItem = this.scrollToItem.bind(this);

        this.state = {
            items: [],
            terms: [],
            components: [],
            selection: ''
        };
    }
      


    getContent() {
        return $(ReactDOM.findDOMNode(this.refs.content));
    }

    handleItemClick(term, e) {
        this.props.dispatch(ChatActions.completeWordSuggestion(this.props.suggestionId, term));

         if (this.props.selectedSuggestion.selection) {
            window.requestAnimationFrame(() => this.scrollToItem(this.props.selectedSuggestion.selection));
        }

        e.preventDefault();
    }

    handleSuggestionsChanged(props) {
        const selection =props.selectedSuggestion.selection||"";// SuggestionStore.getSelection(this.props.suggestionId);
        const items = props.items||[];
        const terms = props.terms||[];
        const components = props.components||[];

        this.setState({
            items: items,//SuggestionStore.getItems(this.props.suggestionId),
            terms: terms,//SuggestionStore.getTerms(this.props.suggestionId),
            components: components,// SuggestionStore.getComponents(this.props.suggestionId),
            selection
        });

        if (selection) {
            window.requestAnimationFrame(() => this.scrollToItem(this.props.selectedSuggestion.selection));
        }
    }

    scrollToItem(term) {
        const content = this.getContent();
        const visibleContentHeight = content[0].clientHeight;
        const actualContentHeight = content[0].scrollHeight;

        if (visibleContentHeight < actualContentHeight) {
            const contentTop = content.scrollTop();
            const contentTopPadding = parseInt(content.css('padding-top'), 10);
            const contentBottomPadding = parseInt(content.css('padding-top'), 10);

            const item = $(ReactDOM.findDOMNode(this.refs[term]));
            const itemTop = item[0].offsetTop - parseInt(item.css('margin-top'), 10);
            const itemBottomMargin = parseInt(item.css('margin-bottom'), 10) + parseInt(item.css('padding-bottom'), 10);
            const itemBottom = item[0].offsetTop + item.height() + itemBottomMargin;

            if (itemTop - contentTopPadding < contentTop) {
                // the item is off the top of the visible space
                content.scrollTop(itemTop - contentTopPadding);
            } else if (itemBottom + contentTopPadding + contentBottomPadding > contentTop + visibleContentHeight) {
                // the item has gone off the bottom of the visible space
                content.scrollTop(itemBottom - visibleContentHeight + contentTopPadding + contentBottomPadding);
            }
        }
    }

    render() {
        if (this.props.selectedSuggestion.items.length === 0) {
            return null;
        }

        const items = [];
        for (let i = 0; i < this.props.selectedSuggestion.items.length; i++) {
            const item = this.props.selectedSuggestion.items[i];
            const term = this.props.selectedSuggestion.terms[i];
            const isSelection = term === this.props.selectedSuggestion.selection;

            // ReactComponent names need to be upper case when used in JSX
            const Component = this.props.selectedSuggestion.components[i];

            items.push(
                <Component
                    key={term}
                    ref={term}
                    item={item}
                    term={term}
                    isSelection={isSelection}
                    onClick={this.handleItemClick.bind(this, term)}
                />
            );
        }

        return (
            <div className='suggestion-list suggestion-list--top'>
                <div
                    ref='content'
                    className='suggestion-list__content suggestion-content suggestion-list__content--top'
                >
                    {items}
                </div>
            </div>
        );
    }
}

SuggestionList.propTypes = {
    suggestionId: React.PropTypes.string.isRequired
};



export default SuggestionList;
