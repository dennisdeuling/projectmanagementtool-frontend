import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchModel } from '../../redux/actions/modelActions';

class ClientDetailView extends Component {
	componentDidMount() {
		const data = { idArray: this.props.client.projects, model: 'project' };
		this.props.fetchModel(data);
	}

	render() {
		const { name } = this.props.client;
		const {
			streetAndHousenr: street,
			zipCode,
			city
		} = this.props.client.address;

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
							Overview
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
						This is some placeholder content the Home tab's associated content.
						Clicking another tab will toggle the visibility of this one for the
						next. The tab JavaScript swaps classes to control the content
						visibility and styling. You can use it with tabs, pills, and any
						other .nav-powered navigation.
					</div>
					<div
						className="tab-pane fade"
						id="nav-tickets"
						role="tabpanel"
						aria-labelledby="nav-tickets-tab"
					>
						This is some placeholder content the Home tab's associated content.
						Clicking another tab will toggle the visibility of this one for the
						next. The tab JavaScript swaps classes to control the content
						visibility and styling. You can use it with tabs, pills, and any
						other .nav-powered navigation.
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { id: clientId } = ownProps.match.params;

	const client = state.clients.find(client => client._id === clientId);
	return {
		change: state.change,
		loggedInUser: state.loggedInUser,
		client: client
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchModel: event => dispatch(fetchModel(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetailView);
