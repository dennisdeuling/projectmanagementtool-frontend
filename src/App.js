import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthService from './services/auth.service';

import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';


class App extends Component {
	service = new AuthService();

	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: null
		};
	}

	componentDidMount() {
		// this.service.isLoggedIn().then(
		// 	userObj => {
		// 		this.setState({
		// 			loggedInUser: userObj
		// 		});
		// 	},
		// 	error => {
		// 		this.setState({
		// 			loggedInUser: null
		// 		});
		// 		console.log(error);
		// 	}
		// );
	}

	getTheUser = userObj => {
		// this.setState({
		// 	loggedInUser: userObj
		// });
	};

	render() {
		console.log(this.props);
		return (
			<div className="App">
				<Switch>
					<Route exact path="/">
						<Redirect to="login" />
					</Route>
					<Route
						exact
						path="/dashboard"
						component={AdminDashboard} />

					<Route exact
								 path="/login"
								 component={Login} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// loggedInUser: state.loggedInUser,
		// projectmanagers: state.projectmanagers
	};
};

export default connect(mapStateToProps)(App);
