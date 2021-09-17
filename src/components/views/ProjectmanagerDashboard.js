import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
	AccountBox as AccountBoxIcon,
	AccountTree as AccountTreeIcon,
	List as ListIcon
} from '@material-ui/icons';
import TabPanel from '../partials/TabPanel/TabPanel';
import a11yProps from '../partials/TabPanel/a11yProps';

import TableBody from '../partials/table/TableBody';
import TableHead from '../partials/table/TableHead';
import { handleDelete } from '../../redux/actions/actionActions';
import { findByUserId } from '../../redux/actions/modelActions';
import DataTable from '../partials/table/DataTable';

const useStyles = theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper
	}
});

class ProjectmanagerDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			panelValue: 0
		};
	}

	componentDidMount() {
		const clients = { id: this.props.loggedInUser._id, model: 'client' };
		this.props.findByUserId(clients);
		const projects = { id: this.props.loggedInUser._id, model: 'project' };
		this.props.findByUserId(projects);
		const tickets = { id: this.props.loggedInUser._id, model: 'ticket' };
		this.props.findByUserId(tickets);
	}

	deleteData = (id, model) => {
		const data = { id, model };
		this.props.handleDelete(data);
	};

	changePanelValue = (event, newValue) => {
		console.log(event, newValue);
		this.setState({
			panelValue: newValue
		});
	};

	render() {
		console.log(this.state.panelValue);
		let clientsTableBody, projectsTableBody, ticketsTableBody;
		const { classes, clients, projects, tickets } = this.props;

		if (clients) {
			const { clients } = this.props;

			clientsTableBody = clients.map((client, index) => {
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
		}
		if (projects) {
			const { projects } = this.props;

			projectsTableBody = projects.map((project, index) => {
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
		}
		if (tickets) {
			ticketsTableBody = tickets.map((ticket, index) => {
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
		}

		return (
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<Tabs
						value={this.state.panelValue}
						onChange={this.changePanelValue}
						variant="scrollable"
						scrollButtons="on"
						indicatorColor="primary"
						textColor="primary"
						aria-label="scrollable force tabs example"
					>
						<Tab label="Clients" icon={<AccountBoxIcon />} {...a11yProps(0)} />
						<Tab label="Projects" icon={<AccountTreeIcon />} {...a11yProps(1)} />
						<Tab label="Tickets" icon={<ListIcon />} {...a11yProps(2)} />
					</Tabs>
				</AppBar>
				<TabPanel value={this.state.panelValue} index={0}>
					<table className="table">
						<TableHead headline={['#', 'name', 'city', 'street', 'zipcode', 'action']} />
						<tbody>{clients ? clientsTableBody : null}</tbody>
					</table>
					{clients && (
						<DataTable
							headline={[['#', 'name', 'city', 'street', 'zipcode', 'action']]}
							data={clients}
						/>
					)}
				</TabPanel>
				<TabPanel value={this.state.panelValue} index={1}>
					<table className="table">
						<TableHead headline={['#', 'title', 'description', 'tickets', 'action']} />
						<tbody>{projects ? projectsTableBody : null}</tbody>
					</table>
				</TabPanel>
				<TabPanel value={this.state.panelValue} index={2}>
					<table className="table">
						<TableHead headline={['#', 'title', 'description', 'action']} />
						<tbody>{tickets ? ticketsTableBody : null}</tbody>
					</table>
				</TabPanel>
			</div>

			// <div>
			// 	<nav>
			// 		<div className="nav nav-tabs" id="nav-tab" role="tablist">
			// 			<button
			// 				className="nav-link active"
			// 				id="nav-clients-tab"
			// 				data-bs-toggle="tab"
			// 				data-bs-target="#nav-clients"
			// 				type="button"
			// 				role="tab"
			// 				aria-controls="nav-clients"
			// 				aria-selected="true"
			// 			>
			// 				Clients
			// 			</button>
			// 			<button
			// 				className="nav-link"
			// 				id="nav-projects-tab"
			// 				data-bs-toggle="tab"
			// 				data-bs-target="#nav-projects"
			// 				type="button"
			// 				role="tab"
			// 				aria-controls="nav-projects"
			// 				aria-selected="false"
			// 			>
			// 				Projects
			// 			</button>
			// 			<button
			// 				className="nav-link"
			// 				id="nav-tickets-tab"
			// 				data-bs-toggle="tab"
			// 				data-bs-target="#nav-tickets"
			// 				type="button"
			// 				role="tab"
			// 				aria-controls="nav-tickets"
			// 				aria-selected="false"
			// 			>
			// 				Tickets
			// 			</button>
			// 		</div>
			// 	</nav>
			// 	<div className="tab-content" id="nav-tabContent">
			// 		<div
			// 			className="tab-pane fade show active"
			// 			id="nav-clients"
			// 			role="tabpanel"
			// 			aria-labelledby="nav-clients-tab"
			// 		>
			// 			<table className="table">
			// 				<TableHead headline={['#', 'name', 'city', 'street', 'zipcode', 'action']} />
			// 				<tbody>{clients ? clientsTableBody : null}</tbody>
			// 			</table>
			// 		</div>
			// 		<div
			// 			className="tab-pane fade"
			// 			id="nav-projects"
			// 			role="tabpanel"
			// 			aria-labelledby="nav-projects-tab"
			// 		>
			// 			<table className="table">
			// 				<TableHead headline={['#', 'title', 'description', 'tickets', 'action']} />
			// 				<tbody>{projects ? projectsTableBody : null}</tbody>
			// 			</table>
			// 		</div>
			// 		<div
			// 			className="tab-pane fade"
			// 			id="nav-tickets"
			// 			role="tabpanel"
			// 			aria-labelledby="nav-tickets-tab"
			// 		>
			// 			<table className="table">
			// 				<TableHead headline={['#', 'title', 'description', 'action']} />
			// 				<tbody>{tickets ? ticketsTableBody : null}</tbody>
			// 			</table>
			// 		</div>
			// 	</div>
			// </div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedInUser: state.loggedInUser,
		clients: state.clients,
		projects: state.projects,
		tickets: state.tickets
	};
};

const mapDispatchToProps = dispatch => {
	return {
		findByUserId: event => dispatch(findByUserId(event)),
		handleDelete: event => dispatch(handleDelete(event))
	};
};

export default withStyles(useStyles)(
	connect(mapStateToProps, mapDispatchToProps)(ProjectmanagerDashboard)
);
