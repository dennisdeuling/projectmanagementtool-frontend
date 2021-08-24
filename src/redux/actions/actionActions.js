import axios from 'axios';
import DatabaseService from '../../services/database.service';

const handleAdd = model => async (dispatch, getState) => {
	dispatch({
		type: 'ADD_REQUEST',
		payload: {
			model: model
		}
	});

	try {
		const { name, email, password, city, street, zipcode, title, description } = getState().change;
		const { clients, projects, tickets } = getState();
		const { _id: loggedInUserId } = getState().loggedInUser;
		let value = [];

		let newData = {};

		switch (model) {
			case 'user':
				newData = { name, email, password };
				break;
			case 'client':
				newData = {
					name,
					address: { city, streetAndHousenr: street, zipCode: zipcode }
				};
				value = [...clients];
				break;
			case 'project':
				newData = { title, description };
				value = [...projects];
				break;
			case 'ticket':
				newData = { title, description };
				value = [...tickets];
				break;
			default:
				console.log('Something is wrong in handleAdd');
				break;
		}

		const newDataToDatabase = await axios.post(
			`${process.env.REACT_APP_API_URL}/${model}/create`,
			{
				newData
			},
			{ withCredentials: true }
		);

		await axios.put(
			`${process.env.REACT_APP_API_URL}/user/${loggedInUserId}`,
			{
				$push: {
					[`${model}s`]: newDataToDatabase.data._id
				}
			},
			{
				withCredentials: true
			}
		);

		dispatch({
			type: 'ADD_SUCCESS',
			payload: {
				model: model,
				newData: [...value, newDataToDatabase.data]
			}
		});
	} catch (error) {
		dispatch({
			type: 'ADD_ERROR',
			payload: {
				model: model,
				error
			}
		});
	}
};

const handleUpdate = model => (dispatch, getState) => {
	dispatch({
		type: 'EDIT_REQUEST',
		payload: {
			model: model
		}
	});

	const {
		_id: modelId,
		name,
		email,
		password,
		city,
		street,
		zipcode,
		title,
		description
	} = getState().change;

	let newData = {};

	switch (model) {
		case 'user':
			newData = { name, email, password };
			break;
		case 'client':
			newData = {
				name,
				address: { city, streetAndHousenr: street, zipCode: zipcode }
			};
			break;
		case 'project':
		case 'ticket':
			newData = { title, description };
			break;
		default:
			console.log('Something is wrong in update - Data');
			break;
	}

	axios
		.put(
			`${process.env.REACT_APP_API_URL}/${model}/${modelId}`,
			{
				newData
			},
			{ withCredentials: true }
		)
		.then(data => {
			const { _id } = data.data;

			switch (model) {
				case 'client':
					const { name } = data.data;
					const { streetAndHousenr: street, zipCode: zipcode, city } = data.data.address;
					dispatch({
						type: 'EDIT_SUCCESS',
						payload: {
							model: model,
							newData: {
								_id,
								name,
								street,
								zipcode,
								city
							}
						}
					});
					break;
				case 'project':
				case 'ticket':
					const { title, description } = data.data;
					dispatch({
						type: 'EDIT_SUCCESS',
						payload: {
							model: model,
							newData: {
								_id,
								title,
								description
							}
						}
					});
					break;
				default:
					console.log('Something is wrong in update - Promise');
					break;
			}
		})
		.catch(error => {
			dispatch({
				type: 'EDIT_ERROR',
				payload: {
					model: model,
					error
				}
			});
		});
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

export { handleAdd, handleUpdate, handleDelete };
