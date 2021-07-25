const handleChange = event => {
	const { name, value } = event.target;

	switch (name) {
		case 'email':
			return {
				type: 'HANDLE_CHANGE_EMAIL',
				payload: {
					[name]: value
				}
			};
		case 'password':
			return {
				type: 'HANDLE_CHANGE_PASSWORD',
				payload: {
					[name]: value
				}
			};
		case 'name':
			return {
				type: 'HANDLE_CHANGE_NAME',
				payload: {
					[name]: value
				}
			};
		default:
			return {};
	}
};

export default handleChange;
