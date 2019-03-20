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
const Form = JSONSchemaForm.default;

class ReactJSF extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form
                id={this.props.id || Math.random().toString(36).substr(2, 5)}
                className={this.props.className}
                name={this.props.name}

                method={this.props.method}
                target={this.props.target}
                action={this.props.action}

                autocomplete={this.props.autocomplete}
                enctype={this.props.enctype}
                acceptcharset={this.props.acceptcharset}

                schema={this.props.schema}
                uiSchema={this.props.uiSchema}
                formData={this.props.formData}

                onChange={this.props.onChange}
                onError={this.props.onError}
                onSubmit={this.props.onSubmit || function () {
                    document.getElementById(this.id).submit();
                }}

                disabled={this.props.disabled}
                liveValidate={this.props.liveValidate}
                noValidate={this.props.noValidate}
                noHtml5Validate={this.props.noHtml5Validate} >
                <div>
                    <button
                        type="submit"
                        class={this.props.btnClass || "btn btn-info"} >{this.props.btnText || "Submit"}</button>
                </div>
            </Form>
        )
    }
}

class ReactJSFDesigner extends React.Component {
    constructor(props) {
        super(props);
        window._rjsfOpt = Object.assign({
            onChange: function (rjsf) {
                if (window._formDataCode) {
                    let cursorPos = window._formDataCode.getCursor();
                    window._formDataCode.setValue(JSON.stringify(rjsf.formData, null, 2));
                    window._formDataCode.setCursor(cursorPos);
                }
            },
            liveValidate: true
        }, props);
        this.rjsfOpt = window._rjsfOpt;
    }

    componentDidMount() {
        let codeMirrorOpt = {
            value: '{}\n',
            lineNumbers: true,
            mode: 'application/json',
            lint: {
                json: true
            },
            extraKeys: {
                'Ctrl-F': function autoFormat(cm) {
                    let totalLines = cm.lineCount();
                    cm.autoFormatRange(
                        {
                            line: 0,
                            ch: 0
                        },
                        {
                            line: totalLines
                        }
                    );
                }
            }
        }

        window._schemaCode = CodeMirror(document.getElementById("_schemaCode"), codeMirrorOpt);
        window._uiSchemaCode = CodeMirror(document.getElementById("_uiSchemaCode"), codeMirrorOpt);
        window._formDataCode = CodeMirror(document.getElementById("_formDataCode"), codeMirrorOpt);

        window._schemaCode.setValue(JSON.stringify(this.rjsfOpt.schema, null, 2));
        window._uiSchemaCode.setValue(JSON.stringify(this.rjsfOpt.uiSchema, null, 2));
        window._formDataCode.setValue(JSON.stringify(this.rjsfOpt.formData, null, 2));

        window._schemaCode.on('change', function (cm, change) {
            if (change.origin != 'setValue') {
                Object.assign(window._rjsfOpt.schema, JSON.parse(cm.getValue()));
                ReactDOM.render(React.createElement(ReactForm, window._rjsfOpt), document.getElementById(
                    "_designingForm"));
            }
        });
        window._uiSchemaCode.on('change', function (cm, change) {
            if (change.origin != 'setValue') {
                Object.assign(window._rjsfOpt.uiSchema, JSON.parse(cm.getValue()));
                ReactDOM.render(React.createElement(ReactForm, window._rjsfOpt), document.getElementById(
                    "_designingForm"));
            }
        });
        window._formDataCode.on('change', function (cm, change) {
            if (change.origin != 'setValue') {
                Object.assign(window._rjsfOpt.formData, JSON.parse(cm.getValue()));
                ReactDOM.render(React.createElement(ReactForm, window._rjsfOpt), document.getElementById(
                    "_designingForm"));
            }
        });
    }

    render() {
        return (
            <div>
                <div class="col-sm-7">
                    <div class="panel panel-default">
                        <div class="panel-heading">JSONSchema</div>
                        <div id="_schemaCode"></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="panel panel-default">
                                <div class="panel-heading">UISchema</div>
                                <div id="_uiSchemaCode"></div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="panel panel-default">
                                <div class="panel-heading">formData</div>
                                <div id="_formDataCode"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-5">
                    <div id="_designingForm">
                        <ReactForm {...this.rjsfOpt}></ReactForm>
                    </div>
                </div>
            </div>
        )
    }
}