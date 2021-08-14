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
		const { projects } = this.props;

		const projectsTableBody = projects.map((project, index) => {
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

		return (
			<div>
				<h3>Projects</h3>
				<table className="table">
					<TableHead
						headline={['#', 'title', 'description', 'tickets', 'action']}
					/>
					<tbody>{projectsTableBody}</tbody>
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
		projects: state.projects
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
