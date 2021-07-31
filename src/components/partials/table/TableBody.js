import React from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';

function TableBody({ ...props }) {
	const { index, id, name, model } = props;
	const { title, description } = props;
	let renderModel;

	switch (model) {
		case 'projectmanager':
			const { email } = props;
			renderModel = (
				<React.Fragment>
					<td>{name}</td>
					<td>{email}</td>
				</React.Fragment>
			);
			break;
		case 'client':
			const { city, street, zipcode } = props;
			console.log(props)
			renderModel = (
				<React.Fragment>
					<td>{name}</td>
					<td>{city}</td>
					<td>{street}</td>
					<td>{zipcode}</td>
				</React.Fragment>
			);
			break;
		case 'project':
			const {amountOfTickets } = props;
			renderModel = (
				<React.Fragment>
					<td>{title}</td>
					<td>{description}</td>
					<td>{amountOfTickets}</td>
				</React.Fragment>
			);
			break;
		case 'ticket':
			renderModel = (
				<React.Fragment>
					<td>{title}</td>
					<td>{description}</td>
				</React.Fragment>
			);
			break;
		default:
			renderModel = (
				<React.Fragment>
					<td>Something went wrong</td>
				</React.Fragment>
			);
			break;
	}

	return (
		<tr key={id}>
			<th scope="row">{index}</th>
			{renderModel}
			<td>
				<Button type="button" buttonText="delete" onClick={props.onClick} />
				<Link to={`/${model}/${id}`}>
					Details
				</Link>
			</td>
		</tr>
	);
}

export default TableBody;
