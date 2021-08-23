import React from 'react';

function Input({ ...props }) {
	// TODO: Make a Helperfunction
	const { inputType, label, value } = props;
	const inputTypeToLowerCase = inputType.toLowerCase();
	const inputTypeToUpperCase = inputType.charAt(0).toUpperCase() + inputType.slice(1);
	const labelToLowerCase = label ? label.toLowerCase() : '';
	const labelToUpperCase = label ? label.charAt(0).toUpperCase() + label.slice(1) : '';

	switch (inputType) {
		case 'email':
		case 'password':
			return (
				<React.Fragment>
					<label htmlFor={inputTypeToLowerCase} className="form-label">
						{inputTypeToUpperCase}
					</label>
					<input
						type={inputTypeToLowerCase}
						className="form-control"
						id={inputTypeToLowerCase}
						name={inputTypeToLowerCase}
						onChange={props.onChange}
					/>
				</React.Fragment>
			);
		case 'text':
			return (
				<React.Fragment>
					<label htmlFor={labelToLowerCase} className="form-label">
						{labelToUpperCase}
					</label>
					<input
						type={inputTypeToLowerCase}
						className="form-control"
						id={labelToLowerCase}
						name={labelToLowerCase}
						value={value}
						onChange={props.onChange}
					/>
				</React.Fragment>
			);
		case 'textarea':
			return (
				<React.Fragment>
					<label htmlFor={labelToLowerCase} className="form-label">
						{labelToUpperCase}
					</label>
					<textarea
						className="form-control"
						id={labelToLowerCase}
						name={labelToLowerCase}
						value={value}
						onChange={props.onChange}
					/>
				</React.Fragment>
			);
		default:
			return null;
	}
}

export default Input;
