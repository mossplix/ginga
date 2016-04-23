/** @flow */

const clamp = require('./clamp');
const PureRender = require('./PureRender');
const {Component, PropTypes, findDOMNode} = require('react');

@PureRender
class LineClamp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    lines: PropTypes.number.isRequired,
  };

  componentDidMount() {
    clamp(findDOMNode(this.refs.content), {clamp: this.props.lines});
  }

  render(): any {
    return (
      <div ref="content">
        {this.props.children}
      </div>
    );
  }
}

module.exports = LineClamp;
