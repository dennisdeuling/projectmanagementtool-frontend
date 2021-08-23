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

const initialChange = data => {
	const { _id, name, street, zipCode, city } = data;

	try {
		return {
			type: 'SET_CHANGE_DATA',
			payload: {
				change: {
					_id,
					name,
					street,
					zipCode,
					city
				}
			}
		};
	} catch (error) {
		return {
			type: 'SET_CHANGE_DATA',
			payload: {
				change: {
					error
				}
			}
		};
	}
};

export { handleChange, initialChange };
