import React, { Component } from 'react';
import handleChange from '../../redux/actions/changeActions';
import { connect } from 'react-redux';

class ClientDetailView extends Component {
	render() {
		console.log(this.props);
		const { name } = this.props.client;
		const {
			streetAndHousenr: street,
			zipCode,
			city
		} = this.props.client.address;
		return (
			<div>
				<h1>{name}</h1>
				<h2>Address</h2>
				<h3>ZipCode</h3>
				<h4>{zipCode}</h4>
				<h3>City</h3>
				<h4>{city}</h4>
				<h3>Street</h3>
				<h4>{street}</h4>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { id: clientId } = ownProps.match.params;
	const client = state.loggedInUser.clients.find(
		client => client._id === clientId
	);
	return {
		change: state.change,
		loggedInUser: state.loggedInUser,
		client: client
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChange: event => dispatch(handleChange(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetailView);
