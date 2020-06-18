import React from "react";
import Form from "@rjsf/core";
import root from 'react-shadow';

class ReactJSF extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <root.div>
                <link rel="stylesheet" href={this.props.cssHref || "https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"}></link>
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
                            className={this.props.btnClass || "btn btn-info"} >{this.props.btnText || "Submit"}</button>
                    </div>
                </Form>
            </root.div>
        )
    }
}

export default ReactJSF;