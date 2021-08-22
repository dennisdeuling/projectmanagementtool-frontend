import React, { Component } from 'react';
import { connect } from 'react-redux';

class ClientDetailView extends Component {
	render() {
		const { title, description } = this.props.ticketView.ticket;

		return (
			<div>
				<nav>
					<div className="nav nav-tabs" id="nav-tab" role="tablist">
						<button
							className="nav-link active"
							id="nav-ticket-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-ticket"
							type="button"
							role="tab"
							aria-controls="nav-ticket"
							aria-selected="true"
						>
							Ticket Overview
						</button>
					</div>
				</nav>
				<div className="tab-content" id="nav-tabContent">
					<div
						className="tab-pane fade show active"
						id="nav-ticket"
						role="tabpanel"
						aria-labelledby="nav-ticket-tab"
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
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { id: ticketId } = ownProps.match.params;
	const ticket = state.tickets.find(ticket => ticket._id === ticketId);

	return {
		loggedInUser: state.loggedInUser,
		ticketView: {
			ticket: ticket
		}
	};
};

export default connect(mapStateToProps)(ClientDetailView);
