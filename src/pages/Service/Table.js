import React, { useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../redux/actions/serviceActions';
import Spinner from '../../components/common/Spinner';
import { MdEdit } from 'react-icons/md';

const Table = ({ rowSelect }) => {
	const dispatch = useDispatch();

	const { items, loading } = useSelector((state) => state.service.services);

	useEffect(() => {
		dispatch(getServices());
	}, [dispatch]);

	const actionFormat = (cell, row) => {
		return (
			<div className="form-iline">
				<OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Editar</Tooltip>}>
					<Button onClick={() => rowSelect(row)} variant="link">
						<MdEdit size={24} />
						&nbsp;
					</Button>
				</OverlayTrigger>
			</div>
		);
	};

	return loading ? (
		<Spinner />
	) : (
		<BootstrapTable
			data={items}
			striped
			hover
			version="4"
			pagination
			options={{ noDataText: 'Não há itens a exibir' }}
		>
			<TableHeaderColumn isKey dataField="_id" hidden>
				Id
			</TableHeaderColumn>
			<TableHeaderColumn
				dataField="description"
				filter={{ type: 'TextFilter', delay: 1000 }}
				dataSort={true}
				width="500px"
			>
				Descrição
			</TableHeaderColumn>
			<TableHeaderColumn dataField="observations">Observações</TableHeaderColumn>
			<TableHeaderColumn width="90" dataFormat={actionFormat}>
				Ações
			</TableHeaderColumn>
		</BootstrapTable>
	);
};

export default Table;
