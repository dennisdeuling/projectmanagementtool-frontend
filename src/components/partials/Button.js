import React from 'react';

function Button({ ...props }) {
	// TODO: Make a Helperfunction
	const type = props.type.toLowerCase();
	const buttonText =
		props.buttonText.charAt(0).toUpperCase() + props.buttonText.slice(1);

	switch (type) {
		case 'submit':
			return (
				<button type={type} className="btn btn-primary">
					{buttonText}
				</button>
			);
		case 'button':
			return (
				<button type={type} className="btn btn-primary" onClick={props.onClick}>
					{buttonText}
				</button>
			);
		default:
			return null;
	}
}

export default Button;
