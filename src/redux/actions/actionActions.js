import axios from 'axios';

const handleAdd = () => async (dispatch, getState) => {
	dispatch({
		type: 'ADD_REQUEST'
	});

	const { name, email, password } = getState().change;
	const { id: loggedInUserId } = getState().loggedInUser;
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

		await axios.put(
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

const handleDelete = id => async (dispatch, getState) => {
	dispatch({
		type: 'DELETE_REQUEST'
	});
	console.log(id)

	const projectmanagers = getState().projectmanagers;

	try {
	const deleteUser = await axios.delete(`${process.env.REACT_APP_API_URL}/user/${id}`)
	const newProjectmanagers = projectmanagers.filter(projectmanager => id !== projectmanager.id)

		dispatch({
			type: 'DELETE_SUCCESS',
			payload: {
				projectmanagers: [...newProjectmanagers]
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

export { handleAdd, handleDelete };
