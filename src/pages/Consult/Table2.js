import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Badge } from 'react-bootstrap';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { consults, searchConsults } from '../../redux/actions/consultActions';
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';
import dayjs from 'dayjs';

const Table2 = () => {
	const dispatch = useDispatch();
	const { items } = useSelector(state => state.consult.consults);

	useEffect(() => {
		dispatch(consults());
	}, []);

	const procedureFormatter = (cell, row, rowIndex) => {
		return (
			<div>
				<ul className="list-unstyled">
					{cell.map((proc, idx) => (
						<li key={idx}>
							<Badge variant="success">
								<span className="font-weight-bold">{proc.name}</span>
							</Badge>
						</li>
					))}
				</ul>
			</div>
		);
	};

	const statusFormatter = (cell, row, rowIndex) => {
		return (
			<div>
				{cell == 0 ? (
					<Badge variant="primary">Marcada</Badge>
				) : cell == 1 ? (
					<Badge variant="success">Realizada</Badge>
				) : (
					<Badge variant="danger">Cancelada</Badge>
				)}
			</div>
		);
	};

	const dateFormatter = (cell, row, rowIndex) => {
		return dayjs(cell)
			.format('DD/MM/YYYY HH:mm')
			.toString();
	};

	const columns = [
		{
			dataField: 'date',
			text: 'Data/hora',
			formatter: dateFormatter,
			filter: dateFilter(),
		},
		{
			dataField: 'client.name',
			text: 'Cliente',
			filter: textFilter(),
		},
		{
			dataField: 'client.contact',
			text: 'Telefone',
		},
		{
			dataField: 'procedures',
			text: 'Procedimentos',
			formatter: procedureFormatter,
		},
		{
			dataField: 'observations',
			text: 'Observações',
		},
		{
			dataField: 'status',
			text: 'Status',
			formatter: statusFormatter,
		},
		{
			text: 'Ações',
		},
	];

	return (
		<BootstrapTable
			filterPosition="top"
			keyField="id"
			data={items}
			columns={columns}
			filter={filterFactory()}
			bootstrap4
		/>
	);
};

export default Table2;
