import React, { Component } from 'react';
import AuthService from '../services/auth.service';

class Login extends Component {
	service = new AuthService();

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleInputChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();

		const { email, password } = this.state;

		this.service.login(email, password).then(
			response => {
				this.setState({
					email: '',
					password: ''
				});
				this.props.getUser(response);
				this.props.history.push('/dashboard');
			},
			error => console.log(error)
		);
	};

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<fieldset>
					<legend>Login</legend>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							onChange={event => this.handleInputChange(event)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							onChange={event => this.handleInputChange(event)}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</fieldset>
			</form>
		);
	}
}

export default Login;
