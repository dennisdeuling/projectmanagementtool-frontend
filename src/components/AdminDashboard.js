import React, { Component } from 'react';
import { connect } from 'react-redux';
import handleChange from '../redux/actions/changeActions';

class AdminDashboard extends Component {

	componentDidMount() {}

	saveProjectmanager = projectmanager => {
		// const { id, name, email } = projectmanager;
		//
		// axios
		// 	.put(
		// 		`${process.env.REACT_APP_API_URL}/user/${id}`,
		// 		{
		// 			name,
		// 			email
		// 		},
		// 		{
		// 			withCredentials: true
		// 		}
		// 	)
		// 	.then(
		// 		response => {
		// 			const newProjectmanagers = this.state.projectmanagers.map(
		// 				projectmanager => {
		// 					if (projectmanager.id === id) {
		// 						projectmanager.edit = false;
		// 					}
		// 					return projectmanager;
		// 				}
		// 			);
		// 			this.setState({
		// 				projectmanagers: [...newProjectmanagers]
		// 			});
		// 		},
		// 		error => {
		// 			console.log(error);
		// 		}
		// 	);
	};

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

	handleInputChange = (event, projectmanagerId) => {
		// const { name, value } = event.target;
		// console.log(name, value, projectmanagerId);
		// if (projectmanagerId) {
		// 	const newProjectmanagers = this.state.projectmanagers.map(
		// 		projectmanager => {
		// 			if (projectmanager.id === projectmanagerId) {
		// 				projectmanager.name = name === 'name' ? value : projectmanager.name;
		// 				projectmanager.email =
		// 					name === 'email' ? value : projectmanager.email;
		// 			}
		// 			return projectmanager;
		// 		}
		// 	);
		//
		// 	this.setState({
		// 		projectmanagers: [...newProjectmanagers]
		// 	});
		// }
		//
		// if (!projectmanagerId) {
		// 	this.setState({
		// 		loggedInUser: { ...this.state.loggedInUser },
		// 		projectmanagers: [...this.state.projectmanagers],
		// 		newProjectmanager: {
		// 			...this.state.newProjectmanager,
		// 			[name]: value
		// 		}
		// 	});
		// }
	};

	addNewProjectmanager = event => {
		// const { name, email, password } = this.state.newProjectmanager;
		// event.preventDefault();
		//
		// axios
		// 	.post(
		// 		`${process.env.REACT_APP_API_URL}/user/create`,
		// 		{
		// 			name,
		// 			email,
		// 			password
		// 		},
		// 		{ withCredentials: true }
		// 	)
		// 	.then(
		// 		response => {
		// 			const { _id: id, name, email } = response.data;
		// 			this.setState({
		// 				newProjectmanager: {
		// 					id,
		// 					name,
		// 					email
		// 				}
		// 			});
		// 		},
		// 		error => {
		// 			console.log(error);
		// 		}
		// 	);
		//
		// axios
		// 	.put(
		// 		`${process.env.REACT_APP_API_URL}/user/${this.state.loggedInUser.id}`,
		// 		{
		// 			$push: {
		// 				projectmanagers: this.state.newProjectmanager.id
		// 			}
		// 		},
		// 		{
		// 			withCredentials: true
		// 		}
		// 	)
		// 	.then(
		// 		response => {
		// 			console.log(response.data);
		// 		},
		// 		error => {
		// 			console.log(error);
		// 		}
		// 	);
	};

	render() {
		console.log(this.props);

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
							onChange={event => this.props.handleChange(event)}
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
							onChange={event => this.props.handleChange(event)}
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
							onChange={event => this.props.handleChange(event)}
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
		loggedInUser: state.loggedInUser,
		projectmanagers: state.projectmanagers
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChange: event => dispatch(handleChange(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
