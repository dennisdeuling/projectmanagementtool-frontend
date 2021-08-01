import React, { Component } from 'react';
import handleChange from '../../redux/actions/changeActions';
import { connect } from 'react-redux';

class ProjectDetailView extends Component {
	render() {
		const { title, description } = this.props.project;
		return (
			<div>
				<h1>{title}</h1>
				<h2>{description}</h2>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { id: projectId } = ownProps.match.params;
	const project = state.loggedInUser.projects.find(
		project => project._id === projectId
	);
	return {
		change: state.change,
		loggedInUser: state.loggedInUser,
		project: project
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChange: event => dispatch(handleChange(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailView);
