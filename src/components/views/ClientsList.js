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
		const { clients } = this.props;
		console.log(this.props)

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
					onClick={() => this.deleteData(id, 'client')}
				/>
			);
		});

		return (
			<div>
				<h3>Clients</h3>
				<table className="table">
					<TableHead
						headline={['#', 'name', 'city', 'street', 'zipcode', 'action']}
					/>
					<tbody>{clientsTableBody}</tbody>
				</table>
				<hr />
				<AddNew match={this.props.match}/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedInUser: state.loggedInUser,
		clients: state.clients
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
