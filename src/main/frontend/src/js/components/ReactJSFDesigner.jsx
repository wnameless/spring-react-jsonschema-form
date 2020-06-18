import React from "react";
import Form from "@rjsf/core";
import root from 'react-shadow';

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
                        <Form {...this.rjsfOpt}></Form>
                    </div>
                </div>
            </div>
        )
    }
}