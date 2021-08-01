import React, { Component } from 'react';
import handleChange from '../../redux/actions/changeActions';
import { connect } from 'react-redux';

class TicketDetailView extends Component {
	render() {
		const { title, description } = this.props.ticket;
		return (
			<div>
				<h1>{title}</h1>
				<h2>{description}</h2>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { id: ticketId } = ownProps.match.params;
	const ticket = state.loggedInUser.tickets.find(
		ticket => ticket._id === ticketId
	);
	return {
		change: state.change,
		loggedInUser: state.loggedInUser,
		ticket: ticket
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChange: event => dispatch(handleChange(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetailView);
