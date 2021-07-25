import React, { Component } from 'react';
import { connect } from 'react-redux';
import handleChange from '../redux/actions/changeActions';
import { handleAdd, handleDelete } from '../redux/actions/actionActions';

import Button from './partials/Button';
import Input from './partials/Input';
import TableBody from './partials/table/TableBody';
import TableHead from './partials/table/TableHead';

class AdminDashboard extends Component {
	componentDidMount() {}

	deleteProjectmanager = id => {
		this.props.handleDelete(id);
	};

	handleInputChange = event => {
		this.props.handleChange(event);
	};

	addNewProjectmanager = event => {
		event.preventDefault();
		this.props.handleAdd(event);
	};

	render() {
		let projectmanagerTableBody;

		if (this.props.projectmanagers) {
			projectmanagerTableBody = this.props.projectmanagers.map(
				(projectmanager, index) => {
					const { id, name, email } = projectmanager;
					console.log(id)
					return (
						<TableBody
							index={index + 1}
							id={id}
							name={name}
							email={email}
							onClick={id => this.deleteProjectmanager(id)}
						/>
					);
				}
			);
		}

		return (
			<div>
				<h1>Manage your Projectmanager</h1>
				<table className="table">
					<TableHead headline={['#', 'name', 'email', 'action']} />
					<tbody>{projectmanagerTableBody}</tbody>
				</table>
				<form className="row" onSubmit={this.addNewProjectmanager}>
					<div className="col-md-3">
						<Input
							inputType="text"
							label="name"
							onChange={event => this.handleInputChange(event)}
						/>
					</div>
					<div className="col-md-3">
						<Input
							inputType="email"
							onChange={event => this.handleInputChange(event)}
						/>
					</div>
					<div className="col-md-3">
						<Input
							inputType="password"
							onChange={event => this.handleInputChange(event)}
						/>
					</div>
					<div className="col-md-3">
						<Button type="submit" buttonText="add" />
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		change: state.change,
		loggedInUser: state.loggedInUser,
		projectmanagers: state.projectmanagers
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChange: event => dispatch(handleChange(event)),
		handleAdd: event => dispatch(handleAdd(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
