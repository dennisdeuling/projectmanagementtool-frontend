import React, { Component } from 'react';
import { handleChange, initialChange } from '../../redux/actions/changeActions';
import { handleUpdate } from '../../redux/actions/actionActions';
import { connect } from 'react-redux';
import Input from '../partials/Input';

class UserProfile extends Component {
	componentDidMount() {
		const data = {
			model: 'user',
			_id: this.props.loggedInUser._id,
			name: this.props.loggedInUser.name,
			email: this.props.loggedInUser.email
		};
		this.props.initialChange(data);
	}
	handleUpdate = event => {
		event.preventDefault();
		this.props.handleUpdate('user');
	};

	handleEdit = event => {
		this.props.handleChange(event);
	};
	handleInputChange = event => {
		this.props.handleChange(event);
	};

	render() {
		const { email, name } = this.props.change;

		let myProfile;

		if (this.props.change.edit) {
			myProfile = (
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
						<img src="https://via.placeholder.com/150" className="rounded float-start" alt="..." />
						<div className="row">
							<h1>
								<Input
									inputType="text"
									label="name"
									value={name}
									onChange={event => this.handleInputChange(event)}
								/>
							</h1>
							<dl className="row">
								<dt className="col-sm-3">Email</dt>
								<dd className="col-sm-9">
									<Input
										inputType="email"
										label="email"
										value={email}
										onChange={event => this.handleInputChange(event)}
									/>
								</dd>
							</dl>
						</div>
					</form>
				</React.Fragment>
			);
		} else {
			myProfile = (
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
					<img src="https://via.placeholder.com/150" className="rounded float-start" alt="..." />
					<div className="row">
						<h1>{name}</h1>
						<dl className="row">
							<dt className="col-sm-3">Email</dt>
							<dd className="col-sm-9">{email}</dd>
						</dl>
					</div>
				</React.Fragment>
			);
		}


		return (
			<div>
				<nav>
					<div className="nav nav-tabs" id="nav-tab" role="tablist">
						<button
							className="nav-link active"
							id="nav-company-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-company"
							type="button"
							role="tab"
							aria-controls="nav-company"
							aria-selected="true"
						>
							My Company
						</button>
						<button
							className="nav-link"
							id="nav-profile-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-profile"
							type="button"
							role="tab"
							aria-controls="nav-profile"
							aria-selected="false"
						>
							My Profile
						</button>
						<button
							className="nav-link"
							id="nav-employee-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-employee"
							type="button"
							role="tab"
							aria-controls="nav-employee"
							aria-selected="false"
						>
							My Employees
						</button>
					</div>
				</nav>
				<div className="tab-content" id="nav-tabContent">
					<div
						className="tab-pane fade show active"
						id="nav-company"
						role="tabpanel"
						aria-labelledby="nav-company-tab"
					>
						<img src="https://via.placeholder.com/150" className="rounded float-start" alt="..." />
						<div className="row">
							<h1>Company: My Company</h1>
							<dl className="row">
								<dt className="col-sm-3">Address</dt>
								<dd className="col-sm-9">Street: Street, Zipcode: Zipcode, City: City.</dd>
							</dl>
						</div>
					</div>
					<div
						className="tab-pane fade"
						id="nav-profile"
						role="tabpanel"
						aria-labelledby="nav-profile-tab"
					>
						{myProfile}
					</div>
					<div
						className="tab-pane fade"
						id="nav-employee"
						role="tabpanel"
						aria-labelledby="nav-employee-tab"
					>
						This is some placeholder content the Home tab's associated content. Clicking another tab
						will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
						control the content visibility and styling. You can use it with tabs, pills, and any
						other .nav-powered navigation.
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedInUser: state.loggedInUser,
		change: state.change ?? false,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		initialChange: event => dispatch(initialChange(event)),
		handleChange: event => dispatch(handleChange(event)),
		handleUpdate: event => dispatch(handleUpdate(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
