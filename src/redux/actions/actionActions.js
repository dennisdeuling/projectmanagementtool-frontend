import axios from 'axios';
import DatabaseService from '../../services/database.service';

const handleAdd = () => async (dispatch, getState) => {
	dispatch({
		type: 'ADD_REQUEST'
	});

	const { name, email, password } = getState().change;
	const { _id: loggedInUserId } = getState().loggedInUser;
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

const handleDelete = data => async (dispatch, getState) => {
	const { id, model } = data;
	dispatch({
		type: 'DELETE_REQUEST',
		model: model
	});

	try {
		const dataModel = `${model}s`;
		let state = getState()[dataModel];

		let deleteData = new DatabaseService(model);
		deleteData.deleteOne(id);

		const newData = state.filter(data => id !== data._id);

		dispatch({
			type: 'DELETE_SUCCESS',
			model: model,
			payload: {
				newData: [...newData]
			}
		});
	} catch (error) {
		dispatch({
			type: 'DELETE_ERROR',
			model: model,
			payload: {
				error
			}
		});
	}
};

export { handleAdd, handleDelete };
