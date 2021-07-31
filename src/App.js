import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthService from './services/auth.service';

import Login from './components/views/Login';
import AdminDashboard from './components/views/AdminDashboard';
import ProjectmanagerDetailView from './components/views/ProjectmanagerDetailView';
import ProjectmanagerDashboard from './components/views/ProjectmanagerDashboard';

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

		let renderPosition;

		if (this.props.loggedInUser) {
			const { position } = this.props.loggedInUser;
			switch (position) {
				case 'admin':
					renderPosition = (
						<Route exact path="/dashboard" component={AdminDashboard} />
					);
					break;
				case 'projectmanager':
					renderPosition = (
						<Route exact path="/dashboard" component={ProjectmanagerDashboard} />
					);
					break;
				default:
					break;
			}
		}
		return (
			<div className="App">
				<Switch>
					<Route exact path="/">
						<Redirect to="login" />
					</Route>
					{renderPosition}
					<Route
						exact
						path="/projectmanager/:id"
						component={ProjectmanagerDetailView}
					/>
					<Route
						exact
						path="/client/:id"
						component={ProjectmanagerDetailView}
					/>
					<Route
						exact
						path="/project/:id"
						component={ProjectmanagerDetailView}
					/>
					<Route
						exact
						path="/ticket/:id"
						component={ProjectmanagerDetailView}
					/>


					<Route exact path="/login" component={Login} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedInUser: state.loggedInUser
	};
};

export default connect(mapStateToProps)(App);
