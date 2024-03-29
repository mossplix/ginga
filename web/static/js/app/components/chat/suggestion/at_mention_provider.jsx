// Copyright (c) 2016 Sparkplug, Inc. All Rights Reserved.

import * as Utils from '../../../utils/general';

import {FormattedMessage} from 'react-intl';

const MaxUserSuggestions = 40;

import React from 'react';

class AtMentionSuggestion extends React.Component {
    render() {
        const {item, isSelection, onClick} = this.props;

        let username;
        let description;
        let icon;
        if (item.username === 'all') {
            username = 'all';
            description = (
                <FormattedMessage
                    id='suggestion.mention.all'
                    defaultMessage='Notifies everyone in the team'
                />
            );
            icon = <i className='mention__image fa fa-users fa-2x'/>;
        } else if (item.username === 'channel') {
            username = 'channel';
            description = (
                <FormattedMessage
                    id='suggestion.mention.channel'
                    defaultMessage='Notifies everyone in the channel'
                />
            );
            icon = <i className='mention__image fa fa-users fa-2x'/>;
        } else {
            username = item.username;
            description = Utils.getFullName(item);
            icon = (
                <img
                    className='mention__image'
                    src={'/api/v1/users/' + item.id + '/image?time=' + item.update_at}
                />
            );
        }

        let className = 'mentions__name';
        if (isSelection) {
            className += ' suggestion--selected';
        }

        return (
            <div
                className={className}
                onClick={onClick}
            >
                <div className='pull-left'>
                    {icon}
                </div>
                <div className='pull-left mention--align'>
                    <span>
                        {'@' + username}
                    </span>
                    <span className='mention__fullname'>
                        {description}
                    </span>
                </div>
            </div>
        );
    }
}

AtMentionSuggestion.propTypes = {
    item: React.PropTypes.object.isRequired,
    isSelection: React.PropTypes.bool,
    onClick: React.PropTypes.func
};

export default class AtMentionProvider {
    handlePretextChanged(suggestionId, pretext) {
        const captured = (/@([a-z0-9\-\._]*)$/i).exec(pretext);
        if (captured) {
            const usernamePrefix = captured[1];

            const users = []; //UserStore.getActiveOnlyProfiles(true);
            let filtered = [];

            for (const id of Object.keys(users)) {
                const user = users[id];

                if (user.username.startsWith(usernamePrefix) && user.delete_at <= 0) {
                    filtered.push(user);
                }

                if (filtered.length >= MaxUserSuggestions) {
                    break;
                }
            }

            // add dummy users to represent the @all and @channel special mentions
            if ('all'.startsWith(usernamePrefix)) {
                filtered.push({username: 'all'});
            }

            if ('channel'.startsWith(usernamePrefix)) {
                filtered.push({username: 'channel'});
            }

            filtered = filtered.sort((a, b) => a.username.localeCompare(b.username));

            const mentions = filtered.map((user) => '@' + user.username);

            //SuggestionStore.setMatchedPretext(suggestionId, captured[0]);
            //SuggestionStore.addSuggestions(suggestionId, mentions, filtered, AtMentionSuggestion);
        }
    }
}
