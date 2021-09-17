import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	Avatar,
	Box,
	Container,
	CssBaseline,
	FormControlLabel,
	Grid,
	Link,
	Typography,
	Checkbox
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { handleChange } from '../../redux/actions/changeActions';
import fetchUser from '../../redux/actions/authActions';

import Button from '../partials/Button';
import Input from '../partials/Input';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
});

class Login extends Component {
	handleInputChange = event => {
		this.props.handleChange(event);
	};

	handleFormSubmit = event => {
		event.preventDefault();
		this.props.fetchUser();
		this.props.history.push('/dashboard');
	};

	render() {
		const { classes } = this.props;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} noValidate onSubmit={this.handleFormSubmit}>
						<Input inputType="email" onChange={event => this.handleInputChange(event)} />
						<Input inputType="password" onChange={event => this.handleInputChange(event)} />
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button className={classes.submit} type="submit" buttonText="Submit" />
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>

			// <form className={classes.root} noValidate autoComplete="on" onSubmit={this.handleFormSubmit}>
			// 	<fieldset>
			// 		<legend>Login</legend>
			// 		<React.Fragment>
			// 			<Input inputType="email" onChange={event => this.handleInputChange(event)} />
			// 		</React.Fragment>
			// 		<React.Fragment>
			// 			<Input inputType="password" onChange={event => this.handleInputChange(event)} />
			// 		</React.Fragment>
			// 		<Button type="submit" buttonText="Submit" />
			// 	</fieldset>
			// </form>
		);
	}
}

const mapStateToProps = state => {
	return {
		change: state.change
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChange: event => dispatch(handleChange(event)),
		fetchUser: event => dispatch(fetchUser(event))
	};
};

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Login));
