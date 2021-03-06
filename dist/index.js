(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react);
        global.index = mod.exports;
    }
})(this, function (exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var reactSwipeEvents = function (_React$Component) {
        _inherits(reactSwipeEvents, _React$Component);

        function reactSwipeEvents(props, context) {
            _classCallCheck(this, reactSwipeEvents);

            var _this = _possibleConstructorReturn(this, (reactSwipeEvents.__proto__ || Object.getPrototypeOf(reactSwipeEvents)).call(this, props));

            _this.state = { originalX: 0, originalY: 0 };

            _this.onTouchStart = _this.onTouchStart.bind(_this);
            _this.onTouchMove = _this.onTouchMove.bind(_this);
            _this.onTouchEnd = _this.onTouchEnd.bind(_this);
            _this.getModifiedProps = _this.getModifiedProps.bind(_this);
            _this.getDelta = _this.getDelta.bind(_this);
            return _this;
        }

        _createClass(reactSwipeEvents, [{
            key: 'onTouchStart',
            value: function onTouchStart(e) {
                var touch = e.changedTouches[0];
                var current = this.getCurrentPosition(touch);

                this.setState({ originalX: current.x, originalY: current.y });
            }
        }, {
            key: 'onTouchMove',
            value: function onTouchMove(e) {
                var touch = e.changedTouches[0];
                var delta = this.getDelta(touch);
                var current = this.getCurrentPosition(touch);
                this.props.onSwiping && this.props.onSwiping(e, this.state.originalX, this.state.originalY, current.x, current.y, delta.x, delta.y);
            }
        }, {
            key: 'onTouchEnd',
            value: function onTouchEnd(e) {
                var touch = e.changedTouches[0];
                var delta = this.getDelta(touch);
                var current = this.getCurrentPosition(touch);

                if (Math.abs(delta.x) > this.props.threshold) {
                    if (delta.x > 0) this.props.onSwipedRight && this.props.onSwipedRight(e, this.state.originalX, current.x);
                    if (delta.x < 0) this.props.onSwipedLeft && this.props.onSwipedLeft(e, this.state.originalX, current.x);
                }

                if (Math.abs(delta.y) > this.props.threshold) {
                    if (delta.y > 0) this.props.onSwipedDown && this.props.onSwipedDown(e, this.state.originalY, current.y);
                    if (delta.y < 0) this.props.onSwipedUp && this.props.onSwipedUp(e, this.state.originalY, current.y);
                }

                this.props.onSwiped && this.props.onSwiped(e, this.state.originalX, this.state.originalY, current.x, current.y, delta.x, delta.y);
                this.setState({ originalX: 0, originalY: 0 });
            }
        }, {
            key: 'getCurrentPosition',
            value: function getCurrentPosition(touch) {
                return {
                    x: parseInt(touch.screenX),
                    y: parseInt(touch.screenY)
                };
            }
        }, {
            key: 'getDelta',
            value: function getDelta(touch) {
                return {
                    x: parseInt(touch.screenX) - this.state.originalX,
                    y: parseInt(touch.screenY) - this.state.originalY
                };
            }
        }, {
            key: 'getModifiedProps',
            value: function getModifiedProps() {
                var props = _extends({}, this.props, {
                    onTouchStart: this.onTouchStart,
                    onTouchEnd: this.onTouchEnd,
                    onTouchMove: this.onTouchMove
                });

                delete props.children;
                delete props.onSwiping;
                delete props.onSwiped;
                delete props.onSwipedUp;
                delete props.onSwipedDown;
                delete props.onSwipedLeft;
                delete props.onSwipedRight;
                delete props.nodeName;
                delete props.threshold;

                return props;
            }
        }, {
            key: 'render',
            value: function render() {
                var props = this.getModifiedProps();
                return _react2.default.createElement(this.props.nodeName, props, this.props.children);
            }
        }]);

        return reactSwipeEvents;
    }(_react2.default.Component);

    reactSwipeEvents.defaultProps = {
        threshold: 10,
        nodeName: 'div'
    };

    reactSwipeEvents.propTypes = {
        children: _react2.default.PropTypes.element.isRequired,
        onSwiping: _react2.default.PropTypes.func,
        onSwiped: _react2.default.PropTypes.func,
        onSwipedUp: _react2.default.PropTypes.func,
        onSwipedDown: _react2.default.PropTypes.func,
        onSwipedLeft: _react2.default.PropTypes.func,
        onSwipedRight: _react2.default.PropTypes.func,
        nodeName: _react2.default.PropTypes.string,
        threshold: _react2.default.PropTypes.number
    };

    exports.default = reactSwipeEvents;
});
