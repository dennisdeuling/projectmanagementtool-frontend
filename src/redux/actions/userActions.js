import DatabaseService from '../../services/database.service';

const fetchProjectmanager = id => async (dispatch, getState) => {
	dispatch({
		type: 'FETCH_PROJECTMANAGER_REQUEST'
	});

	try {
		let fetchProjectmanager = new DatabaseService('user');

		fetchProjectmanager = await fetchProjectmanager.getOne(id);

		dispatch({
			type: 'FETCH_PROJECTMANAGER_SUCCESS',
			payload: {
				projectmanager: {
					id: fetchProjectmanager._id,
					name: fetchProjectmanager.name,
					email: fetchProjectmanager.email,
					position: fetchProjectmanager.position,
					clients: [...fetchProjectmanager.clients],
					projects: [...fetchProjectmanager.projects],
					tickets: [...fetchProjectmanager.tickets]
				},
				loading: false,
				error: null
			}
		});
	} catch (error) {
		dispatch({
			type: 'FETCH_PROJECTMANAGER_ERROR',
			payload: {
				error
			}
		});
	}
};

export { fetchProjectmanager };
