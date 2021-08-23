import React, { Component } from 'react';
import { handleChange } from '../../redux/actions/changeActions';
import { connect } from 'react-redux';

class ProjectmanagerDetailView extends Component {
	render() {
		return (
			<div>
				<h1>{this.props.projectmanager.name}</h1>
				<h3>{this.props.projectmanager.email}</h3>
				<h3>{this.props.projectmanager.position}</h3>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { id: projectmanagerId } = ownProps.match.params;
	const projectmanager = state.projectmanagers.find(
		projectmanager => projectmanager.id === projectmanagerId
	);
	return {
		change: state.change,
		loggedInUser: state.loggedInUser,
		projectmanager: projectmanager
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChange: event => dispatch(handleChange(event))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectmanagerDetailView);
