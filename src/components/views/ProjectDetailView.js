import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableBody from '../partials/table/TableBody';
import TableHead from '../partials/table/TableHead';

class ClientDetailView extends Component {
	render() {
		console.log(this.props.projectView);

		const { tickets } = this.props.projectView;

		const { title, description } = this.props.projectView.project;

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
							id="nav-project-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-project"
							type="button"
							role="tab"
							aria-controls="nav-project"
							aria-selected="true"
						>
							Project Overview
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
						id="nav-project"
						role="tabpanel"
						aria-labelledby="nav-project-tab"
					>
						<div className="row">
							<h1>Title: {title}</h1>
							<dl className="row">
								<dt className="col-sm-3">Description</dt>
								<dd className="col-sm-9">
									{description}
								</dd>
							</dl>
						</div>
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

	const { id: projectId } = ownProps.match.params;
	const project = state.projects.find(project => project._id === projectId);

	const {tickets: ticketId} = project;
	const tickets = state.tickets.filter(ticket => ticketId.includes(ticket._id))

	return {
		loggedInUser: state.loggedInUser,
		projectView: {
			project: project,
			tickets: tickets
		}
	};
};

export default connect(mapStateToProps)(ClientDetailView);
