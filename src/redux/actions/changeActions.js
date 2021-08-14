const handleChange = event => {
	const { name, value } = event.target;
	const nameUpper = name.toUpperCase();

	try {
		return {
			type: `HANDLE_CHANGE_${nameUpper}`,
			payload: {
				eventName: nameUpper,
				[name]: value
			}
		};
	} catch (error) {
		return {
			type: `HANDLE_CHANGE_${nameUpper}`,
			payload: {
				nameUpper: nameUpper,
				error
			}
		};
	}
};

export default handleChange;
