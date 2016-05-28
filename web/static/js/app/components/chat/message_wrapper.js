// Copyright (c) 2016 Sparkplug, Inc. All Rights Reserved.

import * as TextFormatting from '../../utils/text_formatting';

import React from 'react';

export default class MessageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        if (this.props.message) {
            return <div dangerouslySetInnerHTML={{__html: TextFormatting.formatText(this.props.message, this.props.options)}}/>;
        }

        return <div/>;
    }
}

MessageWrapper.defaultProps = {
    message: ''
};
MessageWrapper.propTypes = {
    message: React.PropTypes.string,
    options: React.PropTypes.object
};
