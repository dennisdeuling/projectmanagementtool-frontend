import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableBody from '../partials/table/TableBody';
import TableHead from '../partials/table/TableHead';
import { handleChange, initialChange } from '../../redux/actions/changeActions';
import { handleUpdate } from '../../redux/actions/actionActions';
import Input from '../partials/Input';

class ClientDetailView extends Component {
	componentDidMount() {
		const data = {
			model: 'project',
			_id: this.props.projectView.project._id,
			title: this.props.projectView.project.title,
			description: this.props.projectView.project.description
		};
		this.props.initialChange(data);
	}
	handleUpdate = event => {
		event.preventDefault();
		this.props.handleUpdate('project');
	};

	handleEdit = event => {
		this.props.handleChange(event);
	};

	handleInputChange = event => {
		this.props.handleChange(event);
	};

	render() {
		const { tickets } = this.props.projectView;

		const { title, description } = this.props.change;

		let project;

		if (this.props.change.edit) {
			project = (
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
			project = (
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
						{project}
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

	const { tickets: ticketId } = project;
	const tickets = state.tickets.filter(ticket => ticketId.includes(ticket._id));

	return {
		loggedInUser: state.loggedInUser,
		change: state.change ?? false,
		projectView: {
			project: project,
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
