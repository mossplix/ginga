/** @flow */

const Colors = require('./Colors');
const PureRender = require('./PureRender');
const Radium = require('radium');
const {Component} = require('react');
import {StyleRoot} from 'radium';

@Radium
@PureRender
class Spinner extends Component {
  render(): any {
    return (

      <div style={styles.root}>
        <div style={styles.inner} />
      </div>

    );
  }
}

const pulseKeyframes = Radium.keyframes({
  '0%': {width: '10%'},
  '50%': {width: '50%'},
  '100%': {width: '10%'},
},'pulse');

const styles = {
  root: {
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 10000,
  },

  inner: {
    animation:  'x  3s ease 0s infinite',
      animationName: pulseKeyframes,
    background: Colors.accent,
    height: '4px',
    margin: '0 auto',
  },
};

module.exports = Spinner;
