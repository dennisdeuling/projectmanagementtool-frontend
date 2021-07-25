import React, { Component } from 'react';
import { connect } from 'react-redux';
import handleChange from '../redux/actions/changeActions';
import { handleAdd } from '../redux/actions/actionActions';

class AdminDashboard extends Component {
	componentDidMount() {}

	deleteProjectmanager = projectmanagerId => {
		// axios
		// 	.delete(`${process.env.REACT_APP_API_URL}/user/${projectmanagerId}`)
		// 	.then(
		// 		response => {
		// 			console.log(response.data);
		// 		},
		// 		error => {
		// 			console.log(error);
		// 		}
		// 	);
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
								<button
									type="button"
									className="btn btn-primary"
									onClick={event => this.deleteProjectmanager(id)}
								>
									Delete
								</button>
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
						<label htmlFor="name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							onChange={event => this.handleInputChange(event)}
						/>
					</div>
					<div className="col-md-3">
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
					<div className="col-md-3">
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
					<div className="col-md-3">
						<button type="submit" className="btn btn-primary">
							Add
						</button>
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
