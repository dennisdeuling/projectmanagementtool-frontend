const handleChange = event => {
	const { name, value } = event;

	return {
		type: 'HANDLE_CHANGE',
		payload: {
			[name]: value
		}
	};
};

export default handleChange;
