import React, { Component } from 'react';
import { connect } from 'react-redux';
import handleChange from '../redux/actions/changeActions';
import fetchUser from '../redux/actions/authActions';

class Login extends Component {
	handleInputChange = event => {
		this.props.handleChange(event.target);
	};

	handleFormSubmit = event => {
		event.preventDefault();

		this.props.fetchUser();
		this.props.history.push('/dashboard');
	};

	render() {
		console.log(this.props);
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

const mapStateToProps = state => {
	console.log('STATE');
	console.log(state);
	return {
		change: state.change,
		loggedInUser: state.loggedInUser
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChange: event => dispatch(handleChange(event)),
		fetchUser: event => dispatch(fetchUser(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
