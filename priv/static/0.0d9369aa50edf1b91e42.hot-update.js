webpackHotUpdate(0,{

/***/ 1138:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Colors = __webpack_require__(1139);
	var PureRender = __webpack_require__(1142);
	var Radium = __webpack_require__(927);
	
	var _require = __webpack_require__(2);
	
	var Component = _require.Component;
	
	var Spinner = Radium(_class = PureRender(_class = function (_Component) {
	  _inherits(Spinner, _Component);
	
	  function Spinner() {
	    _classCallCheck(this, Spinner);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Spinner).apply(this, arguments));
	  }
	
	  _createClass(Spinner, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        style: styles.root
	      }, void 0, _jsx('div', {
	        style: styles.inner
	      }));
	    }
	  }]);
	
	  return Spinner;
	}(Component)) || _class) || _class;
	
	var pulseKeyframes = Radium.keyframes({
	  '0%': { width: '10%' },
	  '50%': { width: '50%' },
	  '100%': { width: '10%' }
	}, 'pulse');
	
	var styles = {
	  root: {
	    left: 0,
	    position: 'fixed',
	    top: 0,
	    width: '100%',
	    zIndex: 10000
	  },
	
	  inner: {
	    animation: 'x  3s ease 0s infinite',
	    animationName: pulseAnimation,
	    background: Colors.accent,
	    height: '4px',
	    margin: '0 auto'
	  }
	};
	
	module.exports = Spinner;

/***/ }

})
//# sourceMappingURL=0.0d9369aa50edf1b91e42.hot-update.js.map