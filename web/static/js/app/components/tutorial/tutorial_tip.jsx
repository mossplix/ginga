// Copyright (c) 2016 Sparkplug, Inc. All Rights Reserved.


import Constants from '../../constants';

import {FormattedMessage} from 'react-intl';

const Preferences = Constants.Preferences;

import {Overlay} from 'react-bootstrap';

import React from 'react';

import tutorialGif from '../../images/tutorialTip.gif';
import tutorialGifWhite from '../../images/tutorialTipWhite.gif';

export default class TutorialTip extends React.Component {
    constructor(props) {
        super(props);

        this.handleNext = this.handleNext.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state = {currentScreen: 0, show: false};
    }
    toggle() {
        const show = !this.state.show;
        this.setState({show});

        if (!show && this.state.currentScreen >= this.props.screens.length - 1) {
            const step = PreferenceStore.getInt(Preferences.TUTORIAL_STEP, UserStore.getCurrentId(), 0);

            AsyncClient.savePreference(
                Preferences.TUTORIAL_STEP,
                UserStore.getCurrentId(),
                (step + 1).toString()
            );
        }
    }
    handleNext() {
        if (this.state.currentScreen < this.props.screens.length - 1) {
            this.setState({currentScreen: this.state.currentScreen + 1});
            return;
        }

        this.toggle();
    }
    skipTutorial(e) {
        e.preventDefault();

        AsyncClient.savePreference(
            Preferences.TUTORIAL_STEP,
            UserStore.getCurrentId(),
            '999'
        );
    }
    render() {
        const buttonText = this.state.currentScreen === this.props.screens.length - 1 ? (
            <FormattedMessage
                id='tutorial_tip.ok'
                defaultMessage='Okay'
            />
        ) : (
            <FormattedMessage
                id='tutorial_tip.next'
                defaultMessage='Next'
            />
        );

        const dots = [];
        if (this.props.screens.length > 1) {
            for (let i = 0; i < this.props.screens.length; i++) {
                let className = 'circle';
                if (i === this.state.currentScreen) {
                    className += ' active';
                }

                dots.push(
                    <a
                        href='#'
                        key={'dotactive' + i}
                        className={className}
                        onClick={(e) => { //eslint-disable-line no-loop-func
                            e.preventDefault();
                            this.setState({currentScreen: i});
                        }}
                    />
                );
            }
        }

        var tutorialGifImage = tutorialGif;
        if (this.props.overlayClass === 'tip-overlay--header' || this.props.overlayClass === 'tip-overlay--sidebar') {
            tutorialGifImage = tutorialGifWhite;
        }

        return (
            <div className={'tip-div ' + this.props.overlayClass}>
                <img
                    className='tip-button'
                    src={tutorialGifImage}
                    width='35'
                    onClick={this.toggle}
                    ref='target'
                />

                <Overlay
                    show={this.state.show}
                >
                    <div className='tip-backdrop'/>
                </Overlay>

                <Overlay
                    placement={this.props.placement}
                    show={this.state.show}
                    rootClose={true}
                    onHide={this.toggle}
                    target={() => this.refs.target}
                >
                    <div className={'tip-overlay ' + this.props.overlayClass}>
                        <div className='arrow'></div>
                        {this.props.screens[this.state.currentScreen]}
                        <div className='tutorial__footer'>
                            <div className='tutorial__circles'>{dots}</div>
                            <div className='text-right'>
                                <button
                                    className='btn btn-primary'
                                    onClick={this.handleNext}
                                >
                                    {buttonText}
                                </button>
                                <div className='tip-opt'>
                                    <FormattedMessage
                                        id='tutorial_tip.seen'
                                        defaultMessage='Seen this before? '
                                    />
                                    <a
                                        href='#'
                                        onClick={this.skipTutorial}
                                    >
                                        <FormattedMessage
                                            id='tutorial_tip.out'
                                            defaultMessage='Opt out of these tips.'
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Overlay>
            </div>
        );
    }
}

TutorialTip.defaultProps = {
    overlayClass: ''
};

TutorialTip.propTypes = {
    screens: React.PropTypes.array.isRequired,
    placement: React.PropTypes.string.isRequired,
    overlayClass: React.PropTypes.string
};
