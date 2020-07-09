import React from "react"
import ReactDOM from "react-dom"
import ReactJSF from "./js/components/ReactJSF.jsx";
import axios from 'axios';

const $ = require('jquery');


var _defaultConfig = {
	cssHref: 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css',
	newBtnText: 'Submit',
	editBtnText: 'Submit',
	showBtnText: 'Return'
}

export function defaultConfig(config = {}) {
	if (config.cssHref) _defaultConfig.cssHref = config.cssHref;
	if (config.showBtnText) _defaultConfig.showBtnText = config.showBtnText;
	if (config.editBtnText) _defaultConfig.editBtnText = config.editBtnText;
	if (config.newBtnText) _defaultConfig.newBtnText = config.newBtnText;

	return defaultConfig;
}

export function newForm(rjsf, formId, path, respondId) {
	let onSubmit = (f) => {
		axios.post(path, f.formData).then((response) => {
			$('#' + respondId).html(response.data);
		});
	};

	let rjsfOpt = Object.assign({
		onSubmit: onSubmit
	}, rjsf);

	if (!rjsfOpt.cssHref) rjsfOpt.cssHref = _defaultConfig.cssHref;
	if (!rjsfOpt.btnText) rjsfOpt.btnText = _defaultConfig.newBtnText;

	ReactDOM.render(React.createElement(ReactJSF, rjsfOpt), document.getElementById(formId));
}

export function editForm(rjsf, formId, path, respondId) {
	let onSubmit = (f) => {
		axios.post(path, f.formData).then((response) => {
			$('#' + respondId).html(response.data);
		});
	};

	let rjsfOpt = Object.assign({
		onSubmit: onSubmit
	}, rjsf);

	if (!rjsfOpt.cssHref) rjsfOpt.cssHref = _defaultConfig.cssHref;
	if (!rjsfOpt.btnText) rjsfOpt.btnText = _defaultConfig.editBtnText;

	ReactDOM.render(React.createElement(ReactJSF, rjsfOpt), document.getElementById(formId));
}

export function showForm(rjsf, formId, path, respondId) {
	let onSubmit = () => {
		axios.get(path)
			.then((response) => {
				$('#' + respondId).html(response.data);
			});
	};

	let rjsfOpt = Object.assign({
		onSubmit: onSubmit,
		disabled: true,
		noValidate: true
	}, rjsf);

	if (!rjsfOpt.cssHref) rjsfOpt.cssHref = _defaultConfig.cssHref;
	if (!rjsfOpt.btnText) rjsfOpt.btnText = _defaultConfig.showBtnText;

	ReactDOM.render(React.createElement(ReactJSF, rjsfOpt), document.getElementById(formId));
}
