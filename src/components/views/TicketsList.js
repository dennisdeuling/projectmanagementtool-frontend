import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableBody from '../partials/table/TableBody';
import TableHead from '../partials/table/TableHead';
import { handleDelete } from '../../redux/actions/actionActions';
import AddNew from './AddNew';

class ProjectmanagerDashboard extends Component {
	deleteData = (id, model) => {
		const data = { id, model };
		this.props.handleDelete(data);
	};

	render() {
		const { tickets } = this.props;

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
				<h3>Tickets</h3>
				<table className="table">
					<TableHead headline={['#', 'title', 'description', 'action']} />
					<tbody>{ticketsTableBody}</tbody>
				</table>
				<hr />
				<AddNew match={this.props.match} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedInUser: state.loggedInUser,
		tickets: state.tickets
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleDelete: event => dispatch(handleDelete(event))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectmanagerDashboard);
