import React from 'react';
import { TextField } from '@material-ui/core';
function Input({ ...props }) {
	// TODO: Make a Helperfunction
	const { inputType, label, value } = props;
	const inputTypeToLowerCase = inputType.toLowerCase();
	const inputTypeToUpperCase = inputType.charAt(0).toUpperCase() + inputType.slice(1);
	const labelToLowerCase = label ? label.toLowerCase() : '';
	const labelToUpperCase = label ? label.charAt(0).toUpperCase() + label.slice(1) : '';

	switch (inputType) {
		case 'email':
			return (
				<React.Fragment>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						id={inputTypeToLowerCase}
						label={inputTypeToUpperCase}
						name={inputTypeToLowerCase}
						autoComplete="email"
						autoFocus
						onChange={props.onChange}
					/>
				</React.Fragment>

					// <label htmlFor={inputTypeToLowerCase} className="form-label">
					// 	{inputTypeToUpperCase}
					// </label>
					// <input
					// 	type={inputTypeToLowerCase}
					// 	className="form-control"
					// 	id={inputTypeToLowerCase}
					// 	name={inputTypeToLowerCase}
					// 	value={value}
					// 	onChange={props.onChange}
					// />
			);
		case 'password':
			return (
				<React.Fragment>
				<TextField
					variant="outlined"
					margin="normal"
					fullWidth
					id={inputTypeToLowerCase}
					label={inputTypeToUpperCase}
					type={inputTypeToLowerCase}
					name={inputTypeToLowerCase}
					autoComplete="current-password"
					onChange={props.onChange}
				/>
				</React.Fragment>

					// <label htmlFor={inputTypeToLowerCase} className="form-label">
					// 	{inputTypeToUpperCase}
					// </label>
					// <input
					// 	type={inputTypeToLowerCase}
					// 	className="form-control"
					// 	id={inputTypeToLowerCase}
					// 	name={inputTypeToLowerCase}
					// 	onChange={props.onChange}
					// />

			);
		case 'text':
			return (
				<React.Fragment>
					<TextField
						id="outlined-password-input"
						label={inputTypeToUpperCase}
						type={inputTypeToLowerCase}
						autoComplete="current-password"
						variant="outlined"
						onChange={props.onChange}
					/>
				</React.Fragment>

					// <label htmlFor={labelToLowerCase} className="form-label">
					// 	{labelToUpperCase}
					// </label>
					// <input
					// 	type={inputTypeToLowerCase}
					// 	className="form-control"
					// 	id={labelToLowerCase}
					// 	name={labelToLowerCase}
					// 	value={value}
					// 	onChange={props.onChange}
					// />

			);
		case 'textarea':
			return (
				<React.Fragment>
					<TextField
						id="outlined-multiline-flexible"
						label={labelToUpperCase}
						multiline
						maxRows={4}
						value={value}
						onChange={props.onChange}
						variant="outlined"
					/>
				</React.Fragment>

			// <label htmlFor={labelToLowerCase} className="form-label">
			// 	{labelToUpperCase}
			// </label>
			// <textarea
			// 	className="form-control"
			// 	id={labelToLowerCase}
			// 	name={labelToLowerCase}
			// 	value={value}
			// 	onChange={props.onChange}
			// />

			);
		default:
			return null;
	}
}

export default Input;
