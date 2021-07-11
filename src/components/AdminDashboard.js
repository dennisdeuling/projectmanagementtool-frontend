import React, { Component } from 'react';
import axios from 'axios';

class AdminDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: null,
			projectmanagers: []
		};
	}

	componentDidMount() {
		const { _id: id } = this.props.loggedInUser;
		axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`).then(
			response => {
				const {
					_id: id,
					name,
					email,
					position,
					projectmanagers
				} = response.data;
				const newProjectmanagers = projectmanagers.map(projectmanager => {
					const { _id: id, name, email } = projectmanager;
					const newProjectmanager = {
						id,
						name,
						email
					};
					newProjectmanager.edit = false;
					return newProjectmanager;
				});

				this.setState({
					loggedInUser: {
						id,
						name,
						email,
						position
					},
					projectmanagers: [...newProjectmanagers]
				});
			},
			error => {
				console.log(error);
			}
		);
	}

	editProjectmanager = projectmanagerId => {
		const editProjectmanager = this.state.projectmanagers.map(
			projectmanager => {
				const { id, name, email } = projectmanager;
				const newProjectmanager = {
					id,
					name,
					email,
					edit: projectmanager.id === projectmanagerId
				};
				return newProjectmanager;
			}
		);
		this.setState({
			projectmanagers: [...editProjectmanager]
		});
	};

	saveProjectmanager = projectmanager => {
		const { id, name, email } = projectmanager;

		axios
			.put(
				`${process.env.REACT_APP_API_URL}/user/${id}`,
				{
					name,
					email
				},
				{
					withCredentials: true
				}
			)
			.then(
				response => {
					const newProjectmanagers = this.state.projectmanagers.map(
						projectmanager => {
							if (projectmanager.id === id) {
								projectmanager.edit = false;
							}
							return projectmanager;
						}
					);
					this.setState({
						projectmanagers: [...newProjectmanagers]
					});
				},
				error => {
					console.log(error);
				}
			);
	};

	deleteProjectmanager = projectmanagerId => {
		axios
			.delete(`${process.env.REACT_APP_API_URL}/user/${projectmanagerId}`)
			.then(
				response => {
					console.log(response.data);
				},
				error => {
					console.log(error);
				}
			);
	};

	handleInputChange = (event, projectmanagerId) => {
		const { name, value } = event.target;
		console.log(name, value, projectmanagerId);
		if (projectmanagerId) {
			const newProjectmanagers = this.state.projectmanagers.map(
				projectmanager => {
					if (projectmanager.id === projectmanagerId) {
						projectmanager.name = name === 'name' ? value : projectmanager.name;
						projectmanager.email =
							name === 'email' ? value : projectmanager.email;
					}
					return projectmanager;
				}
			);

			this.setState({
				projectmanagers: [...newProjectmanagers]
			});
		}

		if (!projectmanagerId) {
			this.setState({
				loggedInUser: { ...this.state.loggedInUser },
				projectmanagers: [...this.state.projectmanagers],
				newProjectmanager: {
					...this.state.newProjectmanager,
					[name]: value
				}
			});
		}
	};

	addNewProjectmanager = event => {
		const { name, email, password } = this.state.newProjectmanager;
		event.preventDefault();

		axios
			.post(
				`${process.env.REACT_APP_API_URL}/user/create`,
				{
					name,
					email,
					password
				},
				{ withCredentials: true }
			)
			.then(
				response => {
					const { _id: id, name, email } = response.data;
					this.setState({
						newProjectmanager: {
							id,
							name,
							email
						}
					});
				},
				error => {
					console.log(error);
				}
			);

		axios
			.put(
				`${process.env.REACT_APP_API_URL}/user/${this.state.loggedInUser.id}`,
				{
					$push: {
						projectmanagers: this.state.newProjectmanager.id
					}
				},
				{
					withCredentials: true
				}
			)
			.then(
				response => {
					console.log(response.data);
				},
				error => {
					console.log(error);
				}
			);
	};

	render() {
		console.log(this.state);
		let projectmanagerTableBody;

		projectmanagerTableBody = this.state.projectmanagers.map(
			(projectmanager, index) => {
				const { id, name, email, edit } = projectmanager;
				if (edit) {
					return (
						<tr key={id}>
							<th scope="row">{index + 1}</th>
							<td>
								<input
									type="text"
									className="form-control"
									id="name"
									name="name"
									value={name}
									onChange={event => this.handleInputChange(event, id)}
								/>
							</td>
							<td>
								<input
									type="email"
									className="form-control"
									id="email"
									name="email"
									value={email}
									onChange={event => this.handleInputChange(event, id)}
								/>
							</td>
							<td>
								<button
									type="button"
									className="btn btn-primary"
									value="false"
									onClick={event => this.saveProjectmanager(projectmanager)}
								>
									Save
								</button>
							</td>
						</tr>
					);
				} else {
					return (
						<tr key={id}>
							<th scope="row">{index + 1}</th>
							<td>{name}</td>
							<td>{email}</td>
							<td>
								<button
									type="button"
									className="btn btn-primary"
									value="true"
									onClick={event => this.editProjectmanager(id)}
								>
									Edit
								</button>
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
			}
		);

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

export default AdminDashboard;
