import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableBody from '../partials/table/TableBody';
import TableHead from '../partials/table/TableHead';

class ClientDetailView extends Component {
	render() {
		const { projects, tickets } = this.props.clientView;

		const { name } = this.props.clientView.client;
		const {
			streetAndHousenr: street,
			zipCode,
			city
		} = this.props.clientView.client.address;

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
							id="nav-overview-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-overview"
							type="button"
							role="tab"
							aria-controls="nav-overview"
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
						id="nav-overview"
						role="tabpanel"
						aria-labelledby="nav-overview-tab"
					>
						<div className="row">
							<h1>Company: {name}</h1>
							<dl className="row">
								<dt className="col-sm-3">Address</dt>
								<dd className="col-sm-9">
									Street: {street}, Zipcode: {zipCode}, City: {city}.
								</dd>
							</dl>
						</div>
					</div>
					<div
						className="tab-pane fade"
						id="nav-contacts"
						role="tabpanel"
						aria-labelledby="nav-contacts-tab"
					>
						This is some placeholder content the Home tab's associated content.
						Clicking another tab will toggle the visibility of this one for the
						next. The tab JavaScript swaps classes to control the content
						visibility and styling. You can use it with tabs, pills, and any
						other .nav-powered navigation.
					</div>
					<div
						className="tab-pane fade"
						id="nav-projects"
						role="tabpanel"
						aria-labelledby="nav-projects-tab"
					>
						<table className="table">
							<TableHead
								headline={['#', 'title', 'description', 'tickets', 'action']}
							/>
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
	const projects = state.projects.filter(project =>
		projectId.includes(project._id)
	);

	const ticketIds = [];
	projects.forEach(project =>
		project.tickets.forEach(ticket => ticketIds.push(ticket))
	);
	const tickets = state.tickets.filter(ticket =>
		ticketIds.includes(ticket._id)
	);

	return {
		loggedInUser: state.loggedInUser,
		clientView: {
			client: client,
			projects: projects,
			tickets: tickets
		}
	};
};

export default connect(mapStateToProps)(ClientDetailView);
