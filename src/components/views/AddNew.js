import React, { Component } from 'react';
import Input from '../partials/Input';
import Button from '../partials/Button';
import handleChange from '../../redux/actions/changeActions';
import { handleAdd } from '../../redux/actions/actionActions';
import { connect } from 'react-redux';

class AddNew extends Component {
	addNew = event => {
		event.preventDefault();
		const model = this.props.match.path.replace(/\/|s/g, '')
		this.props.handleAdd(model);
	};
	handleInputChange = event => {
		this.props.handleChange(event);
	};

	render() {
		const { path } = this.props.match;

		switch (path) {
			case '/clients':
				return (
					<form className="row" onSubmit={this.addNew}>
						<div className="col-md-2">
							<Input
								inputType="text"
								label="name"
								onChange={event => this.handleInputChange(event)}
							/>
						</div>
						<div className="col-md-2">
							<Input
								inputType="text"
								label="city"
								onChange={event => this.handleInputChange(event)}
							/>
						</div>
						<div className="col-md-2">
							<Input
								inputType="text"
								label="street"
								onChange={event => this.handleInputChange(event)}
							/>
						</div>
						<div className="col-md-2">
							<Input
								inputType="text"
								label="zipcode"
								onChange={event => this.handleInputChange(event)}
							/>
						</div>
						<div className="col-md-2">
							<Button type="submit" buttonText="add" />
						</div>
					</form>
				);
			case '/projects':
				return (
					<form className="row" onSubmit={this.addNew}>
						<div className="col-md-4">
							<Input
								inputType="text"
								label="title"
								onChange={event => this.handleInputChange(event)}
							/>
						</div>
						<div className="col-md-6">
							<Input
								inputType="textarea"
								label="description"
								onChange={event => this.handleInputChange(event)}
							/>
						</div>
						<div className="col-md-2">
							<Button type="submit" buttonText="add" />
						</div>
					</form>
				);
			case '/tickets':
				return (
					<form className="row" onSubmit={this.addNew}>
						<div className="col-md-4">
							<Input
								inputType="text"
								label="title"
								onChange={event => this.handleInputChange(event)}
							/>
						</div>
						<div className="col-md-6">
							<Input
								inputType="textarea"
								label="description"
								onChange={event => this.handleInputChange(event)}
							/>
						</div>
						<div className="col-md-2">
							<Button type="submit" buttonText="add" />
						</div>
					</form>
				);
			default:
				break;
		}
	}
}

const mapStateToProps = state => {
	return {
		change: state.change,
		loggedInUser: state.loggedInUser
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChange: event => dispatch(handleChange(event)),
		handleAdd: event => dispatch(handleAdd(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNew);
