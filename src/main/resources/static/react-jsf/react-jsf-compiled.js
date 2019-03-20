/*
 *
 * Copyright 2019 Wei-Ming Wu
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 *
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = JSONSchemaForm.default;

var ReactJSF = function (_React$Component) {
    _inherits(ReactJSF, _React$Component);

    function ReactJSF(props) {
        _classCallCheck(this, ReactJSF);

        return _possibleConstructorReturn(this, (ReactJSF.__proto__ || Object.getPrototypeOf(ReactJSF)).call(this, props));
    }

    _createClass(ReactJSF, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Form,
                {
                    id: this.props.id || Math.random().toString(36).substr(2, 5),
                    className: this.props.className,
                    name: this.props.name,

                    method: this.props.method,
                    target: this.props.target,
                    action: this.props.action,

                    autocomplete: this.props.autocomplete,
                    enctype: this.props.enctype,
                    acceptcharset: this.props.acceptcharset,

                    schema: this.props.schema,
                    uiSchema: this.props.uiSchema,
                    formData: this.props.formData,

                    onChange: this.props.onChange,
                    onError: this.props.onError,
                    onSubmit: this.props.onSubmit || function () {
                        document.getElementById(this.id).submit();
                    },

                    disabled: this.props.disabled,
                    liveValidate: this.props.liveValidate,
                    noValidate: this.props.noValidate,
                    noHtml5Validate: this.props.noHtml5Validate },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "button",
                        {
                            type: "submit",
                            "class": this.props.btnClass || "btn btn-info" },
                        this.props.btnText || "Submit"
                    )
                )
            );
        }
    }]);

    return ReactJSF;
}(React.Component);

var ReactJSFDesigner = function (_React$Component2) {
    _inherits(ReactJSFDesigner, _React$Component2);

    function ReactJSFDesigner(props) {
        _classCallCheck(this, ReactJSFDesigner);

        var _this2 = _possibleConstructorReturn(this, (ReactJSFDesigner.__proto__ || Object.getPrototypeOf(ReactJSFDesigner)).call(this, props));

        window._rjsfOpt = Object.assign({
            onChange: function onChange(rjsf) {
                if (window._formDataCode) {
                    var cursorPos = window._formDataCode.getCursor();
                    window._formDataCode.setValue(JSON.stringify(rjsf.formData, null, 2));
                    window._formDataCode.setCursor(cursorPos);
                }
            },
            liveValidate: true
        }, props);
        _this2.rjsfOpt = window._rjsfOpt;
        return _this2;
    }

    _createClass(ReactJSFDesigner, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var codeMirrorOpt = {
                value: '{}\n',
                lineNumbers: true,
                mode: 'application/json',
                lint: {
                    json: true
                },
                extraKeys: {
                    'Ctrl-F': function autoFormat(cm) {
                        var totalLines = cm.lineCount();
                        cm.autoFormatRange({
                            line: 0,
                            ch: 0
                        }, {
                            line: totalLines
                        });
                    }
                }
            };

            window._schemaCode = CodeMirror(document.getElementById("_schemaCode"), codeMirrorOpt);
            window._uiSchemaCode = CodeMirror(document.getElementById("_uiSchemaCode"), codeMirrorOpt);
            window._formDataCode = CodeMirror(document.getElementById("_formDataCode"), codeMirrorOpt);

            window._schemaCode.setValue(JSON.stringify(this.rjsfOpt.schema, null, 2));
            window._uiSchemaCode.setValue(JSON.stringify(this.rjsfOpt.uiSchema, null, 2));
            window._formDataCode.setValue(JSON.stringify(this.rjsfOpt.formData, null, 2));

            window._schemaCode.on('change', function (cm, change) {
                if (change.origin != 'setValue') {
                    Object.assign(window._rjsfOpt.schema, JSON.parse(cm.getValue()));
                    ReactDOM.render(React.createElement(ReactJSF, window._rjsfOpt), document.getElementById("_designingForm"));
                }
            });
            window._uiSchemaCode.on('change', function (cm, change) {
                if (change.origin != 'setValue') {
                    Object.assign(window._rjsfOpt.uiSchema, JSON.parse(cm.getValue()));
                    ReactDOM.render(React.createElement(ReactJSF, window._rjsfOpt), document.getElementById("_designingForm"));
                }
            });
            window._formDataCode.on('change', function (cm, change) {
                if (change.origin != 'setValue') {
                    Object.assign(window._rjsfOpt.formData, JSON.parse(cm.getValue()));
                    ReactDOM.render(React.createElement(ReactJSF, window._rjsfOpt), document.getElementById("_designingForm"));
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { "class": "col-sm-7" },
                    React.createElement(
                        "div",
                        { "class": "panel panel-default" },
                        React.createElement(
                            "div",
                            { "class": "panel-heading" },
                            "JSONSchema"
                        ),
                        React.createElement("div", { id: "_schemaCode" })
                    ),
                    React.createElement(
                        "div",
                        { "class": "row" },
                        React.createElement(
                            "div",
                            { "class": "col-sm-6" },
                            React.createElement(
                                "div",
                                { "class": "panel panel-default" },
                                React.createElement(
                                    "div",
                                    { "class": "panel-heading" },
                                    "UISchema"
                                ),
                                React.createElement("div", { id: "_uiSchemaCode" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { "class": "col-sm-6" },
                            React.createElement(
                                "div",
                                { "class": "panel panel-default" },
                                React.createElement(
                                    "div",
                                    { "class": "panel-heading" },
                                    "formData"
                                ),
                                React.createElement("div", { id: "_formDataCode" })
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { "class": "col-sm-5" },
                    React.createElement(
                        "div",
                        { id: "_designingForm" },
                        React.createElement(ReactJSF, this.rjsfOpt)
                    )
                )
            );
        }
    }]);

    return ReactJSFDesigner;
}(React.Component);