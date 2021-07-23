import axios from 'axios';
import AuthService from '../../services/auth.service';

const fetchUser = () => async (dispatch, getState) => {
	dispatch({
		type: 'FETCH_USER_REQUEST'
	});

	try {
		const { email, password } = getState().change;
		let service = new AuthService();

		const login = await service.login(email, password);
		const user = await axios.get(
			`${process.env.REACT_APP_API_URL}/user/${login._id}`
		);
		console.log(user.data);

		const projectmanager = user.data.projectmanagers.map(projectmanager => {
			const {_id: id, name, email, position } = projectmanager
			return {
				id,
				name,
				email,
				position,
				edit: false
			}
		})
		dispatch({
			type: 'FETCH_USER_SUCCESS',
			payload: {
				user: user.data,
				projectmanagers: [...projectmanager]
			}
		});
	} catch (error) {
		dispatch({
			type: 'FETCH_USER_FAILURE',
			payload: {
				error
			}
		});
	}
};

export default fetchUser;
