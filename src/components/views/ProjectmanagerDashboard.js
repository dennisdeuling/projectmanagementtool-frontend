import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableBody from '../partials/table/TableBody';
import TableHead from '../partials/table/TableHead';
import { handleDelete } from '../../redux/actions/actionActions';
import { findByUserId } from '../../redux/actions/modelActions';

class ProjectmanagerDashboard extends Component {
	componentDidMount() {
		const clients = { id: this.props.loggedInUser._id, model: 'client' };
		this.props.findByUserId(clients);
		const projects = { id: this.props.loggedInUser._id, model: 'project' };
		this.props.findByUserId(projects);
		const tickets = { id: this.props.loggedInUser._id, model: 'ticket' };
		this.props.findByUserId(tickets);
	}

	deleteData = (id, model) => {
		const data = { id, model };
		this.props.handleDelete(data);
	};

	render() {
		let clientsTableBody, projectsTableBody, ticketsTableBody;
		const { clients, projects, tickets } = this.props;

		if (clients) {
			const { clients } = this.props;

			clientsTableBody = clients.map((client, index) => {
				const { _id: id, name } = client;
				const { zipCode, city, streetAndHousenr: street } = client.address;
				return (
					<TableBody
						model="client"
						index={index + 1}
						id={id}
						name={name}
						zipcode={zipCode}
						city={city}
						street={street}
						onClick={() => this.deleteData(id, 'client')}
					/>
				);
			});
		}
		if (projects) {
			const { projects } = this.props;

			projectsTableBody = projects.map((project, index) => {
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
		}
		if (tickets) {
			ticketsTableBody = tickets.map((ticket, index) => {
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
		}

		return (
			<div>
				<nav>
					<div className="nav nav-tabs" id="nav-tab" role="tablist">
						<button
							className="nav-link active"
							id="nav-clients-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-clients"
							type="button"
							role="tab"
							aria-controls="nav-clients"
							aria-selected="true"
						>
							Clients
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
							Projects
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
							Tickets
						</button>
					</div>
				</nav>
				<div className="tab-content" id="nav-tabContent">
					<div
						className="tab-pane fade show active"
						id="nav-clients"
						role="tabpanel"
						aria-labelledby="nav-clients-tab"
					>
						<table className="table">
							<TableHead headline={['#', 'name', 'city', 'street', 'zipcode', 'action']} />
							<tbody>{clients ? clientsTableBody : null}</tbody>
						</table>
					</div>
					<div
						className="tab-pane fade"
						id="nav-projects"
						role="tabpanel"
						aria-labelledby="nav-projects-tab"
					>
						<table className="table">
							<TableHead headline={['#', 'title', 'description', 'tickets', 'action']} />
							<tbody>{projects ? projectsTableBody : null}</tbody>
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
							<tbody>{tickets ? ticketsTableBody : null}</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedInUser: state.loggedInUser,
		clients: state.clients,
		projects: state.projects,
		tickets: state.tickets
	};
};

const mapDispatchToProps = dispatch => {
	return {
		findByUserId: event => dispatch(findByUserId(event)),
		handleDelete: event => dispatch(handleDelete(event))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectmanagerDashboard);
