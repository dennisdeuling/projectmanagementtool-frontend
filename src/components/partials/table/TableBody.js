import React from 'react';
import Button from '../Button';

function TableBody({ ...props }) {
	const { index, id, name, email } = props;

	return (
		<tr key={id}>
			<th scope="row">{index}</th>
			<td>{name}</td>
			<td>{email}</td>
			<td>
				<Button
					type="button"
					buttonText="delete"
					onClick={props.onClick}
				/>
			</td>
		</tr>
	);
}

export default TableBody;
