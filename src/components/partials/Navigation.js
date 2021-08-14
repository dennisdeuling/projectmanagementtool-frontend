import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/dashboard">
						Projectmanagement Tool
					</Link>
					{/*<a className="navbar-brand" href="#">
						Navbar
					</a>*/}
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item dropdown">
								<Link
									className="nav-link dropdown-toggle"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									to="/projects"
								>
									Clients
								</Link>
								{/*<a
									className="nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Clients
								</a>*/}
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li>
										<Link className="dropdown-item" to="/clients">
											All Clients
										</Link>
										{/*<a className="dropdown-item" href="#">*/}
										{/*	Action*/}
										{/*</a>*/}
									</li>
									{/*<li>
										<a className="dropdown-item" href="#">
											Another action
										</a>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Something else here
										</a>
									</li>*/}
								</ul>
							</li>
							<li className="nav-item dropdown">
								<Link
									className="nav-link dropdown-toggle"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									to="/projects"
								>
									Projects
								</Link>
								{/*<a
									className="nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Projects
								</a>*/}
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li>
										<Link className="dropdown-item" to="/projects">
											All Projects
										</Link>
										{/*<a className="dropdown-item" href="#">*/}
										{/*	Action*/}
										{/*</a>*/}
									</li>
									{/*<li>
										<a className="dropdown-item" href="#">
											Another action
										</a>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Something else here
										</a>
									</li>*/}
								</ul>
							</li>
							<li className="nav-item dropdown">
								<Link
									className="nav-link dropdown-toggle"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									to="/tickets"
								>
									Tickets
								</Link>
								{/*<a
									className="nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Tickets
								</a>*/}
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li>
										<Link className="dropdown-item" to="/tickets">
											All Tickets
										</Link>
										{/*<a className="dropdown-item" href="#">*/}
										{/*	Action*/}
										{/*</a>*/}
									</li>
									{/*<li>
										<a className="dropdown-item" href="#">
											Another action
										</a>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Something else here
										</a>
									</li>*/}
								</ul>
							</li>
						</ul>
						{/*<form className="d-flex">
							<input
								className="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button className="btn btn-outline-success" type="submit">
								Search
							</button>
						</form>*/}
					</div>
				</div>
			</nav>
		);
	}
}

export default Navigation;
