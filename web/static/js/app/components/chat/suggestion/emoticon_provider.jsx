// Copyright (c) 2016 Sparkplug, Inc. All Rights Reserved.



import * as Emoticons from '../../../utils/emoticons';
import ActionTypes from '../../../constants';
import * as ChatActions from '../../../actions/chatActions';

const MAX_EMOTICON_SUGGESTIONS = 40;

import React from 'react';

class EmoticonSuggestion extends React.Component {
    render() {
        const text = this.props.term;
        const emoticon = this.props.item;

        let className = 'emoticon-suggestion';
        if (this.props.isSelection) {
            className += ' suggestion--selected';
        }

        return (
            <div
                className={className}
                onClick={this.props.onClick}
            >
                <div className='pull-left'>
                    <img
                        alt={text}
                        className='emoticon-suggestion__image'
                        src={emoticon.path}
                        title={text}
                    />
                </div>
                <div className='pull-left'>
                    {text}
                </div>
            </div>
        );
    }
}

EmoticonSuggestion.propTypes = {
    item: React.PropTypes.object.isRequired,
    term: React.PropTypes.string.isRequired,
    isSelection: React.PropTypes.bool,
    onClick: React.PropTypes.func
};

export default class EmoticonProvider {
    handlePretextChanged(suggestionId, pretext) {
        const captured = (/(?:^|\s)(:([a-zA-Z0-9_+\-]*))$/g).exec(pretext);
        if (captured) {
            const text = captured[1];
            const partialName = captured[2];

            const matched = [];

            for (const [name, emoticon] of Emoticons.emoticons) {
                if (name.indexOf(partialName) !== -1) {
                    matched.push(emoticon);

                    if (matched.length >= MAX_EMOTICON_SUGGESTIONS) {
                        break;
                    }
                }
            }

            // sort the emoticons so that emoticons starting with the entered text come first
            matched.sort((a, b) => {
                const aPrefix = a.alias.startsWith(partialName);
                const bPrefix = b.alias.startsWith(partialName);

                if (aPrefix === bPrefix) {
                    return a.alias.localeCompare(b.alias);
                } else if (aPrefix) {
                    return -1;
                }

                return 1;
            });

            const terms = matched.map((emoticon) => ':' + emoticon.alias + ':');

            if (terms.length > 0) {
                //SuggestionStore.setMatchedPretext(suggestionId, text);
                store.dispatch(ChatActions.setMatchedPretext(suggestionId, text));
                store.dispatch(ChatActions.addSuggestions(suggestionId, terms, matched, EmoticonSuggestion));
               ;

                 store.dispatch(ChatActions.clearSelection(suggestionId));

               // SuggestionStore.clearSelection(suggestionId);


            }
        }
    }
}
