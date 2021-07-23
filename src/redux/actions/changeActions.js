const handleChange = event => {
	const { name, value } = event;

	console.log(name);

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
		default:
			return {};
	}
};

export default handleChange;
