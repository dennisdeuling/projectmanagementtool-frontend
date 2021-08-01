import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableBody from '../partials/table/TableBody';
import TableHead from '../partials/table/TableHead';

class ProjectmanagerDashboard extends Component {
	render() {
		const { clients, projects, tickets } = this.props.loggedInUser;

		const clientsTableBody = clients.map((client, index) => {
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
				/>
			);
		});

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
				/>
			);
		});

		return (
			<div>
				<h1>Projectmanager Dashboard</h1>
				<br />
				<h3>Clients</h3>
				<table className="table">
					<TableHead
						headline={['#', 'name', 'city', 'street', 'zipcode', 'action']}
					/>
					<tbody>{clientsTableBody}</tbody>
				</table>
				<br />
				<h3>Projects</h3>
				<table className="table">
					<TableHead
						headline={['#', 'title', 'description', 'tickets', 'action']}
					/>
					<tbody>{projectsTableBody}</tbody>
				</table>
				<br />
				<h3>Tickets</h3>
				<table className="table">
					<TableHead headline={['#', 'title', 'description', 'action']} />
					<tbody>{ticketsTableBody}</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedInUser: state.loggedInUser
	};
};

export default connect(mapStateToProps)(ProjectmanagerDashboard);
