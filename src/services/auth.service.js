import axios from 'axios';

class AuthService {
	constructor() {
		this.service = axios.create({
			//baseURL: `${process.env.REACT_APP_API_URL}/auth`,
			withCredentials: true
		});
	}

	signup = (email, password) => {
		return this.service
			.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
				email,
				password
			})
			.then(response => response.data)
			.catch(error => console.log(error));
	};

	login = (email, password) => {
		return this.service
			.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
				email,
				password
			})
			.then(response => response.data)
			.catch(error => console.log(error));
	};

	isLoggedIn = () => {
		return this.service
			.post(`${process.env.REACT_APP_API_URL}/auth/loggedin`)
			.then(response => response.data)
			.catch(error => console.log(error));
	};

	logout = () => {
		return this.service
			.post(`${process.env.REACT_APP_API_URL}/auth/logout`)
			.then(response => response.data)
			.catch(error => console.log(error));
	};
}

export default AuthService;
