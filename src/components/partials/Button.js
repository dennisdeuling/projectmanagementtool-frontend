import React from 'react';

function Button({...props}) {
	// TODO: Make a Helperfunction
	const type = props.type.toLowerCase();
	const buttonText = props.buttonText.charAt(0).toUpperCase() + props.buttonText.slice(1);
	return (
			<button type={type} className="btn btn-primary">
				{buttonText}
			</button>
	);
}

export default Button;
