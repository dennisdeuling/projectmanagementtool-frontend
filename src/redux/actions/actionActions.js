import axios from 'axios';

// const handleEdit = projectmanagerId => (dispatch, getState) => {
// 	dispatch({
// 		type: 'EDIT_REQUEST'
// 	});
//
// 	try {
// 		const editProjectmanager = getState().projectmanagers.map(
// 			projectmanager => {
// 				const { id, name, email, edit } = projectmanager;
// 				const newProjectmanager = {
// 					id,
// 					name,
// 					email,
// 					edit: id === projectmanagerId ? !edit : edit
// 				};
// 				return newProjectmanager;
// 			}
// 		);
// 		dispatch({
// 			type: 'EDIT_SUCCESS',
// 			payload: {
// 				projectmanagers: [...editProjectmanager]
// 			}
// 		});
// 	} catch (error) {
// 		dispatch({
// 			type: 'EDIT_SUCCESS',
// 			payload: {
// 				error
// 			}
// 		});
// 	}
// };

const handleAdd = () => async (dispatch, getState) => {
	dispatch({
		type: 'ADD_REQUEST'
	});

	const { name, email, password } = getState().change;
	const { loggedInUserId } = getState().loggedInUser.id;
	const { projectmanagers } = getState();

	try {
		const newUser = await axios.post(
			`${process.env.REACT_APP_API_URL}/user/create`,
			{
				name,
				email,
				password
			},
			{ withCredentials: true }
		);

		axios.put(
			`${process.env.REACT_APP_API_URL}/user/${loggedInUserId}`,
			{
				$push: {
					projectmanagers: newUser.data._id
				}
			},
			{
				withCredentials: true
			}
		);

		dispatch({
			type: 'ADD_SUCCESS',
			payload: {
				projectmanagers: [...projectmanagers, newUser.data]
			}
		});
	} catch (error) {
		dispatch({
			type: 'ADD_ERROR',
			payload: {
				error
			}
		});
	}
};

export { handleAdd };
