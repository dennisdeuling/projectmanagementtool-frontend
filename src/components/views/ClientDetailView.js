import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableBody from '../partials/table/TableBody';
import TableHead from '../partials/table/TableHead';
import { handleUpdate } from '../../redux/actions/actionActions';
import { handleChange, initialChange } from '../../redux/actions/changeActions';
import Input from '../partials/Input';

class ClientDetailView extends Component {
	componentDidMount() {
		const data = {
			_id: this.props.clientView.client._id,
			name: this.props.clientView.client.name,
			street: this.props.clientView.client.address.streetAndHousenr,
			zipcode: this.props.clientView.client.address.zipCode,
			city: this.props.clientView.client.address.city
		};
		this.props.initialChange(data);
	}

	handleUpdate = event => {
		console.error('update')
		event.preventDefault();
		this.props.handleUpdate('client');
	};

	handleEdit = event => {
		this.props.handleChange(event);
	};

	handleInputChange = event => {
		this.props.handleChange(event);
	};

	render() {
		// console.log(this.props);
		const { projects, tickets } = this.props.clientView;

		const { name, street, zipcode, city } = this.props.change;

		let client;

		if (this.props.change.edit) {
			client = (
				<React.Fragment>
					<form onSubmit={this.handleUpdate}>
						<button
							type="submit"
							name="edit"
							value="false"
							className="btn btn-primary"
							onClick={event => this.handleEdit(event)}
						>
							<i className="fas fa-save" />
							Save
						</button>
						<div className="row">
							<h1>
								<Input
									inputType="text"
									label="name"
									value={name}
									onChange={event => this.handleInputChange(event)}
								/>
							</h1>
							<dl className="row">
								<dt className="col-sm-3">Address</dt>
								<dd className="col-sm-9">
									<Input
										inputType="text"
										label="street"
										value={street}
										onChange={event => this.handleInputChange(event)}
									/>
									<Input
										inputType="text"
										label="zipcode"
										value={zipcode}
										onChange={event => this.handleInputChange(event)}
									/>
									<Input
										inputType="text"
										label="city"
										value={city}
										onChange={event => this.handleInputChange(event)}
									/>
								</dd>
							</dl>
						</div>
					</form>
				</React.Fragment>
			);
		} else {
			client = (
				<React.Fragment>
					<button
						type="button"
						name="edit"
						value="true"
						className="btn btn-primary"
						onClick={event => this.handleEdit(event)}
					>
						<i className="fas fa-edit" />
						Edit
					</button>
					<div className="row">
						<h1>Company: {name}</h1>
						<dl className="row">
							<dt className="col-sm-3">Address</dt>
							<dd className="col-sm-9">
								Street: {street}, Zipcode: {zipcode}, City: {city}.
							</dd>
						</dl>
					</div>
				</React.Fragment>
			);
		}

		const projectsTableBody = projects.map((project, index) => {
			const { _id: id, title, description, tickets } = project;
			const amountOfTickets = tickets.length;
			return (
				<TableBody
					model="project"
					index={index + 1}
					id={id}
					title={title}
					description={description}
					amountOfTickets={amountOfTickets}
					onClick={() => this.deleteData(id, 'project')}
				/>
			);
		});

		const ticketsTableBody = tickets.map((ticket, index) => {
			const { _id: id, title, description } = ticket;
			return (
				<TableBody
					model="ticket"
					index={index + 1}
					id={id}
					title={title}
					description={description}
					onClick={() => this.deleteData(id, 'ticket')}
				/>
			);
		});

		return (
			<div>
				<nav>
					<div className="nav nav-tabs" id="nav-tab" role="tablist">
						<button
							className="nav-link active"
							id="nav-client-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-client"
							type="button"
							role="tab"
							aria-controls="nav-client"
							aria-selected="true"
						>
							Client Overview
						</button>
						<button
							className="nav-link"
							id="nav-contacts-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-contacts"
							type="button"
							role="tab"
							aria-controls="nav-contacts"
							aria-selected="false"
						>
							Contacts
						</button>
						<button
							className="nav-link"
							id="nav-projects-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-projects"
							type="button"
							role="tab"
							aria-controls="nav-projects"
							aria-selected="false"
						>
							Related Projects
						</button>
						<button
							className="nav-link"
							id="nav-tickets-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-tickets"
							type="button"
							role="tab"
							aria-controls="nav-tickets"
							aria-selected="false"
						>
							Related Tickets
						</button>
					</div>
				</nav>
				<div className="tab-content" id="nav-tabContent">
					<div
						className="tab-pane fade show active"
						id="nav-client"
						role="tabpanel"
						aria-labelledby="nav-client-tab"
					>
						{client}
					</div>
					<div
						className="tab-pane fade"
						id="nav-contacts"
						role="tabpanel"
						aria-labelledby="nav-contacts-tab"
					>
						This is some placeholder content the Home tab's associated content. Clicking another tab
						will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
						control the content visibility and styling. You can use it with tabs, pills, and any
						other .nav-powered navigation.
					</div>
					<div
						className="tab-pane fade"
						id="nav-projects"
						role="tabpanel"
						aria-labelledby="nav-projects-tab"
					>
						<table className="table">
							<TableHead headline={['#', 'title', 'description', 'tickets', 'action']} />
							<tbody>{projectsTableBody}</tbody>
						</table>
					</div>
					<div
						className="tab-pane fade"
						id="nav-tickets"
						role="tabpanel"
						aria-labelledby="nav-tickets-tab"
					>
						<table className="table">
							<TableHead headline={['#', 'title', 'description', 'action']} />
							<tbody>{ticketsTableBody}</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { id: clientId } = ownProps.match.params;
	const client = state.clients.find(client => client._id === clientId);

	const { projects: projectId } = client;
	const projects = state.projects.filter(project => projectId.includes(project._id));

	const ticketIds = [];
	projects.forEach(project => project.tickets.forEach(ticket => ticketIds.push(ticket)));
	const tickets = state.tickets.filter(ticket => ticketIds.includes(ticket._id));

	return {
		loggedInUser: state.loggedInUser,
		change: state.change ?? false,
		clientView: {
			client: client,
			projects: projects,
			tickets: tickets
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		initialChange: event => dispatch(initialChange(event)),
		handleChange: event => dispatch(handleChange(event)),
		handleUpdate: event => dispatch(handleUpdate(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetailView);
