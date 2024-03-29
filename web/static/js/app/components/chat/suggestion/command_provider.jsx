// Copyright (c) 2016 Sparkpl.ug, Inc. All Rights Reserved.


import React from 'react';

class CommandSuggestion extends React.Component {
    render() {
        const {item, isSelection, onClick} = this.props;

        let className = 'command';
        if (isSelection) {
            className += ' suggestion--selected';
        }

        return (
            <div
                className={className}
                onClick={onClick}
            >
                <div className='command__title'>
                    <string>{item.suggestion} {item.hint}</string>
                </div>
                <div className='command__desc'>
                    {item.description}
                </div>
            </div>
        );
    }
}

CommandSuggestion.propTypes = {
    item: React.PropTypes.object.isRequired,
    isSelection: React.PropTypes.bool,
    onClick: React.PropTypes.func
};

export default class CommandProvider {
    handlePretextChanged(suggestionId, pretext) {
        if (pretext.startsWith('/')) {
            //AsyncClient.getSuggestedCommands(pretext, suggestionId, CommandSuggestion);
        }
    }
}
