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

const initialChange = (data) => {
	const { model } = data;

	try {
		switch (model) {
			case 'user':
				return {
					type: 'SET_CHANGE_DATA',
					payload: {
						change: {
							_id: data._id,
							name: data.name,
							email: data.email
						}
					}
				};
			case 'client':
				return {
					type: 'SET_CHANGE_DATA',
					payload: {
						change: {
							_id: data._id,
							name: data.name,
							street: data.street,
							zipCode: data.zipCode,
							city: data.city
						}
					}
				};
			case 'project':
			case 'ticket':
				return {
					type: 'SET_CHANGE_DATA',
					payload: {
						change: {
							_id: data._id,
							title: data.title,
							description: data.description
						}
					}
				};
			default:
				break;
		}
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
