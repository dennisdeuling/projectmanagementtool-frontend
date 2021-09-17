import React from 'react';
import { Button as MaterialButton } from '@material-ui/core/';

function Button({ ...props }) {
	// TODO: Make a Helperfunction
	const type = props.type.toLowerCase();
	const buttonText = props.buttonText.charAt(0).toUpperCase() + props.buttonText.slice(1);

	switch (type) {
		case 'submit':
			return (
				<MaterialButton type={type} fullWidth variant="contained" color="primary">
					{buttonText}
				</MaterialButton>
			);
		case 'button':
			return (
				<MaterialButton variant="contained" color="primary" type={type} onClick={props.onClick}>
					{buttonText}
				</MaterialButton>
				// <button type={type} className="btn btn-primary" onClick={props.onClick}>
				// 	{buttonText}
				// </button>
			);
		default:
			return null;
	}
}

export default Button;
