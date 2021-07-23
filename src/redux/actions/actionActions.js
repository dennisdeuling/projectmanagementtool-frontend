const handleEdit = projectmanagerId => (dispatch, getState) => {
	dispatch({
		type: 'EDIT_REQUEST'
	});

	try {
		const editProjectmanager = getState().projectmanagers.map(
			projectmanager => {
				const { id, name, email, edit } = projectmanager;
				const newProjectmanager = {
					id,
					name,
					email,
					edit: id === projectmanagerId ? !edit : edit
				};
				return newProjectmanager;
			}
		);
		dispatch({
			type: 'EDIT_SUCCESS',
			payload: {
				projectmanagers: [...editProjectmanager]
			}
		});
	} catch (error) {
		dispatch({
			type: 'EDIT_SUCCESS',
			payload: {
				error
			}
		});
	}
};

const handleSave = () => async (dispatch, getState) => {};

export { handleEdit, handleSave };
