import React, { Component } from 'react';
import { connect } from 'react-redux';
import handleChange from '../../redux/actions/changeActions';
import fetchUser from '../../redux/actions/authActions';

import Button from '../partials/Button';
import Input from '../partials/Input';

class Login extends Component {
	handleInputChange = event => {
		this.props.handleChange(event);
	};

	handleFormSubmit = event => {
		event.preventDefault();
		this.props.fetchUser();
		this.props.history.push('/dashboard');
	};

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<fieldset>
					<legend>Login</legend>
					<div className="mb-3">
						<Input inputType="email"
									 onChange={event => this.handleInputChange(event)}/>
					</div>
					<div className="mb-3">
						<Input inputType="password"
						onChange={event => this.handleInputChange(event)}/>
					</div>
					<Button type="submit" buttonText="Submit" />
				</fieldset>
			</form>
		);
	}
}

const mapStateToProps = state => {
	return {
		change: state.change
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChange: event => dispatch(handleChange(event)),
		fetchUser: event => dispatch(fetchUser(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
