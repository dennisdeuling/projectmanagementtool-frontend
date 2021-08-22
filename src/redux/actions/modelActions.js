import DatabaseService from '../../services/database.service';

const fetchModel = data => (dispatch, getState) => {
	const { ids, model } = data;
	const modelUpper = model.toUpperCase();
	const modelLower = model.toLowerCase();

	dispatch({
		type: `FETCH_${modelUpper}_REQUEST`
	});

	try {
		let fetchModel = new DatabaseService(`${modelLower}`);

		const newData = [];

		if (ids.length < 1) {
			ids.forEach(id => {
				let data = fetchModel.getOne(id);
				data.then(response => newData.push(response));
			});
		} else {
			let data = fetchModel.getOne(ids);
			data.then(response => newData.push(response));
		}

		dispatch({
			type: `FETCH_${modelUpper}_SUCCESS`,
			modelUpper,
			modelLower,
			payload: {
				newData,
				loading: false,
				error: null
			}
		});
	} catch (error) {
		dispatch({
			type: `FETCH_${modelUpper}_ERROR`,
			payload: {
				error
			}
		});
	}
};

const findByUserId = data => (dispatch, getState) => {
	const { id, model } = data;
	const modelUpper = model.toUpperCase();
	const modelLower = model.toLowerCase();

	dispatch({
		type: `FETCH_${modelUpper}_REQUEST`
	});

	let fetchModel = new DatabaseService(`${modelLower}`);

	fetchModel
		.findModelByUserId(id, model)
		.then(clients => {
			dispatch({
				type: `FETCH_${modelUpper}_SUCCESS`,
				modelUpper,
				modelLower,
				payload: {
					newData: [...clients],
					loading: false,
					error: null
				}
			});
		})
		.catch(error => {
			dispatch({
				type: `FETCH_${modelUpper}_ERROR`,
				payload: {
					error
				}
			});
		});
};

export { fetchModel, findByUserId };
