import React, { Component } from 'react';
import { connect } from 'react-redux';
import handleChange from '../redux/actions/changeActions';
import { handleAdd, handleDelete } from '../redux/actions/actionActions';

import Button from './partials/Button';
import Input from './partials/Input';

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
					return (
						<tr key={id}>
							<th scope="row">{index + 1}</th>
							<td>{name}</td>
							<td>{email}</td>
							<td>
								<Button
									type="button"
									buttonText="delete"
									onClick={event => this.deleteProjectmanager(id)}
								/>
							</td>
						</tr>
					);
				}
			);
		}

		return (
			<div>
				<h1>Manage your Projectmanager</h1>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>{projectmanagerTableBody}</tbody>
				</table>
				<form className="row" onSubmit={this.addNewProjectmanager}>
					<div className="col-md-3">
						<Input inputType="text"
									 label="name"
									 onChange={event => this.handleInputChange(event)}/>
					</div>
					<div className="col-md-3">
						<Input inputType="email"
									 onChange={event => this.handleInputChange(event)}/>
					</div>
					<div className="col-md-3">
						<Input inputType="password"
									 onChange={event => this.handleInputChange(event)}/>
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
		handleDelete: id => dispatch(handleDelete(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
