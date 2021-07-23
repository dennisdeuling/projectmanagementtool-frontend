import React from 'react';

function Input({ ...props }) {
	// TODO: Make a Helperfunction
	const inputTypeToLowerCase = props.inputType.toLowerCase();
	const inputTypeToUpperCase = props.inputType.charAt(0).toUpperCase() + props.inputType.slice(1);

	return (
		<React.Fragment>
			<label htmlFor={inputTypeToLowerCase}
						 className="form-label">
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
}

export default Input;
