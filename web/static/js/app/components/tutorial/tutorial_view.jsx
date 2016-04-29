// Copyright (c) 2016 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import TutorialIntroScreens from './tutorial_intro_screens.jsx';


import Constants from '../../constants';

import React from 'react';

export default class TutorialView extends React.Component {
    constructor(props) {
        super(props);

        //this.handleChannelChange = this.handleChannelChange.bind(this);

        this.state = {
            townSquare: ""//ChannelStore.getByName(Constants.DEFAULT_CHANNEL)
        };
    }
    componentDidMount() {
        //ChannelStore.addChangeListener(this.handleChannelChange);
    }
    componentWillUnmount() {
        //ChannelStore.removeChangeListener(this.handleChannelChange);
    }
    handleChannelChange() {
        this.setState({
            townSquare: "lobby"//ChannelStore.getByName(Constants.DEFAULT_CHANNEL)
        });
    }
    render() {
        return (
            <div
                id='app-content'
                className='app__content'
            >
                <TutorialIntroScreens
                    townSquare={this.state.townSquare}
                />
            </div>
        );
    }
}
