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
				<h1>Projectmanager Dashboard</h1>
				<br />
				<h3>Clients</h3>
				<table className="table">
					<TableHead
						headline={['#', 'name', 'city', 'street', 'zipcode', 'action']}
					/>
					<tbody>{clients ? clientsTableBody : null}</tbody>
				</table>
				<br />
				<h3>Projects</h3>
				<table className="table">
					<TableHead
						headline={['#', 'title', 'description', 'tickets', 'action']}
					/>
					<tbody>{projects ? projectsTableBody : null}</tbody>
				</table>
				<br />
				<h3>Tickets</h3>
				<table className="table">
					<TableHead headline={['#', 'title', 'description', 'action']} />
					<tbody>{tickets ? ticketsTableBody : null}</tbody>
				</table>
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
