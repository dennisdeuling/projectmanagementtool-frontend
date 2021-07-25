import React from 'react';

function TableHead({ ...props }) {
	const { headline } = props;
	const tableHead = headline.map((item, index) => {
		if (typeof item === 'string') {
			// TODO: Make a helper function
			headline[index] =
				headline[index].charAt(0).toUpperCase() + headline[index].slice(1);
		}
		return (
			<th scope="col" key={index}>
				{item}
			</th>
		);
	});

	return (
		<thead>
			<tr>
				{tableHead}
			</tr>
		</thead>
	);
}

export default TableHead;
