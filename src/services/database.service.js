import axios from 'axios';

class DatabaseService {
	constructor(model) {
		model = model.toLowerCase();
		switch (model) {
			case 'user':
			case 'projectmanager':
				this.apiUrl = `${process.env.REACT_APP_API_URL}/user`;
				break;
			case 'client':
				this.apiUrl = `${process.env.REACT_APP_API_URL}/client`;
				break;
			case 'project':
				this.apiUrl = `${process.env.REACT_APP_API_URL}/project`;
				break;
			case 'ticket':
				this.apiUrl = `${process.env.REACT_APP_API_URL}/ticket`;
				break;
			default:
				this.apiUrl = `${process.env.REACT_APP_API_URL}`;
				break;
		}
	}

	getAll = () => {
		return axios
			.get(`${this.apiUrl}`)
			.then(response => response.data)
			.catch(error => error);
	};

	getOne = id => {
		return axios
			.get(`${this.apiUrl}/${id}`)
			.then(response => response.data)
			.catch(error => error);
	};

	deleteOne = id => {
		return axios
			.delete(`${this.apiUrl}/${id}`)
			.then(response => response.data)
			.catch(error => error);
	};

	findModelByUserId = (userId, model) => {
		// TODO: MAKE A HELPER FUNCTION
		model = model.charAt(0).toUpperCase() + model.slice(1);
		return axios
			.get(`${this.apiUrl}/find${model}ByUserId/${userId}`)
			.then(response => response.data)
			.catch(error => error);
	};

	// TODO: Have to push data for the update
	updateOne = id => {
		return axios
			.put(this.apiUrl)
			.then(response => response.data)
			.catch(error => error);
	};

	//TODO: Create databaseService for creating documents in the database
	// createOneUser = (name, email, password) => {
	// 	return axios
	// 		.post(this.apiUrl, {
	// 			name,
	// 			email,
	// 			password
	// 		})
	// 		.then(response => response.data)
	// 		.catch(error => error);
	// };
}

export default DatabaseService;
