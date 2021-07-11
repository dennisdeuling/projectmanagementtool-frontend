import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
			this.service.isLoggedIn().then(
				userObj => {
					this.setState({
						loggedInUser: userObj
					});
				},
				error => {
					this.setState({
						loggedInUser: null
					});
					console.log(error);
				}
			);
		}

	getTheUser = userObj => {
		this.setState({
			loggedInUser: userObj
		});
	};

	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/">
						<Redirect to="login" />
					</Route>
					<Route
						exact
						path="/dashboard"
						render={props => (
							<AdminDashboard
								{...props}
								loggedInUser={this.state.loggedInUser}
							/>
						)}
					/>

					<Route
						exact
						path="/login"
						render={props => <Login {...props} getUser={this.getTheUser} />}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
