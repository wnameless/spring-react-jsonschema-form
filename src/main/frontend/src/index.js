import React from "react"
import ReactDOM from "react-dom"
import ReactJSF from "./js/components/ReactJSF.jsx";
import axios from 'axios';

const $ = require('jquery');

export function newForm(rjsf, formId, path, respondId) {
	let onSubmit = (f) => {
		axios.post(path, f.formData).then((response) => {
			$('#' + respondId).html(response.data);
		});
	};

	let rjsfOpt = Object.assign({
		onSubmit: onSubmit
	}, rjsf);

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

	ReactDOM.render(React.createElement(ReactJSF, rjsfOpt), document.getElementById(formId));
}
