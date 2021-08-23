import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleChange } from '../../redux/actions/changeActions';
import { handleAdd, handleDelete } from '../../redux/actions/actionActions';

import Button from '../partials/Button';
import Input from '../partials/Input';
import TableBody from '../partials/table/TableBody';
import TableHead from '../partials/table/TableHead';

class AdminDashboard extends Component {
	deleteProjectmanager = (id, model) => {
		const data = {id, model}
		this.props.handleDelete(data);
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
					const { _id: id, name, email } = projectmanager;
					return (
						<TableBody
							model="projectmanager"
							index={index + 1}
							id={id}
							name={name}
							email={email}
							onClick={() => this.deleteProjectmanager(id, 'projectmanager')}
						/>
					);
				}
			);
		}

		return (
			<div>
				<h1>Manage your Projectmanagers</h1>
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
		handleAdd: event => dispatch(handleAdd(event)),
		handleDelete: event => dispatch(handleDelete(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
