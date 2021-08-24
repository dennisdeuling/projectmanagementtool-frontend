import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../partials/Input';
import { handleChange, initialChange } from '../../redux/actions/changeActions';
import { handleUpdate } from '../../redux/actions/actionActions';

class TicketDetailView extends Component {
	componentDidMount() {
		const data = {
			model: 'ticket',
			_id: this.props.ticketView.ticket._id,
			title: this.props.ticketView.ticket.title,
			description: this.props.ticketView.ticket.description
		};
		this.props.initialChange(data);
	}

	handleUpdate = event => {
		event.preventDefault();
		this.props.handleUpdate('ticket');
	};

	handleEdit = event => {
		this.props.handleChange(event);
	};

	handleInputChange = event => {
		this.props.handleChange(event);
	};

	render() {
		const { title, description } = this.props.change;

		let ticket;

		if (this.props.change.edit) {
			ticket = (
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
									label="title"
									value={title}
									onChange={event => this.handleInputChange(event)}
								/>
							</h1>
							<dl className="row">
								<dt className="col-sm-3">Description</dt>
								<dd className="col-sm-9">
									<Input
										inputType="text"
										label="description"
										value={description}
										onChange={event => this.handleInputChange(event)}
									/>
								</dd>
							</dl>
						</div>
					</form>
				</React.Fragment>
			);
		} else {
			ticket = (
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
						<h1>Title: {title}</h1>
						<dl className="row">
							<dt className="col-sm-3">Description</dt>
							<dd className="col-sm-9">{description}</dd>
						</dl>
					</div>
				</React.Fragment>
			);
		}

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
						{ticket}
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
		change: state.change ?? false,
		ticketView: {
			ticket: ticket
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

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetailView);
